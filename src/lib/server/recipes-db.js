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
const FAVORITES_COLLECTION = 'favorite_recipes';

let dbPromise;
let collectionPromise;
let favoritesCollectionPromise;

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
			await collection.createIndex({ ownerId: 1, isUserCreated: 1 });
			await collection.createIndex({ continent: 1, title: 1 });
			return collection;
		})().catch((error) => {
			collectionPromise = null;
			throw asRecipeDbError(error, 'Could not initialize recipe collection.');
		});
	}

	return collectionPromise;
}

async function getFavoritesCollection() {
	if (!favoritesCollectionPromise) {
		favoritesCollectionPromise = (async () => {
			const db = await getDb();
			const collection = db.collection(FAVORITES_COLLECTION);
			await collection.createIndex({ userId: 1, recipeId: 1 }, { unique: true });
			await collection.createIndex({ userId: 1, createdAt: -1 });
			return collection;
		})().catch((error) => {
			favoritesCollectionPromise = null;
			throw asRecipeDbError(error, 'Could not initialize favorites collection.');
		});
	}

	return favoritesCollectionPromise;
}

function mapRecipe(document) {
	const ownerId =
		document.ownerId && typeof document.ownerId?.toString === 'function'
			? document.ownerId.toString()
			: document.ownerId ?? null;

	return {
		...document,
		_id: document._id.toString(),
		ownerId
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

export async function getUserCreatedRecipes(ownerId) {
	try {
		if (!ownerId) return [];

		const collection = await getRecipesCollection();
		const recipes = await collection
			.find({ isUserCreated: true, ownerId: String(ownerId) })
			.sort({ title: 1 })
			.toArray();
		return recipes.map(mapRecipe);
	} catch (error) {
		throw asRecipeDbError(error, 'Could not load your user-created recipes.');
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

export async function getFavoriteRecipeIdsForUser(userId) {
	try {
		if (!userId) return [];

		const favorites = await getFavoritesCollection();
		const entries = await favorites.find({ userId: String(userId) }).toArray();
		return entries.map((entry) => String(entry.recipeId));
	} catch (error) {
		throw asRecipeDbError(error, 'Could not load favorite recipes.');
	}
}

export async function getFavoritedRecipesForUser(userId) {
	try {
		if (!userId) return [];

		const recipeIds = await getFavoriteRecipeIdsForUser(userId);
		if (recipeIds.length === 0) return [];

		const validIds = recipeIds.filter((id) => ObjectId.isValid(id)).map((id) => new ObjectId(id));
		if (validIds.length === 0) return [];

		const collection = await getRecipesCollection();
		const recipes = await collection.find({ _id: { $in: validIds } }).sort({ title: 1 }).toArray();
		return recipes.map(mapRecipe);
	} catch (error) {
		throw asRecipeDbError(error, 'Could not load your favorite recipes.');
	}
}

export async function isRecipeFavoritedByUser(recipeId, userId) {
	try {
		if (!userId || !ObjectId.isValid(recipeId)) return false;

		const favorites = await getFavoritesCollection();
		const favorite = await favorites.findOne({
			userId: String(userId),
			recipeId: String(recipeId)
		});

		return Boolean(favorite);
	} catch (error) {
		throw asRecipeDbError(error, 'Could not check favorite status.');
	}
}

export async function toggleRecipeFavorite(recipeId, userId) {
	try {
		if (!userId || !ObjectId.isValid(recipeId)) {
			return { isFavorite: false };
		}

		const recipes = await getRecipesCollection();
		const recipeExists = await recipes.findOne(
			{ _id: new ObjectId(recipeId) },
			{ projection: { _id: 1 } }
		);

		if (!recipeExists) {
			throw new RecipeDbError('Recipe not found.', 404);
		}

		const favorites = await getFavoritesCollection();
		const existing = await favorites.findOne({ userId: String(userId), recipeId: String(recipeId) });

		if (existing) {
			await favorites.deleteOne({ _id: existing._id });
			return { isFavorite: false };
		}

		await favorites.insertOne({
			userId: String(userId),
			recipeId: String(recipeId),
			createdAt: new Date()
		});

		return { isFavorite: true };
	} catch (error) {
		throw asRecipeDbError(error, 'Could not update favorite state.');
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

export async function deleteUserCreatedRecipe(id, ownerId) {
	try {
		if (!ObjectId.isValid(id) || !ownerId) return 0;

		const collection = await getRecipesCollection();
		const result = await collection.deleteOne({
			_id: new ObjectId(id),
			isUserCreated: true,
			ownerId: String(ownerId)
		});

		if (result.deletedCount > 0) {
			const favorites = await getFavoritesCollection();
			await favorites.deleteMany({ recipeId: String(id) });
		}

		return result.deletedCount;
	} catch (error) {
		throw asRecipeDbError(error, 'Could not delete the recipe.');
	}
}
