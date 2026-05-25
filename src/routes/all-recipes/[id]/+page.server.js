import { error, redirect } from '@sveltejs/kit';
import {
	RecipeDbError,
	getRecipeById,
	isRecipeFavoritedByUser,
	toggleRecipeFavorite
} from '$lib/server/recipes-db.js';

export async function load({ params, locals }) {
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

	let isFavorite = false;
	if (locals.user?.id) {
		try {
			isFavorite = await isRecipeFavoritedByUser(params.id, locals.user.id);
		} catch (dbError) {
			if (dbError instanceof RecipeDbError) {
				throw error(dbError.status, dbError.message);
			}
			throw error(500, 'Failed to load favorite state.');
		}
	}

	return {
		recipe,
		isFavorite,
		currentUserId: locals.user?.id ?? null
	};
}

export const actions = {
	toggleFavorite: async ({ params, locals }) => {
		if (!locals.user) {
			throw redirect(303, `/login?next=/all-recipes/${params.id}`);
		}

		try {
			await toggleRecipeFavorite(params.id, locals.user.id);
			return { success: true };
		} catch (dbError) {
			if (dbError instanceof RecipeDbError) {
				throw error(dbError.status, dbError.message);
			}
			throw error(500, 'Failed to update favorite.');
		}
	}
};
