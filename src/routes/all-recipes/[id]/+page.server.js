import { error } from '@sveltejs/kit';
import { recipes } from '$lib/data/recipes.js';

export async function load({ params }) {
	const recipe = recipes.find((item) => item.id === params.id);

	if (!recipe) {
		throw error(404, 'Recipe not found');
	}

	return {
		recipe
	};
}
