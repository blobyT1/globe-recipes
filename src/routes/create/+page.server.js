import { fail, redirect } from '@sveltejs/kit';
import { continents } from '$lib/data/continents.js';
import { RecipeDbError, createRecipe } from '$lib/server/recipes-db.js';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(303, '/login?next=/create');
	}

	return {
		continents: continents.map((continent) => continent.name)
	};
}

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login?next=/create');
		}

		const formData = await request.formData();

		const title = String(formData.get('title') ?? '').trim();
		const continent = String(formData.get('continent') ?? '').trim();
		const country = String(formData.get('country') ?? '').trim();
		const description = String(formData.get('description') ?? '').trim();
		const ingredientsInput = String(formData.get('ingredients') ?? '').trim();
		const instructionsInput = String(formData.get('instructions') ?? '').trim();
		const cookingTime = Number(formData.get('cookingTime'));
		const difficulty = String(formData.get('difficulty') ?? '').trim().toLowerCase();
		const servings = Number(formData.get('servings'));

		const values = {
			title,
			continent,
			country,
			description,
			ingredients: ingredientsInput,
			instructions: instructionsInput,
			cookingTime: String(formData.get('cookingTime') ?? ''),
			difficulty,
			servings: String(formData.get('servings') ?? '')
		};

		if (
			!title ||
			!continent ||
			!country ||
			!description ||
			!ingredientsInput ||
			!instructionsInput ||
			Number.isNaN(cookingTime) ||
			cookingTime <= 0 ||
			Number.isNaN(servings) ||
			servings <= 0 ||
			!['easy', 'medium', 'hard'].includes(difficulty)
		) {
			return fail(400, {
				message: 'Please complete all fields with valid values.',
				values
			});
		}

		const ingredients = ingredientsInput
			.split('\n')
			.map((line) => line.trim())
			.filter(Boolean);
		const instructions = instructionsInput
			.split('\n')
			.map((line) => line.trim())
			.filter(Boolean);

		if (ingredients.length === 0 || instructions.length === 0) {
			return fail(400, {
				message: 'Please add at least one ingredient and one instruction.',
				values
			});
		}

		try {
			await createRecipe({
				title,
				continent,
				country,
				description,
				ingredients,
				instructions,
				cookingTime,
				difficulty,
				servings,
				isUserCreated: true,
				owner: locals.user.username
			});
		} catch (dbError) {
			const message =
				dbError instanceof RecipeDbError ? dbError.message : 'Could not save recipe right now.';
			return fail(500, {
				message,
				values
			});
		}

		throw redirect(303, '/all-recipes');
	}
};
