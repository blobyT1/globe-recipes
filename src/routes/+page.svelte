<script>
	import PageShell from '$lib/components/PageShell.svelte';
	import ContinentCardGrid from '$lib/components/ContinentCardGrid.svelte';
	import { continents } from '$lib/data/continents.js';

	const continentCards = continents.map((continent) => ({
		name: continent.name,
		slug: continent.slug,
		image: continent.cardImage
	}));
</script>

<PageShell
	backgroundImage="/images_background_pages/home_background.png"
	overlayLight="rgba(255, 255, 255, 0.3)"
	overlayDark="rgba(10, 12, 16, 0.5)"
	minHeight="calc(100vh - 96px)"
	sectionClass="py-4"
>
	<div class="container home-content">
		<div class="text-center home-intro">
			<h1 class="fw-bold mb-2 page-title">Welcome to Globe Recipes!</h1>
			<p class="mb-0 page-subtitle">Please choose a continent:</p>
		</div>
		<ContinentCardGrid items={continentCards} />
	</div>
</PageShell>

<style>
	.page-title,
	.page-subtitle {
		color: #0f172a;
	}

	.home-content {
		min-height: calc(100vh - 96px);
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.home-intro {
		margin-bottom: clamp(1rem, 2.2vh, 1.75rem);
		transform: translateY(clamp(-18px, -2vh, -10px));
	}

	:global(html[data-bs-theme='dark'] .page-title),
	:global(html[data-bs-theme='dark'] .page-subtitle) {
		color: #f8f9fa;
	}
</style>
