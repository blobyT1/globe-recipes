<script>
	import PageShell from '$lib/components/PageShell.svelte';
	import ContentBox from '$lib/components/ContentBox.svelte';
</script>

<PageShell
	backgroundImage="/images_background_pages/about_kitchen.png"
	overlayLight="rgba(255, 255, 255, 0.4)"
	overlayDark="rgba(10, 12, 16, 0.55)"
	sectionClass="py-4 py-lg-5"
>
	<div class="container d-flex justify-content-center">
		<ContentBox maxWidth="920px" className="w-100">
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
			<p class="mb-0">
				This website is a project as part of the study subject
				<strong>"Prototyping"</strong>, which is taught at <strong>ZHAW, Zurich University of Applied Sciences</strong>.
			</p>
		</ContentBox>
	</div>
</PageShell>
