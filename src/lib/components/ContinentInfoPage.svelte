<script>
	import PageShell from '$lib/components/PageShell.svelte';
	import ContentBox from '$lib/components/ContentBox.svelte';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import ContinentActionButtons from '$lib/components/ContinentActionButtons.svelte';
	import { continentLinks } from '$lib/data/continents.js';

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

			<div class="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2">
				<ContinentActionButtons />
				<div class="dropdown ms-lg-auto">
					<button
						class="btn btn-outline-secondary dropdown-toggle"
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
						id={`${continent.slug}-continent-dropdown`}
					>
						Explore Other Continents
					</button>
					<ul class="dropdown-menu" aria-labelledby={`${continent.slug}-continent-dropdown`}>
						{#each continentLinks.filter((link) => link.href !== `/continents/${continent.slug}`) as link}
							<li><a class="dropdown-item" href={link.href}>{link.label}</a></li>
						{/each}
					</ul>
				</div>
			</div>
		</ContentBox>
	</div>
</PageShell>

<style>
	:global(html[data-bs-theme='dark'] .continent-box .text-secondary) {
		color: #cbd5e1 !important;
	}
</style>
