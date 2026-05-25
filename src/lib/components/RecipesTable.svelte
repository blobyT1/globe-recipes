<script>
	let {
		recipes = [],
		currentUserId = null,
		favoriteRecipeIds = [],
		emptyMessage = 'No recipes found.',
		showDelete = true
	} = $props();

	let sortColumn = $state('title');
	let sortDirection = $state('asc');

	const favoriteIdSet = $derived(new Set((favoriteRecipeIds ?? []).map((id) => String(id))));

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
		const list = [...recipes];

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

{#if sortedRecipes.length === 0}
	<p class="text-secondary mb-0">{emptyMessage}</p>
{:else}
	<div class="table-responsive">
		<table class="table table-striped table-hover align-middle mb-0">
			<thead>
				<tr>
					<th scope="col" class="star-col">Fav</th>
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
					{#if showDelete}
						<th scope="col">Actions</th>
					{/if}
				</tr>
			</thead>
			<tbody>
				{#each sortedRecipes as recipe}
					<tr>
						<td class="star-cell">
							<form method="POST" action="?/toggleFavorite">
								<input type="hidden" name="recipeId" value={recipe._id} />
								<button
									type="submit"
									class="favorite-icon-button"
									title={currentUserId
										? favoriteIdSet.has(recipe._id)
											? 'Remove from favorites'
											: 'Add to favorites'
										: 'Sign in to save favorites'}
									aria-label={currentUserId
										? favoriteIdSet.has(recipe._id)
											? 'Remove from favorites'
											: 'Add to favorites'
										: 'Sign in to save favorites'}
									disabled={!currentUserId}
								>
									{favoriteIdSet.has(recipe._id) ? '★' : '☆'}
								</button>
							</form>
						</td>
						<td>
							<a class="link-primary text-decoration-none fw-semibold" href={`/all-recipes/${recipe._id}`}>
								{recipe.title}
							</a>
						</td>
						<td>{recipe.continent}</td>
						<td class="text-capitalize">{recipe.difficulty}</td>
						<td>{recipe.cookingTime} min</td>
						{#if showDelete}
							<td>
								{#if recipe.isUserCreated && currentUserId && recipe.ownerId === currentUserId}
									<form method="POST" action="?/delete">
										<input type="hidden" name="id" value={recipe._id} />
										<button type="submit" class="btn btn-sm btn-outline-danger">Delete</button>
									</form>
								{:else}
									<span class="text-secondary">-</span>
								{/if}
							</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

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

	.star-col,
	.star-cell {
		width: 64px;
		text-align: center;
	}

	.favorite-icon-button {
		border: 0;
		background: transparent;
		font-size: 1.35rem;
		line-height: 1;
		color: #f1b928;
		padding: 0.2rem 0.3rem;
	}

	.favorite-icon-button[disabled] {
		color: #cbd5e1;
		cursor: not-allowed;
	}

	:global(html[data-bs-theme='dark'] .favorite-icon-button[disabled]) {
		color: #64748b;
	}
</style>
