import { MongoClient } from 'mongodb';
import { recipes as seedRecipes } from '../src/lib/data/recipes.js';
import { getMongoConfig, loadRootEnvFile } from './mongo-common.js';

const COLLECTION = 'recipes';

async function seedRecipesCollection() {
	loadRootEnvFile();
	const { uri, dbName } = getMongoConfig();
	const client = new MongoClient(uri);

	try {
		await client.connect();
		const collection = client.db(dbName).collection(COLLECTION);
		const existingCount = await collection.countDocuments();

		if (existingCount > 0) {
			console.log(
				`Skip seeding: '${dbName}.${COLLECTION}' already contains ${existingCount} documents.`
			);
			return;
		}

		const now = new Date();
		const docs = seedRecipes.map(({ id, ...recipe }) => ({
			...recipe,
			legacyId: id,
			owner: null,
			createdAt: now,
			updatedAt: now
		}));

		if (docs.length === 0) {
			console.log('No seed recipes found.');
			return;
		}

		await collection.insertMany(docs);
		console.log(`Inserted ${docs.length} seed recipes into '${dbName}.${COLLECTION}'.`);
	} catch (error) {
		console.error('Mongo seed failed:', error.message);
		process.exitCode = 1;
	} finally {
		await client.close();
	}
}

seedRecipesCollection();
