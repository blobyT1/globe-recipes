<script>
	import ContentBox from '$lib/components/ContentBox.svelte';
	import PageShell from '$lib/components/PageShell.svelte';

	let { data } = $props();
	let sortColumn = $state('title');
	let sortDirection = $state('asc');

	function toggleSort(column) {
		if (sortColumn === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
			return;
		}

		sortColumn = column;
		sortDirection = 'asc';
	}

	function getSortIcon(column) {
		if (sortColumn !== column) return '<>';
		return sortDirection === 'asc' ? '^' : 'v';
	}

	const sortedRecipes = $derived.by(() => {
		const direction = sortDirection === 'asc' ? 1 : -1;
		const list = [...data.recipes];

		list.sort((a, b) => {
			const aValue = a[sortColumn];
			const bValue = b[sortColumn];

			if (typeof aValue === 'number' && typeof bValue === 'number') {
				return (aValue - bValue) * direction;
			}

			return String(aValue).localeCompare(String(bValue), undefined, { sensitivity: 'base' }) * direction;
		});

		return list;
	});
</script>

<PageShell
	backgroundImage="/images_background_pages/allRecipes_background.png"
	overlayLight="rgba(255, 255, 255, 0.48)"
	overlayDark="rgba(10, 12, 16, 0.62)"
	sectionClass="py-4 py-lg-5"
>
	<div class="container d-flex justify-content-center">
		<ContentBox maxWidth="1080px" className="w-100">
			<h1 class="mb-3">All Recipes</h1>
			<p class="text-secondary mb-4">Browse all available recipes and open one for full details.</p>

			<div class="table-responsive">
				<table class="table table-striped table-hover align-middle mb-0">
					<thead>
						<tr>
							<th scope="col">
								<button class="sort-button" type="button" onclick={() => toggleSort('title')}>
									Title <span class="sort-icon">{getSortIcon('title')}</span>
								</button>
							</th>
							<th scope="col">
								<button class="sort-button" type="button" onclick={() => toggleSort('continent')}>
									Continent <span class="sort-icon">{getSortIcon('continent')}</span>
								</button>
							</th>
							<th scope="col">
								<button class="sort-button" type="button" onclick={() => toggleSort('difficulty')}>
									Difficulty <span class="sort-icon">{getSortIcon('difficulty')}</span>
								</button>
							</th>
							<th scope="col">
								<button class="sort-button" type="button" onclick={() => toggleSort('cookingTime')}>
									Cooking Time <span class="sort-icon">{getSortIcon('cookingTime')}</span>
								</button>
							</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each sortedRecipes as recipe}
							<tr>
								<td>
									<a class="link-primary text-decoration-none fw-semibold" href={`/all-recipes/${recipe._id}`}>
										{recipe.title}
									</a>
								</td>
								<td>{recipe.continent}</td>
								<td class="text-capitalize">{recipe.difficulty}</td>
								<td>{recipe.cookingTime} min</td>
								<td>
									{#if recipe.isUserCreated && data.currentUser && recipe.owner === data.currentUser}
										<form method="POST" action="?/delete">
											<input type="hidden" name="id" value={recipe._id} />
											<button type="submit" class="btn btn-sm btn-outline-danger">Delete</button>
										</form>
									{:else}
										<span class="text-secondary">-</span>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</ContentBox>
	</div>
</PageShell>

<style>
	.sort-button {
		border: 0;
		background: none;
		padding: 0;
		font-weight: 600;
		color: inherit;
	}

	.sort-icon {
		color: var(--bs-secondary-color);
		margin-left: 0.2rem;
		font-size: 0.85em;
	}
</style>

