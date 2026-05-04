<script>
	let { homeHref = '/', recipesHref = '/all-recipes' } = $props();
</script>

<div class="d-flex w-100 flex-column flex-sm-row gap-2">
	<a class="btn btn-outline-primary" href={homeHref}>Back to Home</a>
	<a class="btn btn-primary ms-sm-auto" href={recipesHref}>Go To All Recipes</a>
</div>
