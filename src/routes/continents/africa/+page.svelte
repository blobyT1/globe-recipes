<section class="africa-page py-4 py-lg-5">
	<div class="container d-flex justify-content-center">
		<div class="africa-box p-4 p-md-5 shadow">
			<h1 class="mb-2">Africa</h1>
			<h2 class="h4 mb-4 text-secondary">Tradition, Spice, and Shared Tables</h2>

			<div id="africaCarousel" class="carousel slide mb-4">
				<div class="carousel-indicators">
					<button
						type="button"
						data-bs-target="#africaCarousel"
						data-bs-slide-to="0"
						class="active"
						aria-current="true"
						aria-label="Slide 1"
					></button>
					<button
						type="button"
						data-bs-target="#africaCarousel"
						data-bs-slide-to="1"
						aria-label="Slide 2"
					></button>
					<button
						type="button"
						data-bs-target="#africaCarousel"
						data-bs-slide-to="2"
						aria-label="Slide 3"
					></button>
				</div>
				<div class="carousel-inner rounded-4 overflow-hidden">
					<div class="carousel-item active">
						<img
							src="/images_carousel/africa/af1.png"
							class="d-block w-100 carousel-image"
							alt="African dish overview"
						/>
					</div>
					<div class="carousel-item">
						<img
							src="/images_carousel/africa/af2.png"
							class="d-block w-100 carousel-image"
							alt="African food culture"
						/>
					</div>
					<div class="carousel-item">
						<img
							src="/images_carousel/africa/af3.png"
							class="d-block w-100 carousel-image"
							alt="African culinary traditions"
						/>
					</div>
				</div>
				<button
					class="carousel-control-prev"
					type="button"
					data-bs-target="#africaCarousel"
					data-bs-slide="prev"
				>
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button
					class="carousel-control-next"
					type="button"
					data-bs-target="#africaCarousel"
					data-bs-slide="next"
				>
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
			</div>

			<p>
				African cuisine is diverse, deeply rooted, and full of character. Across the continent, food reflects
				local climates, landscapes, and communities, from coastal regions rich in seafood to inland areas known
				for grains, legumes, and slow-cooked stews. Meals are often built around fresh ingredients and prepared
				with techniques that have been refined over generations.
			</p>
			<p>
				Many African kitchens are known for layered spice combinations, aromatic sauces, and strong flavor
				balance. Staples such as millet, sorghum, rice, cassava, yams, beans, and maize appear in many forms,
				while vegetables, meats, and fish vary by region. Flatbreads, porridges, and one-pot dishes are common
				and often designed for sharing, turning everyday meals into social moments.
			</p>
			<p>
				Street food culture also plays an important role, offering quick, delicious dishes that capture local
				taste and creativity. At the same time, festive cooking remains central to family events and cultural
				celebrations, where certain dishes are prepared with special care and meaning. Food is not only about
				nourishment, but also about identity, memory, and hospitality.
			</p>
			<p class="mb-4">
				From smoky grilled recipes and richly spiced stews to bright vegetable combinations and comforting grain
				dishes, African cuisine tells a story of resilience, innovation, and tradition. It is warm, generous,
				and full of culinary depth, offering flavors that are both grounding and unforgettable.
			</p>

			<div class="d-flex flex-wrap gap-2">
				<a class="btn btn-outline-primary" href="/">Back to Home</a>
				<button type="button" class="btn btn-primary">Check Out Recipes</button>
			</div>
		</div>
	</div>
</section>

<style>
	.africa-page {
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.38)),
			url('/images_background_pages/africa_background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		min-height: calc(100vh - 110px);
	}

	.africa-box {
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

	:global(html[data-bs-theme='dark'] .africa-page) {
		background-image:
			linear-gradient(rgba(10, 12, 16, 0.52), rgba(10, 12, 16, 0.52)),
			url('/images_background_pages/africa_background.png');
	}

	:global(html[data-bs-theme='dark'] .africa-box) {
		background-color: rgba(20, 24, 31, 0.9);
		color: #f8f9fa;
	}

	:global(html[data-bs-theme='dark'] .africa-box .text-secondary) {
		color: #cbd5e1 !important;
	}
</style>
