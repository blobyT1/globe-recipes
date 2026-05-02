<script>
	import { continentLinks } from '$lib/data/continents.js';
</script>

<section class="container py-4">
	<h1 class="mb-3">Continents</h1>
	<div class="list-group">
		{#each continentLinks as continent}
			<a class="list-group-item list-group-item-action" href={continent.href}>{continent.label}</a>
		{/each}
	</div>
</section>
