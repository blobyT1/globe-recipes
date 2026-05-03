<script>
	let { data } = $props();
</script>

<section class="container py-4">
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
		</div>
		<div class="col-md-4">
			<div class="p-3 rounded border bg-body-tertiary">
				<div><strong>ID:</strong> {data.recipe._id}</div>
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
</section>
