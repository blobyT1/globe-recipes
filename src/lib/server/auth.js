import crypto from 'node:crypto';
import { env } from '$env/dynamic/private';

const SESSION_COOKIE = 'gr_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getAuthConfig() {
	return {
		username: env.APP_LOGIN_USERNAME ?? '',
		password: env.APP_LOGIN_PASSWORD ?? '',
		secret: env.APP_AUTH_SECRET ?? ''
	};
}

export function verifyCredentials(username, password) {
	const auth = getAuthConfig();
	if (!auth.username || !auth.password) return false;

	return safeEqual(username, auth.username) && safeEqual(password, auth.password);
}

function sign(value, secret) {
	return crypto.createHmac('sha256', secret).update(value).digest('hex');
}

function safeEqual(a, b) {
	const aBuffer = Buffer.from(String(a));
	const bBuffer = Buffer.from(String(b));

	if (aBuffer.length !== bBuffer.length) {
		return false;
	}

	return crypto.timingSafeEqual(aBuffer, bBuffer);
}

export function createSessionToken(username) {
	const { secret } = getAuthConfig();
	const issuedAt = String(Date.now());
	const payload = `${username}.${issuedAt}`;
	const signature = sign(payload, secret);
	return `${payload}.${signature}`;
}

export function parseSessionToken(token) {
	if (!token) return null;

	const { secret } = getAuthConfig();
	if (!secret) return null;

	const parts = token.split('.');
	if (parts.length < 3) return null;

	const signature = parts.pop();
	const issuedAt = parts.pop();
	const username = parts.join('.');
	const payload = `${username}.${issuedAt}`;
	const expected = sign(payload, secret);

	if (signature !== expected) return null;

	const issuedAtMs = Number(issuedAt);
	if (Number.isNaN(issuedAtMs)) return null;
	if (Date.now() - issuedAtMs > SESSION_MAX_AGE * 1000) return null;

	return { username };
}

export function setSessionCookie(cookies, username) {
	cookies.set(SESSION_COOKIE, createSessionToken(username), {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		maxAge: SESSION_MAX_AGE,
		secure: env.NODE_ENV === 'production'
	});
}

export function clearSessionCookie(cookies) {
	cookies.delete(SESSION_COOKIE, { path: '/' });
}

export function getSessionUser(cookies) {
	const token = cookies.get(SESSION_COOKIE);
	return parseSessionToken(token);
}
