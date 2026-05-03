import { error } from '@sveltejs/kit';
import { RecipeDbError, getRecipeById } from '$lib/server/recipes-db.js';

export async function load({ params }) {
	let recipe;
	try {
		recipe = await getRecipeById(params.id);
	} catch (dbError) {
		if (dbError instanceof RecipeDbError) {
			throw error(dbError.status, dbError.message);
		}
		throw error(500, 'Failed to load recipe details.');
	}

	if (!recipe) {
		throw error(404, 'Recipe not found');
	}

	return {
		recipe
	};
}
