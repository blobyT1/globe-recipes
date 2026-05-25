import { MongoClient, MongoServerError } from 'mongodb';
import { getMongoConfig, getRecipesJsonSchema, loadRootEnvFile } from './mongo-common.js';

const COLLECTION = 'recipes';
const USERS_COLLECTION = 'users';
const SESSIONS_COLLECTION = 'sessions';
const FAVORITES_COLLECTION = 'favorite_recipes';

async function setupMongo() {
	loadRootEnvFile();
	const { uri, dbName } = getMongoConfig();
	const client = new MongoClient(uri);

	try {
		await client.connect();
		const db = client.db(dbName);
		const validator = { $jsonSchema: getRecipesJsonSchema() };

		const existing = await db.listCollections({ name: COLLECTION }, { nameOnly: true }).toArray();

		if (existing.length === 0) {
			await db.createCollection(COLLECTION, {
				validator,
				validationLevel: 'moderate',
				validationAction: 'error'
			});
			console.log(`Created collection '${COLLECTION}' with schema validation.`);
		} else {
			await db.command({
				collMod: COLLECTION,
				validator,
				validationLevel: 'moderate',
				validationAction: 'error'
			});
			console.log(`Updated schema validation for '${COLLECTION}'.`);
		}

		const collection = db.collection(COLLECTION);
		await collection.createIndex({ ownerId: 1, isUserCreated: 1 });
		await collection.createIndex({ continent: 1, title: 1 });
		console.log('Recipe indexes ensured.');

		const usersCollection = db.collection(USERS_COLLECTION);
		await usersCollection.createIndex({ usernameLower: 1 }, { unique: true });
		console.log("Users index ensured ('usernameLower' unique).");

		const sessionsCollection = db.collection(SESSIONS_COLLECTION);
		await sessionsCollection.createIndex({ tokenHash: 1 }, { unique: true });
		await sessionsCollection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
		await sessionsCollection.createIndex({ userId: 1, expiresAt: 1 });
		console.log('Session indexes ensured.');

		const favoritesCollection = db.collection(FAVORITES_COLLECTION);
		await favoritesCollection.createIndex({ userId: 1, recipeId: 1 }, { unique: true });
		await favoritesCollection.createIndex({ userId: 1, createdAt: -1 });
		console.log("Favorites indexes ensured ('userId + recipeId' unique).");
	} catch (error) {
		if (error instanceof MongoServerError && error.code === 13) {
			console.error(
				"Permission denied for schema update (collMod/createCollection). Use a user with 'dbAdmin' on this database for setup, then switch back to readWrite."
			);
			process.exitCode = 1;
			return;
		}

		console.error('Mongo setup failed:', error.message);
		process.exitCode = 1;
	} finally {
		await client.close();
	}
}

setupMongo();
