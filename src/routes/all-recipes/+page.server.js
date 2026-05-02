import { recipes } from '$lib/data/recipes.js';

export async function load() {
	const sortedRecipes = [...recipes].sort((a, b) => {
		const continentCompare = a.continent.localeCompare(b.continent);
		if (continentCompare !== 0) return continentCompare;
		return a.title.localeCompare(b.title);
	});

	return {
		recipes: sortedRecipes
	};
}
