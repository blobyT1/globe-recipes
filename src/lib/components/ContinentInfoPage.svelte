<script>
	import PageShell from '$lib/components/PageShell.svelte';
	import ContentBox from '$lib/components/ContentBox.svelte';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import ContinentActionButtons from '$lib/components/ContinentActionButtons.svelte';

	let { continent } = $props();
</script>

<PageShell backgroundImage={continent.backgroundImage} sectionClass="py-4 py-lg-5">
	<div class="container d-flex justify-content-center">
		<ContentBox className="continent-box">
			<h1 class="mb-2">{continent.name}</h1>
			<h2 class="h4 mb-4 text-secondary">{continent.tagline}</h2>

			<ImageCarousel id={`${continent.slug}Carousel`} images={continent.carouselImages} />

			{#each continent.description as paragraph, index}
				<p class={index === continent.description.length - 1 ? 'mb-4' : ''}>{paragraph}</p>
			{/each}

			<ContinentActionButtons />
		</ContentBox>
	</div>
</PageShell>

<style>
	:global(html[data-bs-theme='dark'] .continent-box .text-secondary) {
		color: #cbd5e1 !important;
	}
</style>
