import { error, fail, redirect } from '@sveltejs/kit';
import { continents } from '$lib/data/continents.js';
import { countries, countrySet } from '$lib/data/countries.js';
import {
	RecipeDbError,
	getRecipeById,
	updateUserCreatedRecipe
} from '$lib/server/recipes-db.js';

const LIMITS = {
	titleMax: 80,
	descriptionMax: 500,
	countryMax: 100,
	cookingTimeMax: 1440,
	servingsMax: 50,
	ingredientMax: 140,
	instructionMax: 280,
	listItemMaxCount: 40
};

function parseListInput(rawJson, rawMultiline) {
	const jsonText = String(rawJson ?? '').trim();

	if (jsonText) {
		try {
			const parsed = JSON.parse(jsonText);
			if (Array.isArray(parsed)) {
				return parsed.map((entry) => String(entry).trim()).filter(Boolean);
			}
		} catch {
			// Continue with multiline fallback.
		}
	}

	return String(rawMultiline ?? '')
		.split('\n')
		.map((line) => line.trim())
		.filter(Boolean);
}

function mapValuesFromRecipe(recipe) {
	return {
		title: recipe.title ?? '',
		continent: recipe.continent ?? '',
		country: recipe.country ?? '',
		description: recipe.description ?? '',
		ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
		instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
		cookingTime: String(recipe.cookingTime ?? ''),
		difficulty: recipe.difficulty ?? '',
		servings: String(recipe.servings ?? '')
	};
}

export async function load({ params, locals }) {
	if (!locals.user) {
		throw redirect(303, `/login?next=/all-recipes/${params.id}/edit`);
	}

	let recipe;
	try {
		recipe = await getRecipeById(params.id);
	} catch (dbError) {
		if (dbError instanceof RecipeDbError) {
			throw error(dbError.status, dbError.message);
		}
		throw error(500, 'Failed to load recipe for editing.');
	}

	if (!recipe) {
		throw error(404, 'Recipe not found.');
	}

	if (!recipe.isUserCreated || recipe.ownerId !== locals.user.id) {
		throw error(403, 'You can only edit your own user-created recipes.');
	}

	return {
		recipeId: recipe._id,
		initialValues: mapValuesFromRecipe(recipe),
		continents: continents.map((continent) => continent.name),
		countries
	};
}

export const actions = {
	default: async ({ request, locals, params }) => {
		if (!locals.user) {
			throw redirect(303, `/login?next=/all-recipes/${params.id}/edit`);
		}

		const formData = await request.formData();

		const title = String(formData.get('title') ?? '').trim();
		const continent = String(formData.get('continent') ?? '').trim();
		const country = String(formData.get('country') ?? '').trim();
		const description = String(formData.get('description') ?? '').trim();
		const ingredients = parseListInput(formData.get('ingredientsJson'), formData.get('ingredients'));
		const instructions = parseListInput(formData.get('instructionsJson'), formData.get('instructions'));
		const cookingTime = Number(formData.get('cookingTime'));
		const difficulty = String(formData.get('difficulty') ?? '').trim().toLowerCase();
		const servings = Number(formData.get('servings'));

		const values = {
			title,
			continent,
			country,
			description,
			ingredients,
			instructions,
			cookingTime: String(formData.get('cookingTime') ?? ''),
			difficulty,
			servings: String(formData.get('servings') ?? '')
		};

		if (
			!title ||
			title.length > LIMITS.titleMax ||
			!continent ||
			!country ||
			!countrySet.has(country) ||
			country.length > LIMITS.countryMax ||
			!description ||
			description.length > LIMITS.descriptionMax ||
			ingredients.length === 0 ||
			instructions.length === 0 ||
			ingredients.length > LIMITS.listItemMaxCount ||
			instructions.length > LIMITS.listItemMaxCount ||
			ingredients.some((ingredient) => ingredient.length > LIMITS.ingredientMax) ||
			instructions.some((instruction) => instruction.length > LIMITS.instructionMax) ||
			Number.isNaN(cookingTime) ||
			cookingTime <= 0 ||
			cookingTime > LIMITS.cookingTimeMax ||
			Number.isNaN(servings) ||
			servings <= 0 ||
			servings > LIMITS.servingsMax ||
			!['easy', 'medium', 'hard'].includes(difficulty)
		) {
			return fail(400, {
				message: 'Please complete all fields with valid values.',
				values
			});
		}

		try {
			const matchedCount = await updateUserCreatedRecipe(params.id, locals.user.id, {
				title,
				continent,
				country,
				description,
				ingredients,
				instructions,
				cookingTime,
				difficulty,
				servings
			});

			if (matchedCount === 0) {
				throw error(403, 'You can only edit your own user-created recipes.');
			}
		} catch (dbError) {
			if (dbError instanceof RecipeDbError) {
				return fail(dbError.status, {
					message: dbError.message,
					values
				});
			}

			if (dbError?.status) {
				throw dbError;
			}

			return fail(500, {
				message: 'Could not update recipe right now.',
				values
			});
		}

		throw redirect(303, `/all-recipes/${params.id}`);
	}
};
