import { error, redirect } from '@sveltejs/kit';
import { recipes } from '$lib/data/recipes.js';

export async function load({ locals }) {
	const sortedRecipes = [...recipes].sort((a, b) => {
		const continentCompare = a.continent.localeCompare(b.continent);
		if (continentCompare !== 0) return continentCompare;
		return a.title.localeCompare(b.title);
	});

	return {
		recipes: sortedRecipes,
		currentUser: locals.user?.username ?? null
	};
}

export const actions = {
	delete: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login?next=/all-recipes');
		}

		const formData = await request.formData();
		const recipeId = Number(formData.get('id'));

		if (Number.isNaN(recipeId)) {
			throw error(400, 'Invalid recipe id');
		}

		const recipeIndex = recipes.findIndex(
			(recipe) =>
				recipe.id === recipeId &&
				recipe.isUserCreated &&
				recipe.owner &&
				recipe.owner === locals.user.username
		);
		if (recipeIndex !== -1) {
			recipes.splice(recipeIndex, 1);
		}

		return { success: true };
	}
};
