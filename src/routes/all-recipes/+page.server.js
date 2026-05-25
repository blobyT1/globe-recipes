import { error, isHttpError, redirect } from '@sveltejs/kit';
import { RecipeDbError, deleteUserCreatedRecipe, getAllRecipes } from '$lib/server/recipes-db.js';

export async function load({ locals }) {
	try {
		return {
			recipes: await getAllRecipes(),
			currentUserId: locals.user?.id ?? null
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
			const deletedCount = await deleteUserCreatedRecipe(recipeId, locals.user.id);
			if (deletedCount === 0) {
				throw error(403, 'You can only delete your own user-created recipes.');
			}
		} catch (dbError) {
			if (isHttpError(dbError)) {
				throw dbError;
			}

			if (dbError instanceof RecipeDbError) {
				throw error(dbError.status, dbError.message);
			}
			throw error(500, 'Failed to delete recipe.');
		}

		return { success: true };
	}
};
