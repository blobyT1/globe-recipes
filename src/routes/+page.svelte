<section class="home-stage py-4">
	<div class="container home-content">
		<div class="text-center home-intro">
			<h1 class="fw-bold mb-2 page-title">Welcome to Globe Recipes!</h1>
			<p class="mb-0 page-subtitle">Please choose a continent:</p>
		</div>

		<div class="row g-3 justify-content-center">
			{#each [
				{
					name: 'North America',
					slug: 'north-america',
					image: '/images_continents/north_america.png'
				},
				{ name: 'Europe', slug: 'europe', image: '/images_continents/europe.png' },
				{ name: 'Asia', slug: 'asia', image: '/images_continents/asia.png' },
				{
					name: 'South America',
					slug: 'south-america',
					image: '/images_continents/south_america.png'
				},
				{ name: 'Africa', slug: 'africa', image: '/images_continents/africa.png' },
				{ name: 'Oceania', slug: 'oceania', image: '/images_continents/oceania.png' }
			] as continent}
				<div class="col-6 col-md-4 col-lg-4">
					<a class="continent-link text-decoration-none" href={`/continents/${continent.slug}`}>
						<div class="continent-box bg-white border rounded-4 shadow-sm overflow-hidden">
							<img
								src={continent.image}
								alt={continent.name}
								class="continent-image"
								loading="lazy"
								decoding="async"
							/>
						</div>
						<p class="continent-label fw-semibold text-center mt-2 mb-0">{continent.name}</p>
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.page-title,
	.page-subtitle,
	.continent-label {
		color: #0f172a;
	}

	.home-stage {
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)),
			url('/images_background_pages/home_background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		min-height: calc(100vh - 96px);
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

	.continent-box {
		aspect-ratio: 1 / 1;
		width: 100%;
		max-width: 200px;
		margin: 0 auto;
	}

	.continent-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.continent-link {
		display: block;
	}

	.continent-link:hover .continent-box {
		transform: translateY(-2px);
		transition: transform 0.2s ease;
	}

	:global(html[data-bs-theme='dark'] .home-stage) {
		background-image:
			linear-gradient(rgba(10, 12, 16, 0.5), rgba(10, 12, 16, 0.5)),
			url('/images_background_pages/home_background.png');
	}

	:global(html[data-bs-theme='dark'] .page-title),
	:global(html[data-bs-theme='dark'] .page-subtitle),
	:global(html[data-bs-theme='dark'] .continent-label) {
		color: #f8f9fa;
	}
</style>
