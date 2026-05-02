<script>
	let { items = [] } = $props();
</script>

<div class="row g-3 justify-content-center">
	{#each items as continent}
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

<style>
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

	.continent-label {
		color: #0f172a;
	}

	:global(html[data-bs-theme='dark'] .continent-label) {
		color: #f8f9fa;
	}
</style>
