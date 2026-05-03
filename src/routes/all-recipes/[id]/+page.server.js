import { error } from '@sveltejs/kit';
import { recipes } from '$lib/data/recipes.js';

export async function load({ params }) {
	const recipeId = Number(params.id);
	const recipe = recipes.find((item) => item.id === recipeId);

	if (Number.isNaN(recipeId) || !recipe) {
		throw error(404, 'Recipe not found');
	}

	return {
		recipe
	};
}
