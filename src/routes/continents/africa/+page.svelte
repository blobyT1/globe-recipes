<script>
	import ContinentInfoPage from '$lib/components/ContinentInfoPage.svelte';
	import { continentBySlug } from '$lib/data/continents.js';

	const continent = continentBySlug['africa'];
</script>

<ContinentInfoPage {continent} />
