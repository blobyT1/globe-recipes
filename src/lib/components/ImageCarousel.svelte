<script>
	import { onMount } from 'svelte';

	let { id, images = [], aspectRatio = '16 / 9', autoSlide = true, intervalMs = 5000 } = $props();
	let carouselElement;

	onMount(() => {
		const BootstrapCarousel = globalThis?.bootstrap?.Carousel;
		if (!BootstrapCarousel || !carouselElement) return;

		const instance = BootstrapCarousel.getOrCreateInstance(carouselElement, {
			interval: intervalMs,
			pause: 'hover',
			ride: autoSlide ? 'carousel' : false,
			wrap: true
		});

		if (autoSlide) {
			instance.cycle();
		}

		return () => {
			instance.dispose();
		};
	});
</script>

<div
	bind:this={carouselElement}
	id={id}
	class="carousel slide mb-4"
	data-bs-ride={autoSlide ? 'carousel' : undefined}
	data-bs-interval={intervalMs}
	data-bs-pause="hover"
	style={`--carousel-ratio: ${aspectRatio};`}
>
	<div class="carousel-indicators">
		{#each images as _image, index}
			<button
				type="button"
				data-bs-target={`#${id}`}
				data-bs-slide-to={index}
				class:active={index === 0}
				aria-current={index === 0 ? 'true' : undefined}
				aria-label={`Slide ${index + 1}`}
			></button>
		{/each}
	</div>
	<div class="carousel-inner rounded-4 overflow-hidden">
		{#each images as image, index}
			<div class={`carousel-item ${index === 0 ? 'active' : ''}`}>
				<img src={image.src} class="d-block w-100 carousel-image" alt={image.alt} loading="lazy" decoding="async" />
			</div>
		{/each}
	</div>
	<button class="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
		<span class="carousel-control-prev-icon" aria-hidden="true"></span>
		<span class="visually-hidden">Previous</span>
	</button>
	<button class="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
		<span class="carousel-control-next-icon" aria-hidden="true"></span>
		<span class="visually-hidden">Next</span>
	</button>
</div>

<style>
	.carousel-image {
		aspect-ratio: var(--carousel-ratio);
		object-fit: cover;
	}
</style>
