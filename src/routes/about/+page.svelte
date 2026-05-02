<section class="about-page py-4 py-lg-5">
	<div class="container d-flex justify-content-center">
		<div class="about-box p-4 p-md-5 shadow">
			<h1 class="mb-3">About Globe Recipes</h1>
			<p>
				Globe Recipes explores the culinary side of every continent in a simple and enjoyable way. We
				highlight what makes each region special and celebrate the stories behind the meals people share
				every day.
			</p>
			<p>
				In North America, comfort food and international fusion often meet on one plate. South America
				brings colorful ingredients, grilled traditions, and lively street snacks. Europe offers a rich mix
				of rustic classics and refined culinary heritage. Africa is full of bold spices, warm stews, and
				community-centered cooking. Asia features incredible variety, from delicate broths to vibrant
				noodle and rice dishes. Oceania combines fresh coastal flavors with modern creativity and local
				seasonal produce.
			</p>
			<p>
				Along the way, Globe Recipes shares famous dishes, cultural context, and fun trivia, including
				little facts you might not expect, like breakfast traditions that change from valley to valley or
				celebration foods prepared only once a year. The goal is to keep learning lighthearted, welcoming,
				and full of curiosity.
			</p>
			<p class="mb-0">
				This website is a project as part of the study subject
				<strong>"Prototyping"</strong>, which is taught at <strong>ZHAW, Zurich University of Applied Sciences</strong>.
			</p>
		</div>
	</div>
</section>

<style>
	.about-page {
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)),
			url('/images_background_pages/about_kitchen.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		min-height: calc(100vh - 110px);
	}

	.about-box {
		background-color: rgba(255, 255, 255, 0.93);
		border-radius: 1rem;
		max-width: 920px;
		margin: 0 auto;
		color: #1f2937;
	}

	:global(html[data-bs-theme='dark'] .about-page) {
		background-image:
			linear-gradient(rgba(10, 12, 16, 0.55), rgba(10, 12, 16, 0.55)),
			url('/images_background_pages/about_kitchen.png');
	}

	:global(html[data-bs-theme='dark'] .about-box) {
		background-color: rgba(20, 24, 31, 0.9);
		color: #f8f9fa;
	}
</style>
