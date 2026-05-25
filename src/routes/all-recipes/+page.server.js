import { error } from '@sveltejs/kit';
import { RecipeDbError, deleteUserCreatedRecipe, getAllRecipes } from '$lib/server/recipes-db.js';

export async function load() {
	try {
		return {
			recipes: await getAllRecipes()
		};
	} catch (dbError) {
		if (dbError instanceof RecipeDbError) {
			throw error(dbError.status, dbError.message);
		}
		throw error(500, 'Failed to load recipes.');
	}
}

export const actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const recipeId = String(formData.get('id') ?? '');

		if (!recipeId) {
			throw error(400, 'Invalid recipe id');
		}

		try {
			await deleteUserCreatedRecipe(recipeId);
		} catch (dbError) {
			if (dbError instanceof RecipeDbError) {
				throw error(dbError.status, dbError.message);
			}
			throw error(500, 'Failed to delete recipe.');
		}

		return { success: true };
	}
};
