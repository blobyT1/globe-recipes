import { error, redirect } from '@sveltejs/kit';
import { RecipeDbError, deleteOwnedRecipe, getAllRecipes } from '$lib/server/recipes-db.js';

export async function load({ locals }) {
	try {
		return {
			recipes: await getAllRecipes(),
			currentUser: locals.user?.username ?? null
		};
	} catch (dbError) {
		if (dbError instanceof RecipeDbError) {
			throw error(dbError.status, dbError.message);
		}
		throw error(500, 'Failed to load recipes.');
	}
}

export const actions = {
	delete: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login?next=/all-recipes');
		}

		const formData = await request.formData();
		const recipeId = String(formData.get('id') ?? '');

		if (!recipeId) {
			throw error(400, 'Invalid recipe id');
		}

		try {
			await deleteOwnedRecipe(recipeId, locals.user.username);
		} catch (dbError) {
			if (dbError instanceof RecipeDbError) {
				throw error(dbError.status, dbError.message);
			}
			throw error(500, 'Failed to delete recipe.');
		}

		return { success: true };
	}
};
