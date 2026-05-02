<script>
	import ContinentInfoPage from '$lib/components/ContinentInfoPage.svelte';
	import { continentBySlug } from '$lib/data/continents.js';

	const continent = continentBySlug['asia'];
</script>

<ContinentInfoPage {continent} />
