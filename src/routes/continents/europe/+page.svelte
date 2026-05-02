<section class="europe-page py-4 py-lg-5">
	<div class="container d-flex justify-content-center">
		<div class="europe-box p-4 p-md-5 shadow">
			<h1 class="mb-2">Europe</h1>
			<h2 class="h4 mb-4 text-secondary">Heritage, Craft, and Regional Flavor</h2>

			<div id="europeCarousel" class="carousel slide mb-4">
				<div class="carousel-indicators">
					<button
						type="button"
						data-bs-target="#europeCarousel"
						data-bs-slide-to="0"
						class="active"
						aria-current="true"
						aria-label="Slide 1"
					></button>
					<button
						type="button"
						data-bs-target="#europeCarousel"
						data-bs-slide-to="1"
						aria-label="Slide 2"
					></button>
					<button
						type="button"
						data-bs-target="#europeCarousel"
						data-bs-slide-to="2"
						aria-label="Slide 3"
					></button>
					<button
						type="button"
						data-bs-target="#europeCarousel"
						data-bs-slide-to="3"
						aria-label="Slide 4"
					></button>
				</div>
				<div class="carousel-inner rounded-4 overflow-hidden">
					<div class="carousel-item active">
						<img
							src="/images_carousel/europe/eu1.png"
							class="d-block w-100 carousel-image"
							alt="European dish overview"
						/>
					</div>
					<div class="carousel-item">
						<img
							src="/images_carousel/europe/eu2.png"
							class="d-block w-100 carousel-image"
							alt="European food culture"
						/>
					</div>
					<div class="carousel-item">
						<img
							src="/images_carousel/europe/eu3.png"
							class="d-block w-100 carousel-image"
							alt="European culinary traditions"
						/>
					</div>
					<div class="carousel-item">
						<img
							src="/images_carousel/europe/eu4.png"
							class="d-block w-100 carousel-image"
							alt="European regional specialties"
						/>
					</div>
				</div>
				<button
					class="carousel-control-prev"
					type="button"
					data-bs-target="#europeCarousel"
					data-bs-slide="prev"
				>
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button
					class="carousel-control-next"
					type="button"
					data-bs-target="#europeCarousel"
					data-bs-slide="next"
				>
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
			</div>

			<p>
				European cuisine is rooted in regional identity, seasonal ingredients, and a long tradition of culinary
				craft. Across the continent, food culture reflects local climate, geography, and history, resulting in
				distinct cooking styles that can change dramatically from one area to the next. From coastal seafood
				plates to mountain-inspired comfort dishes, variety is one of Europe&apos;s greatest strengths.
			</p>
			<p>
				Bread, cheese, olive oil, grains, potatoes, herbs, cured meats, and fresh produce all play important
				roles, depending on region and season. Slow braising, roasting, baking, and sauce-making remain central
				in many traditional kitchens, while modern European cuisine continues to reinterpret classics with lighter
				techniques and global influences. Markets, bakeries, and neighborhood cafes are often key parts of daily
				life.
			</p>
			<p>
				Another defining trait is the connection between food and occasion. Weekend family lunches, festive
				holiday meals, and local food festivals often highlight signature recipes that carry cultural memory.
				Many dishes are simple in structure yet rich in technique, proving that quality ingredients and thoughtful
				preparation can create lasting flavor.
			</p>
			<p class="mb-4">
				From rustic countryside tables to elegant city dining, European cuisine combines tradition and evolution
				with remarkable balance. It is a culinary landscape of texture, depth, and regional pride, where each
				meal offers both familiarity and discovery.
			</p>

			<div class="d-flex flex-wrap gap-2">
				<a class="btn btn-outline-primary" href="/">Back to Home</a>
				<button type="button" class="btn btn-primary">Check Out Recipes</button>
			</div>
		</div>
	</div>
</section>

<style>
	.europe-page {
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.38)),
			url('/images_background_pages/europe_background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		min-height: calc(100vh - 110px);
	}

	.europe-box {
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

	:global(html[data-bs-theme='dark'] .europe-page) {
		background-image:
			linear-gradient(rgba(10, 12, 16, 0.52), rgba(10, 12, 16, 0.52)),
			url('/images_background_pages/europe_background.png');
	}

	:global(html[data-bs-theme='dark'] .europe-box) {
		background-color: rgba(20, 24, 31, 0.9);
		color: #f8f9fa;
	}

	:global(html[data-bs-theme='dark'] .europe-box .text-secondary) {
		color: #cbd5e1 !important;
	}
</style>
