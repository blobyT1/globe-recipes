<script>
	let { data } = $props();
</script>

<section class="container py-4">
	<h1 class="mb-3">All Recipes</h1>
	<p class="text-secondary mb-4">Browse all available recipes and open one for full details.</p>

	<div class="table-responsive">
		<table class="table table-striped table-hover align-middle">
			<thead>
				<tr>
					<th scope="col">Title</th>
					<th scope="col">Continent</th>
					<th scope="col">Difficulty</th>
				</tr>
			</thead>
			<tbody>
				{#each data.recipes as recipe}
					<tr>
						<td>
							<a class="link-primary text-decoration-none fw-semibold" href={`/all-recipes/${recipe.id}`}>
								{recipe.title}
							</a>
						</td>
						<td>{recipe.continent}</td>
						<td class="text-capitalize">{recipe.difficulty}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
