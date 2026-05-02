<section class="sa-page py-4 py-lg-5">
	<div class="container d-flex justify-content-center">
		<div class="sa-box p-4 p-md-5 shadow">
			<h1 class="mb-2">South America</h1>
			<h2 class="h4 mb-4 text-secondary">Flavor, Fire, and Celebration</h2>

			<div id="southAmericaCarousel" class="carousel slide mb-4">
				<div class="carousel-indicators">
					<button
						type="button"
						data-bs-target="#southAmericaCarousel"
						data-bs-slide-to="0"
						class="active"
						aria-current="true"
						aria-label="Slide 1"
					></button>
					<button
						type="button"
						data-bs-target="#southAmericaCarousel"
						data-bs-slide-to="1"
						aria-label="Slide 2"
					></button>
					<button
						type="button"
						data-bs-target="#southAmericaCarousel"
						data-bs-slide-to="2"
						aria-label="Slide 3"
					></button>
				</div>
				<div class="carousel-inner rounded-4 overflow-hidden">
					<div class="carousel-item active">
						<img
							src="/images_carousel/south_america/sa1.png"
							class="d-block w-100 carousel-image"
							alt="South American dish overview"
						/>
					</div>
					<div class="carousel-item">
						<img
							src="/images_carousel/south_america/sa2.png"
							class="d-block w-100 carousel-image"
							alt="South American food culture"
						/>
					</div>
					<div class="carousel-item">
						<img
							src="/images_carousel/south_america/sa3.png"
							class="d-block w-100 carousel-image"
							alt="South American culinary traditions"
						/>
					</div>
				</div>
				<button
					class="carousel-control-prev"
					type="button"
					data-bs-target="#southAmericaCarousel"
					data-bs-slide="prev"
				>
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button
					class="carousel-control-next"
					type="button"
					data-bs-target="#southAmericaCarousel"
					data-bs-slide="next"
				>
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
			</div>

			<p>
				South American cuisine is full of color, character, and deep tradition. Across the continent,
				cooking is shaped by mountain regions, tropical coasts, river systems, and fertile plains, each of
				which brings different ingredients and techniques to the table. Food is often fresh, expressive, and
				meant to be shared, with meals acting as an important part of family life and social gatherings.
			</p>
			<p>
				Grilled meats, corn-based dishes, beans, potatoes, and aromatic herbs appear in many regional
				kitchens, while seafood specialties shine along coastal areas. Street food culture is lively and
				creative, offering quick bites packed with bold flavor. At the same time, home cooking remains a
				strong tradition, with recipes passed down through generations and adapted to local produce and
				seasons.
			</p>
			<p>
				What makes South American cuisine especially exciting is its balance of comfort and variety. You can
				find rich slow-cooked stews, bright sauces, smoky grilled dishes, and refreshing fruit-based drinks
				all within a short distance. Festivals and celebrations often feature signature foods that connect
				people to regional identity, history, and pride.
			</p>
			<p class="mb-4">
				From high-altitude traditions to coastal specialties, South America offers a dynamic culinary story
				that keeps evolving while honoring its roots. It is a cuisine of warmth, rhythm, and hospitality,
				where every dish feels like an invitation to sit down, taste, and stay a little longer.
			</p>

			<div class="d-flex flex-wrap gap-2">
				<a class="btn btn-outline-primary" href="/">Back to Home</a>
				<button type="button" class="btn btn-primary">Check Out Recipes</button>
			</div>
		</div>
	</div>
</section>

<style>
	.sa-page {
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.38)),
			url('/images_background_pages/south_america_background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		min-height: calc(100vh - 110px);
	}

	.sa-box {
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

	:global(html[data-bs-theme='dark'] .sa-page) {
		background-image:
			linear-gradient(rgba(10, 12, 16, 0.52), rgba(10, 12, 16, 0.52)),
			url('/images_background_pages/south_america_background.png');
	}

	:global(html[data-bs-theme='dark'] .sa-box) {
		background-color: rgba(20, 24, 31, 0.9);
		color: #f8f9fa;
	}

	:global(html[data-bs-theme='dark'] .sa-box .text-secondary) {
		color: #cbd5e1 !important;
	}
</style>
