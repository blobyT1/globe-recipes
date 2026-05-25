import crypto from 'node:crypto';
import { env } from '$env/dynamic/private';
import bcrypt from 'bcryptjs';
import {
	MongoClient,
	ObjectId,
	MongoServerError,
	MongoNetworkError,
	MongoServerSelectionError
} from 'mongodb';

const USERS_COLLECTION = 'users';
const SESSIONS_COLLECTION = 'sessions';
const SESSION_COOKIE = 'gr_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const BCRYPT_ROUNDS = 12;

let dbPromise;
let usersCollectionPromise;
let sessionsCollectionPromise;

export class AuthError extends Error {
	constructor(message, status = 500, code = 'AUTH_ERROR', cause = null) {
		super(message);
		this.name = 'AuthError';
		this.status = status;
		this.code = code;
		this.cause = cause;
	}
}

function assertAuthConfig() {
	if (!env.MONGODB_URI) {
		throw new AuthError('Authentication is not configured correctly (MONGODB_URI missing).', 500);
	}

	if (!env.MONGODB_DB_NAME) {
		throw new AuthError('Authentication is not configured correctly (MONGODB_DB_NAME missing).', 500);
	}

	if (!env.APP_AUTH_SECRET || env.APP_AUTH_SECRET.length < 24) {
		throw new AuthError(
			'Authentication is not configured correctly (APP_AUTH_SECRET missing or too short).',
			500
		);
	}
}

function asAuthError(error, fallbackMessage = 'Authentication failed.') {
	if (error instanceof AuthError) return error;

	if (error instanceof MongoServerSelectionError || error instanceof MongoNetworkError) {
		return new AuthError('Auth database is currently unreachable. Please try again shortly.', 503, 'DB_UNAVAILABLE', error);
	}

	if (error instanceof MongoServerError && error.code === 11000) {
		return new AuthError('That username is already in use.', 409, 'USERNAME_TAKEN', error);
	}

	return new AuthError(fallbackMessage, 500, 'AUTH_ERROR', error);
}

function normalizeUsername(username) {
	return String(username ?? '')
		.trim()
		.toLowerCase();
}

function hashSessionToken(token) {
	return crypto
		.createHmac('sha256', env.APP_AUTH_SECRET)
		.update(token)
		.digest('hex');
}

function createRawSessionToken() {
	return crypto.randomBytes(32).toString('hex');
}

async function getDb() {
	assertAuthConfig();

	if (!dbPromise) {
		const client = new MongoClient(env.MONGODB_URI);
		dbPromise = client.connect().then((connectedClient) => connectedClient.db(env.MONGODB_DB_NAME)).catch((error) => {
			dbPromise = null;
			throw asAuthError(error, 'Could not connect to authentication database.');
		});
	}

	return dbPromise;
}

async function getUsersCollection() {
	if (!usersCollectionPromise) {
		usersCollectionPromise = (async () => {
			const db = await getDb();
			const collection = db.collection(USERS_COLLECTION);
			await collection.createIndex({ usernameLower: 1 }, { unique: true });
			return collection;
		})().catch((error) => {
			usersCollectionPromise = null;
			throw asAuthError(error, 'Could not initialize users collection.');
		});
	}

	return usersCollectionPromise;
}

async function getSessionsCollection() {
	if (!sessionsCollectionPromise) {
		sessionsCollectionPromise = (async () => {
			const db = await getDb();
			const collection = db.collection(SESSIONS_COLLECTION);
			await collection.createIndex({ tokenHash: 1 }, { unique: true });
			await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
			await collection.createIndex({ userId: 1, expiresAt: 1 });
			return collection;
		})().catch((error) => {
			sessionsCollectionPromise = null;
			throw asAuthError(error, 'Could not initialize sessions collection.');
		});
	}

	return sessionsCollectionPromise;
}

function cookieOptions() {
	return {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: env.NODE_ENV === 'production',
		maxAge: SESSION_MAX_AGE_SECONDS
	};
}

function publicUser(userDoc) {
	return {
		id: userDoc._id.toString(),
		username: userDoc.username
	};
}

export function validateSignupInput(username, password, confirmPassword) {
	const normalized = normalizeUsername(username);
	if (!/^[a-z0-9_]{3,24}$/.test(normalized)) {
		throw new AuthError(
			'Username must be 3-24 characters and use only letters, numbers, and underscores.',
			400,
			'INVALID_USERNAME'
		);
	}

	if (String(password ?? '').length < 8) {
		throw new AuthError('Password must be at least 8 characters long.', 400, 'WEAK_PASSWORD');
	}

	if (String(password ?? '').length > 24) {
		throw new AuthError('Password must be at most 24 characters long.', 400, 'PASSWORD_TOO_LONG');
	}

	if (password !== confirmPassword) {
		throw new AuthError('Passwords do not match.', 400, 'PASSWORD_MISMATCH');
	}

	return normalized;
}

export async function registerUser({ username, password, confirmPassword }) {
	try {
		const usernameLower = validateSignupInput(username, password, confirmPassword);
		const users = await getUsersCollection();
		const now = new Date();
		const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

		const result = await users.insertOne({
			username: usernameLower,
			usernameLower,
			passwordHash,
			isActive: true,
			createdAt: now,
			updatedAt: now
		});

		return {
			id: result.insertedId.toString(),
			username: usernameLower
		};
	} catch (error) {
		throw asAuthError(error, 'Could not create account.');
	}
}

export async function authenticateUser({ username, password }) {
	try {
		const usernameLower = normalizeUsername(username);
		if (!usernameLower || !password) {
			throw new AuthError('Username and password are required.', 400, 'MISSING_CREDENTIALS');
		}

		const users = await getUsersCollection();
		const user = await users.findOne({ usernameLower, isActive: { $ne: false } });
		if (!user) {
			return null;
		}

		const isValid = await bcrypt.compare(password, user.passwordHash);
		if (!isValid) {
			return null;
		}

		return publicUser(user);
	} catch (error) {
		throw asAuthError(error, 'Could not sign in.');
	}
}

export async function createSession(cookies, user) {
	try {
		const sessions = await getSessionsCollection();
		const token = createRawSessionToken();
		const tokenHash = hashSessionToken(token);
		const now = new Date();
		const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);

		await sessions.insertOne({
			userId: new ObjectId(user.id),
			tokenHash,
			createdAt: now,
			expiresAt
		});

		cookies.set(SESSION_COOKIE, token, cookieOptions());
	} catch (error) {
		throw asAuthError(error, 'Could not create a user session.');
	}
}

export async function getSessionUser(cookies) {
	try {
		const token = cookies.get(SESSION_COOKIE);
		if (!token) return null;

		const tokenHash = hashSessionToken(token);
		const sessions = await getSessionsCollection();
		const session = await sessions.findOne({
			tokenHash,
			expiresAt: { $gt: new Date() }
		});

		if (!session) return null;

		const users = await getUsersCollection();
		const user = await users.findOne({
			_id: session.userId,
			isActive: { $ne: false }
		});

		if (!user) return null;

		return publicUser(user);
	} catch (error) {
		throw asAuthError(error, 'Could not validate user session.');
	}
}

export async function clearSession(cookies) {
	const token = cookies.get(SESSION_COOKIE);
	cookies.delete(SESSION_COOKIE, { path: '/' });
	if (!token) return;

	try {
		const sessions = await getSessionsCollection();
		await sessions.deleteOne({ tokenHash: hashSessionToken(token) });
	} catch {
		// Intentionally ignore cleanup errors because cookie is already removed.
	}
}
