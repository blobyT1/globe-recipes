<script>
	let { homeHref = '/', recipesHref = null } = $props();
</script>

<div class="d-flex flex-wrap gap-2">
	<a class="btn btn-outline-primary" href={homeHref}>Back to Home</a>
	{#if recipesHref}
		<a class="btn btn-primary" href={recipesHref}>Check Out Recipes</a>
	{:else}
		<button type="button" class="btn btn-primary">Check Out Recipes</button>
	{/if}
</div>
