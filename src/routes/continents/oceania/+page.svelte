<section class="oceania-page py-4 py-lg-5">
	<div class="container d-flex justify-content-center">
		<div class="oceania-box p-4 p-md-5 shadow">
			<h1 class="mb-2">Oceania</h1>
			<h2 class="h4 mb-4 text-secondary">Fresh Coasts and Island Traditions</h2>

			<div id="oceaniaCarousel" class="carousel slide mb-4">
				<div class="carousel-indicators">
					<button
						type="button"
						data-bs-target="#oceaniaCarousel"
						data-bs-slide-to="0"
						class="active"
						aria-current="true"
						aria-label="Slide 1"
					></button>
					<button
						type="button"
						data-bs-target="#oceaniaCarousel"
						data-bs-slide-to="1"
						aria-label="Slide 2"
					></button>
					<button
						type="button"
						data-bs-target="#oceaniaCarousel"
						data-bs-slide-to="2"
						aria-label="Slide 3"
					></button>
				</div>
				<div class="carousel-inner rounded-4 overflow-hidden">
					<div class="carousel-item active">
						<img
							src="/images_carousel/oceania/oc1.png"
							class="d-block w-100 carousel-image"
							alt="Oceania dish overview"
						/>
					</div>
					<div class="carousel-item">
						<img
							src="/images_carousel/oceania/oc2.png"
							class="d-block w-100 carousel-image"
							alt="Oceania food culture"
						/>
					</div>
					<div class="carousel-item">
						<img
							src="/images_carousel/oceania/oc3.png"
							class="d-block w-100 carousel-image"
							alt="Oceania culinary traditions"
						/>
					</div>
				</div>
				<button
					class="carousel-control-prev"
					type="button"
					data-bs-target="#oceaniaCarousel"
					data-bs-slide="prev"
				>
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button
					class="carousel-control-next"
					type="button"
					data-bs-target="#oceaniaCarousel"
					data-bs-slide="next"
				>
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
			</div>

			<p>
				Oceania cuisine is shaped by ocean landscapes, island agriculture, and strong community traditions.
				Across the region, food reflects a close relationship with nature, with fresh seafood, tropical fruits,
				root vegetables, and aromatic herbs playing central roles in everyday cooking.
			</p>
			<p>
				Many culinary traditions in Oceania emphasize simple preparation that lets ingredients shine. Grilling,
				roasting, steaming, and earth-oven techniques are common in different areas, often used for both daily
				meals and festive gatherings. Coastal influence is especially strong, with fish and shellfish appearing
				in a wide range of dishes, alongside coconut-based flavors and locally grown produce.
			</p>
			<p>
				Modern Oceania cuisine also includes creative multicultural influences, particularly in urban centers
				where local ingredients meet global methods. This blend creates a food culture that feels both grounded
				and innovative. Family meals, outdoor cooking, and shared platters remain important social traditions,
				bringing people together around seasonal and regional specialties.
			</p>
			<p class="mb-4">
				From island-inspired comfort foods to contemporary coastal dishes, Oceania offers a cuisine that is
				fresh, vibrant, and deeply connected to place. It is a culinary experience built on simplicity,
				hospitality, and respect for natural flavors.
			</p>

			<div class="d-flex flex-wrap gap-2">
				<a class="btn btn-outline-primary" href="/">Back to Home</a>
				<button type="button" class="btn btn-primary">Check Out Recipes</button>
			</div>
		</div>
	</div>
</section>

<style>
	.oceania-page {
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.38)),
			url('/images_background_pages/oceania_background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		min-height: calc(100vh - 110px);
	}

	.oceania-box {
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

	:global(html[data-bs-theme='dark'] .oceania-page) {
		background-image:
			linear-gradient(rgba(10, 12, 16, 0.52), rgba(10, 12, 16, 0.52)),
			url('/images_background_pages/oceania_background.png');
	}

	:global(html[data-bs-theme='dark'] .oceania-box) {
		background-color: rgba(20, 24, 31, 0.9);
		color: #f8f9fa;
	}

	:global(html[data-bs-theme='dark'] .oceania-box .text-secondary) {
		color: #cbd5e1 !important;
	}
</style>
