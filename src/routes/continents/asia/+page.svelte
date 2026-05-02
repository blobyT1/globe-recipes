<section class="asia-page py-4 py-lg-5">
	<div class="container d-flex justify-content-center">
		<div class="asia-box p-4 p-md-5 shadow">
			<h1 class="mb-2">Asia</h1>
			<h2 class="h4 mb-4 text-secondary">Depth, Diversity, and Culinary Craft</h2>

			<div id="asiaCarousel" class="carousel slide mb-4">
				<div class="carousel-indicators">
					<button
						type="button"
						data-bs-target="#asiaCarousel"
						data-bs-slide-to="0"
						class="active"
						aria-current="true"
						aria-label="Slide 1"
					></button>
					<button type="button" data-bs-target="#asiaCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
					<button type="button" data-bs-target="#asiaCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
					<button type="button" data-bs-target="#asiaCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
				</div>
				<div class="carousel-inner rounded-4 overflow-hidden">
					<div class="carousel-item active">
						<img src="/images_carousel/asia/as1.png" class="d-block w-100 carousel-image" alt="Asian dish overview" />
					</div>
					<div class="carousel-item">
						<img src="/images_carousel/asia/as2.png" class="d-block w-100 carousel-image" alt="Asian food culture" />
					</div>
					<div class="carousel-item">
						<img src="/images_carousel/asia/as3.png" class="d-block w-100 carousel-image" alt="Asian culinary traditions" />
					</div>
					<div class="carousel-item">
						<img src="/images_carousel/asia/as4.png" class="d-block w-100 carousel-image" alt="Asian regional specialties" />
					</div>
				</div>
				<button class="carousel-control-prev" type="button" data-bs-target="#asiaCarousel" data-bs-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button class="carousel-control-next" type="button" data-bs-target="#asiaCarousel" data-bs-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
			</div>

			<p>
				Asian cuisine is one of the most diverse culinary landscapes in the world, shaped by centuries of
				tradition, trade, migration, and local innovation. From mountain regions to tropical coastlines, each
				area contributes distinct ingredients, flavors, and cooking styles. Meals often balance taste, texture,
				aroma, and presentation with remarkable attention to detail.
			</p>
			<p>
				Across the continent, rice, noodles, legumes, vegetables, herbs, and spices form the foundation of
				countless dishes. Fermented ingredients, broths, pickles, and spice pastes add depth and complexity,
				while grilling, steaming, stir-frying, baking, and slow cooking all play key roles. In many places,
				food is served in shared plates, encouraging connection and conversation at the table.
			</p>
			<p>
				Street food culture is especially vibrant and often reflects the heart of local cuisine: practical,
				creative, and full of personality. At the same time, ceremonial and festive dishes carry cultural meaning
				and are carefully prepared for family gatherings and seasonal celebrations. Everyday cooking and special
				occasion meals are both rooted in strong culinary identity.
			</p>
			<p class="mb-4">
				From comforting soups and fragrant curries to delicate dumplings and bold grilled specialties, Asian
				cuisine offers endless variety while staying deeply connected to place and tradition. It is a cuisine of
				precision, generosity, and discovery, where each dish tells a story and every meal invites exploration.
			</p>

			<div class="d-flex flex-wrap gap-2">
				<a class="btn btn-outline-primary" href="/">Back to Home</a>
				<button type="button" class="btn btn-primary">Check Out Recipes</button>
			</div>
		</div>
	</div>
</section>

<style>
	.asia-page {
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.38)),
			url('/images_background_pages/asia_background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		min-height: calc(100vh - 110px);
	}

	.asia-box {
		background-color: rgba(255, 255, 255, 0.93);
		border-radius: 1rem;
		max-width: 980px;
		margin: 0 auto;
		color: #1f2937;
	}

	.carousel-image {
		aspect-ratio: 16 / 9;
		object-fit: cover;
	}

	:global(html[data-bs-theme='dark'] .asia-page) {
		background-image:
			linear-gradient(rgba(10, 12, 16, 0.52), rgba(10, 12, 16, 0.52)),
			url('/images_background_pages/asia_background.png');
	}

	:global(html[data-bs-theme='dark'] .asia-box) {
		background-color: rgba(20, 24, 31, 0.9);
		color: #f8f9fa;
	}

	:global(html[data-bs-theme='dark'] .asia-box .text-secondary) {
		color: #cbd5e1 !important;
	}
</style>
