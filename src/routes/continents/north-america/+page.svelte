<section class="na-page py-4 py-lg-5">
	<div class="container d-flex justify-content-center">
		<div class="na-box p-4 p-md-5 shadow">
			<h1 class="mb-2">North America</h1>
			<h2 class="h4 mb-4 text-secondary">A Continent of Many Kitchens</h2>

			<div id="northAmericaCarousel" class="carousel slide mb-4">
				<div class="carousel-indicators">
					<button
						type="button"
						data-bs-target="#northAmericaCarousel"
						data-bs-slide-to="0"
						class="active"
						aria-current="true"
						aria-label="Slide 1"
					></button>
					<button
						type="button"
						data-bs-target="#northAmericaCarousel"
						data-bs-slide-to="1"
						aria-label="Slide 2"
					></button>
					<button
						type="button"
						data-bs-target="#northAmericaCarousel"
						data-bs-slide-to="2"
						aria-label="Slide 3"
					></button>
				</div>
				<div class="carousel-inner rounded-4 overflow-hidden">
					<div class="carousel-item active">
						<img
							src="/images_carousel/north_america/na1.png"
							class="d-block w-100 carousel-image"
							alt="North American dish overview"
						/>
					</div>
					<div class="carousel-item">
						<img
							src="/images_carousel/north_america/na2.png"
							class="d-block w-100 carousel-image"
							alt="North American food culture"
						/>
					</div>
					<div class="carousel-item">
						<img
							src="/images_carousel/north_america/na3.png"
							class="d-block w-100 carousel-image"
							alt="North American culinary traditions"
						/>
					</div>
				</div>
				<button
					class="carousel-control-prev"
					type="button"
					data-bs-target="#northAmericaCarousel"
					data-bs-slide="prev"
				>
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button
					class="carousel-control-next"
					type="button"
					data-bs-target="#northAmericaCarousel"
					data-bs-slide="next"
				>
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
			</div>

			<p>
				North American cuisine is shaped by movement, exchange, and creativity. It brings together
				indigenous food knowledge, regional ingredients, and culinary traditions carried by communities
				from around the world. Across the continent, cooking is often connected to local landscapes:
				coastal areas celebrate seafood, farming regions highlight grains and produce, and colder climates
				favor hearty dishes built for comfort and sharing.
			</p>
			<p>
				One of the most exciting things about North American food is how quickly it adapts. A classic
				recipe can appear in many versions, each reflecting a different city, family, or cultural
				background. Street food stands, neighborhood diners, and modern restaurants often sit side by side,
				offering everything from slow-cooked specialties to quick, flavor-packed snacks. This mix makes the
				food scene feel familiar and adventurous at the same time.
			</p>
			<p>
				Seasonality also plays a big role. Summer menus are often fresh and colorful, while cooler months
				bring baked dishes, soups, and rich sauces. Shared meals, weekend brunches, and festive holiday
				tables are an important part of daily life in many places. Even simple dishes are often connected to
				storytelling: where the ingredients come from, who taught the recipe, and what occasion it was first
				cooked for.
			</p>
			<p class="mb-4">
				From smoky barbecue traditions and corn-based staples to vibrant fusion cuisine in major cities,
				North America offers a broad culinary identity that is always evolving. It is a cuisine of comfort,
				innovation, and community, where familiar flavors and new ideas are always welcome on the same
				plate.
			</p>

			<div class="d-flex flex-wrap gap-2">
				<a class="btn btn-outline-primary" href="/">Back to Home</a>
				<button type="button" class="btn btn-primary">Check Out Recipes</button>
			</div>
		</div>
	</div>
</section>

<style>
	.na-page {
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.38)),
			url('/images_background_pages/north_america_background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		min-height: calc(100vh - 110px);
	}

	.na-box {
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

	:global(html[data-bs-theme='dark'] .na-page) {
		background-image:
			linear-gradient(rgba(10, 12, 16, 0.52), rgba(10, 12, 16, 0.52)),
			url('/images_background_pages/north_america_background.png');
	}

	:global(html[data-bs-theme='dark'] .na-box) {
		background-color: rgba(20, 24, 31, 0.9);
		color: #f8f9fa;
	}

	:global(html[data-bs-theme='dark'] .na-box .text-secondary) {
		color: #cbd5e1 !important;
	}
</style>
