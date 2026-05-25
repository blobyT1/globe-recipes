import { error, redirect } from '@sveltejs/kit';
import {
	RecipeDbError,
	getFavoriteRecipeIdsForUser,
	getFavoritedRecipesForUser,
	toggleRecipeFavorite
} from '$lib/server/recipes-db.js';

export async function load({ locals }) {
	try {
		const currentUserId = locals.user?.id ?? null;
		return {
			recipes: currentUserId ? await getFavoritedRecipesForUser(currentUserId) : [],
			currentUserId,
			favoriteRecipeIds: currentUserId ? await getFavoriteRecipeIdsForUser(currentUserId) : []
		};
	} catch (dbError) {
		if (dbError instanceof RecipeDbError) {
			throw error(dbError.status, dbError.message);
		}
		throw error(500, 'Failed to load favorite recipes.');
	}
}

export const actions = {
	toggleFavorite: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login?next=/all-recipes/favorites');
		}

		const formData = await request.formData();
		const recipeId = String(formData.get('recipeId') ?? '');

		if (!recipeId) {
			throw error(400, 'Invalid recipe id');
		}

		try {
			await toggleRecipeFavorite(recipeId, locals.user.id);
			return { success: true };
		} catch (dbError) {
			if (dbError instanceof RecipeDbError) {
				throw error(dbError.status, dbError.message);
			}
			throw error(500, 'Failed to update favorite.');
		}
	}
};
