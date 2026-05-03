<script>
	let { homeHref = '/', recipesHref = '/all-recipes' } = $props();
</script>

<div class="d-flex flex-wrap gap-2">
	<a class="btn btn-outline-primary" href={homeHref}>Back to Home</a>
	<a class="btn btn-primary" href={recipesHref}>Go To All Recipes</a>
</div>
