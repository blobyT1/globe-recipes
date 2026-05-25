<script>
	import ContentBox from '$lib/components/ContentBox.svelte';
	import PageShell from '$lib/components/PageShell.svelte';

	let { data } = $props();
	let isFavorite = $state(false);

	const creatorName = $derived(
		data.recipe.isUserCreated ? (data.recipe.ownerUsername ?? 'Unknown User') : 'Globe Recipes'
	);
</script>

<PageShell
	backgroundImage="/images_background_pages/recipeDetailPage_background.png"
	overlayLight="rgba(255, 255, 255, 0.48)"
	overlayDark="rgba(10, 12, 16, 0.62)"
	sectionClass="py-4 py-lg-5"
>
	<div class="container d-flex justify-content-center">
		<ContentBox maxWidth="1080px" className="w-100">
			<div class="mb-3">
				<a class="link-primary text-decoration-none" href="/all-recipes">Back to all recipes</a>
			</div>

			<h1 class="mb-2">{data.recipe.title}</h1>
			<p class="text-secondary mb-4">{data.recipe.description}</p>

			<div class="row g-3 mb-4">
				<div class="col-md-4">
					<div class="p-3 rounded border bg-body-tertiary">
						<div><strong>Continent:</strong> {data.recipe.continent}</div>
						<div><strong>Country:</strong> {data.recipe.country}</div>
						<div class="text-capitalize"><strong>Difficulty:</strong> {data.recipe.difficulty}</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="p-3 rounded border bg-body-tertiary">
						<div><strong>Cooking Time:</strong> {data.recipe.cookingTime} min</div>
						<div><strong>Servings:</strong> {data.recipe.servings}</div>
						<div><strong>User Created:</strong> {data.recipe.isUserCreated ? 'Yes' : 'No'}</div>
					</div>
					<div class="p-3 rounded border bg-body-tertiary mt-3">
						<div class="mb-2">
							<strong>Created by:</strong>
							{creatorName}
						</div>
						<button
							type="button"
							class="btn btn-outline-warning btn-sm favorite-button"
							aria-pressed={isFavorite}
							aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
							onclick={() => (isFavorite = !isFavorite)}
						>
							{isFavorite ? '★ Favorite' : '☆ Favorite'}
						</button>
					</div>
				</div>
			</div>

			<div class="row g-4">
				<div class="col-lg-5">
					<h2 class="h4 mb-3">Ingredients</h2>
					<ul class="list-group">
						{#each data.recipe.ingredients as ingredient}
							<li class="list-group-item">{ingredient}</li>
						{/each}
					</ul>
				</div>
				<div class="col-lg-7">
					<h2 class="h4 mb-3">Instructions</h2>
					<ol class="list-group list-group-numbered">
						{#each data.recipe.instructions as step}
							<li class="list-group-item">{step}</li>
						{/each}
					</ol>
				</div>
			</div>
		</ContentBox>
	</div>
</PageShell>

<style>
	:global(html[data-bs-theme='dark'] .list-group-item) {
		background-color: rgba(20, 24, 31, 0.9);
		color: #f8f9fa;
		border-color: rgba(203, 213, 225, 0.2);
	}

	.favorite-button {
		min-width: 130px;
	}
</style>
