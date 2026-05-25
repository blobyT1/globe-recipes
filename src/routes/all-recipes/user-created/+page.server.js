import { error, redirect } from '@sveltejs/kit';
import {
	RecipeDbError,
	deleteUserCreatedRecipe,
	getFavoriteRecipeIdsForUser,
	getUserCreatedRecipes,
	toggleRecipeFavorite
} from '$lib/server/recipes-db.js';

export async function load({ locals }) {
	try {
		const currentUserId = locals.user?.id ?? null;
		return {
			recipes: currentUserId ? await getUserCreatedRecipes(currentUserId) : [],
			currentUserId,
			favoriteRecipeIds: currentUserId ? await getFavoriteRecipeIdsForUser(currentUserId) : []
		};
	} catch (dbError) {
		if (dbError instanceof RecipeDbError) {
			throw error(dbError.status, dbError.message);
		}
		throw error(500, 'Failed to load user-created recipes.');
	}
}

export const actions = {
	toggleFavorite: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login?next=/all-recipes/user-created');
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
	},

	delete: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login?next=/all-recipes/user-created');
		}

		const formData = await request.formData();
		const recipeId = String(formData.get('id') ?? '');

		if (!recipeId) {
			throw error(400, 'Invalid recipe id');
		}

		try {
			const deletedCount = await deleteUserCreatedRecipe(recipeId, locals.user.id);
			if (deletedCount === 0) {
				throw error(403, 'You can only delete your own user-created recipes.');
			}
			return { success: true };
		} catch (dbError) {
			if (dbError instanceof RecipeDbError) {
				throw error(dbError.status, dbError.message);
			}
			throw error(500, 'Failed to delete recipe.');
		}
	}
};
