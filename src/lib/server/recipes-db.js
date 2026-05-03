import {
	MongoClient,
	ObjectId,
	MongoServerError,
	MongoNetworkError,
	MongoServerSelectionError
} from 'mongodb';
import { env } from '$env/dynamic/private';

const MONGODB_URI = env.MONGODB_URI ?? '';
const MONGODB_DB_NAME = env.MONGODB_DB_NAME ?? 'globe_recipes';
const RECIPES_COLLECTION = 'recipes';

let dbPromise;
let collectionPromise;

export class RecipeDbError extends Error {
	constructor(userMessage, status = 500, cause = null) {
		super(userMessage);
		this.name = 'RecipeDbError';
		this.status = status;
		this.cause = cause;
	}
}

export function asRecipeDbError(error, fallbackMessage = 'Database request failed.') {
	if (error instanceof RecipeDbError) return error;

	if (error?.message?.includes('MONGODB_URI')) {
		return new RecipeDbError(
			'Database configuration is incomplete. Please check server environment variables.',
			500,
			error
		);
	}

	if (error instanceof MongoServerSelectionError || error instanceof MongoNetworkError) {
		return new RecipeDbError(
			'Database is currently unreachable. Please try again in a few moments.',
			503,
			error
		);
	}

	if (error instanceof MongoServerError && error.code === 121) {
		return new RecipeDbError('Recipe data failed database validation.', 400, error);
	}

	return new RecipeDbError(fallbackMessage, 500, error);
}

function assertMongoConfig() {
	if (!MONGODB_URI) {
		throw new RecipeDbError(
			'Database configuration is incomplete. Please set MONGODB_URI.',
			500
		);
	}
}

async function getDb() {
	assertMongoConfig();

	if (!dbPromise) {
		const client = new MongoClient(MONGODB_URI);
		dbPromise = client
			.connect()
			.then((connectedClient) => connectedClient.db(MONGODB_DB_NAME))
			.catch((error) => {
				dbPromise = null;
				throw asRecipeDbError(error, 'Could not connect to the database.');
			});
	}

	return dbPromise;
}

async function getRecipesCollection() {
	if (!collectionPromise) {
		collectionPromise = (async () => {
			const db = await getDb();
			const collection = db.collection(RECIPES_COLLECTION);
			await collection.createIndex({ owner: 1, isUserCreated: 1 });
			await collection.createIndex({ continent: 1, title: 1 });
			return collection;
		})().catch((error) => {
			collectionPromise = null;
			throw asRecipeDbError(error, 'Could not initialize recipe collection.');
		});
	}

	return collectionPromise;
}

function mapRecipe(document) {
	return {
		...document,
		_id: document._id.toString()
	};
}

export async function getAllRecipes() {
	try {
		const collection = await getRecipesCollection();
		const recipes = await collection.find({}).sort({ continent: 1, title: 1 }).toArray();
		return recipes.map(mapRecipe);
	} catch (error) {
		throw asRecipeDbError(error, 'Could not load recipes from the database.');
	}
}

export async function getRecipeById(id) {
	try {
		if (!ObjectId.isValid(id)) return null;

		const collection = await getRecipesCollection();
		const recipe = await collection.findOne({ _id: new ObjectId(id) });
		return recipe ? mapRecipe(recipe) : null;
	} catch (error) {
		throw asRecipeDbError(error, 'Could not load the recipe details.');
	}
}

export async function createRecipe(recipe) {
	try {
		const collection = await getRecipesCollection();
		const now = new Date();
		const document = {
			...recipe,
			createdAt: now,
			updatedAt: now
		};

		const result = await collection.insertOne(document);
		return result.insertedId.toString();
	} catch (error) {
		throw asRecipeDbError(error, 'Could not save the new recipe.');
	}
}

export async function deleteOwnedRecipe(id, owner) {
	try {
		if (!ObjectId.isValid(id)) return 0;

		const collection = await getRecipesCollection();
		const result = await collection.deleteOne({
			_id: new ObjectId(id),
			isUserCreated: true,
			owner
		});

		return result.deletedCount;
	} catch (error) {
		throw asRecipeDbError(error, 'Could not delete the recipe.');
	}
}
