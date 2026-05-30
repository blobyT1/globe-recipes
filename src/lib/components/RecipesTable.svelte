<script>
	import { goto } from '$app/navigation';
	import ConfirmDeleteModal from '$lib/components/ConfirmDeleteModal.svelte';

	let {
		recipes = [],
		currentUserId = null,
		favoriteRecipeIds = [],
		emptyMessage = 'No recipes found.',
		showDelete = true
	} = $props();

	let sortColumn = $state('title');
	let sortDirection = $state('asc');
	let draftSearchQuery = $state('');
	let draftSelectedContinent = $state('all');
	let draftSelectedDifficulty = $state('all');
	let draftCookingTimeMin = $state('');
	let draftCookingTimeMax = $state('');
	let appliedSearchQuery = $state('');
	let appliedSelectedContinent = $state('all');
	let appliedSelectedDifficulty = $state('all');
	let appliedCookingTimeMin = $state('');
	let appliedCookingTimeMax = $state('');
	let showDeleteConfirm = $state(false);
	let allowDeleteSubmit = $state(false);
	let pendingDeleteForm = $state(null);
	let itemsPerPage = $state(10);
	let currentPage = $state(1);

	const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

	const favoriteIdSet = $derived(new Set((favoriteRecipeIds ?? []).map((id) => String(id))));
	const continentOptions = $derived.by(() =>
		[...new Set((recipes ?? []).map((recipe) => recipe.continent).filter(Boolean))].sort((a, b) =>
			String(a).localeCompare(String(b), undefined, { sensitivity: 'base' })
		)
	);
	const difficultyOptions = $derived.by(() =>
		[...new Set((recipes ?? []).map((recipe) => recipe.difficulty).filter(Boolean))].sort((a, b) =>
			String(a).localeCompare(String(b), undefined, { sensitivity: 'base' })
		)
	);
	function applyFilters(event) {
		event?.preventDefault();
		appliedSearchQuery = draftSearchQuery;
		appliedSelectedContinent = draftSelectedContinent;
		appliedSelectedDifficulty = draftSelectedDifficulty;
		appliedCookingTimeMin = draftCookingTimeMin;
		appliedCookingTimeMax = draftCookingTimeMax;
		currentPage = 1;
	}

	function resetFilters() {
		draftSearchQuery = '';
		draftSelectedContinent = 'all';
		draftSelectedDifficulty = 'all';
		draftCookingTimeMin = '';
		draftCookingTimeMax = '';
		appliedSearchQuery = '';
		appliedSelectedContinent = 'all';
		appliedSelectedDifficulty = 'all';
		appliedCookingTimeMin = '';
		appliedCookingTimeMax = '';
		currentPage = 1;
	}

	function setItemsPerPage(value) {
		itemsPerPage = Number(value);
		currentPage = 1;
	}

	function goToPage(pageNumber) {
		const parsedPage = Number(pageNumber);
		if (!Number.isInteger(parsedPage)) return;
		currentPage = Math.max(1, Math.min(totalPages, parsedPage));
	}

	function goToPreviousPage() {
		if (currentPage <= 1) return;
		currentPage -= 1;
	}

	function goToNextPage() {
		if (currentPage >= totalPages) return;
		currentPage += 1;
	}

	function toSearchableText(recipe) {
		const textParts = [
			recipe.title,
			recipe.description,
			recipe.continent,
			recipe.country,
			recipe.difficulty,
			recipe.createdBy,
			...(recipe.ingredients ?? []),
			...(recipe.instructions ?? [])
		];

		return textParts
			.filter(Boolean)
			.map((part) => String(part).toLowerCase())
			.join(' ');
	}

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

	function openRecipeDetails(event, recipeId) {
		const target = event.target;
		if (
			target instanceof Element &&
			target.closest('.star-cell, .favorite-icon-button, button, a, form, input, select, textarea, label')
		) {
			return;
		}

		goto(`/all-recipes/${recipeId}`);
	}

	function requestDeleteConfirmation(event) {
		if (allowDeleteSubmit) {
			allowDeleteSubmit = false;
			return;
		}

		event.preventDefault();
		pendingDeleteForm = event.currentTarget;
		showDeleteConfirm = true;
	}

	function cancelDeleteConfirmation() {
		showDeleteConfirm = false;
		pendingDeleteForm = null;
	}

	function confirmDelete() {
		if (!pendingDeleteForm) return;

		const form = pendingDeleteForm;
		showDeleteConfirm = false;
		pendingDeleteForm = null;
		allowDeleteSubmit = true;
		form.requestSubmit();
	}

	const filteredRecipes = $derived.by(() => {
		const normalizedQuery = appliedSearchQuery.trim().toLowerCase();
		const queryTokens = normalizedQuery ? normalizedQuery.split(/\s+/).filter(Boolean) : [];
		const minTime = appliedCookingTimeMin === '' ? null : Number(appliedCookingTimeMin);
		const maxTime = appliedCookingTimeMax === '' ? null : Number(appliedCookingTimeMax);

		return (recipes ?? []).filter((recipe) => {
			if (appliedSelectedContinent !== 'all' && recipe.continent !== appliedSelectedContinent) {
				return false;
			}

			if (appliedSelectedDifficulty !== 'all' && recipe.difficulty !== appliedSelectedDifficulty) {
				return false;
			}

			const recipeCookingTime = Number(recipe.cookingTime);
			if (Number.isFinite(minTime) && Number.isFinite(recipeCookingTime) && recipeCookingTime < minTime) {
				return false;
			}

			if (Number.isFinite(maxTime) && Number.isFinite(recipeCookingTime) && recipeCookingTime > maxTime) {
				return false;
			}

			if (queryTokens.length > 0) {
				const searchableText = toSearchableText(recipe);
				if (!queryTokens.every((token) => searchableText.includes(token))) {
					return false;
				}
			}

			return true;
		});
	});

	const sortedRecipes = $derived.by(() => {
		const direction = sortDirection === 'asc' ? 1 : -1;
		const list = [...filteredRecipes];

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

	const totalPages = $derived.by(() => Math.max(1, Math.ceil(sortedRecipes.length / itemsPerPage)));
	const paginatedRecipes = $derived.by(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return sortedRecipes.slice(start, start + itemsPerPage);
	});
	const pageStart = $derived.by(() => (sortedRecipes.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1));
	const pageEnd = $derived.by(() =>
		sortedRecipes.length === 0 ? 0 : Math.min(currentPage * itemsPerPage, sortedRecipes.length)
	);
	const pageNumbers = $derived.by(() => Array.from({ length: totalPages }, (_, index) => index + 1));

	$effect(() => {
		if (!PAGE_SIZE_OPTIONS.includes(itemsPerPage)) {
			itemsPerPage = 10;
		}

		if (currentPage > totalPages) {
			currentPage = totalPages;
		}

		if (currentPage < 1) {
			currentPage = 1;
		}
	});
</script>

<div class="card border-0 bg-body-tertiary mb-4">
	<div class="card-body pb-2">
		<div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
			<h2 class="h5 mb-0 text-body-emphasis">Search & Filters</h2>
			<button class="btn btn-sm btn-outline-secondary" type="button" onclick={resetFilters}>Reset</button>
		</div>

		<form class="row g-3" onsubmit={applyFilters}>
			<div class="col-12 col-lg-4">
				<label class="form-label fw-semibold mb-1" for="recipe-search">Search</label>
				<input
					id="recipe-search"
					class="form-control"
					type="search"
					placeholder="Title, description, ingredients..."
					bind:value={draftSearchQuery}
				/>
			</div>

			<div class="col-6 col-md-4 col-lg-2">
				<label class="form-label fw-semibold mb-1" for="filter-continent">Continent</label>
				<select id="filter-continent" class="form-select" bind:value={draftSelectedContinent}>
					<option value="all">All</option>
					{#each continentOptions as continent}
						<option value={continent}>{continent}</option>
					{/each}
				</select>
			</div>

			<div class="col-6 col-md-4 col-lg-2">
				<label class="form-label fw-semibold mb-1" for="filter-difficulty">Difficulty</label>
				<select id="filter-difficulty" class="form-select" bind:value={draftSelectedDifficulty}>
					<option value="all">All</option>
					{#each difficultyOptions as difficulty}
						<option value={difficulty} class="text-capitalize">{difficulty}</option>
					{/each}
				</select>
			</div>

			<div class="col-6 col-md-6 col-lg-2">
				<label class="form-label fw-semibold mb-1" for="filter-time-min">Min</label>
				<input
					id="filter-time-min"
					class="form-control"
					type="number"
					min="0"
					step="1"
					placeholder="0"
					bind:value={draftCookingTimeMin}
				/>
			</div>

			<div class="col-6 col-md-6 col-lg-2">
				<label class="form-label fw-semibold mb-1" for="filter-time-max">Max</label>
				<input
					id="filter-time-max"
					class="form-control"
					type="number"
					min="0"
					step="1"
					placeholder="120"
					bind:value={draftCookingTimeMax}
				/>
			</div>

			<div class="col-6 col-md-6 col-lg-2 d-flex align-items-end">
				<button class="btn btn-primary w-100" type="submit">Apply Filters</button>
			</div>
		</form>

		<div class="d-flex flex-wrap align-items-end justify-content-between gap-3 mt-3 mb-1">
			<p class="small text-secondary mb-0">
				Showing {pageStart}-{pageEnd} of {sortedRecipes.length} filtered recipes (total {recipes.length})
			</p>
			<div class="d-flex align-items-center gap-2">
				<label class="form-label small text-secondary fw-semibold mb-0" for="items-per-page">Per page</label>
				<select
					id="items-per-page"
					class="form-select form-select-sm items-per-page-select"
					value={itemsPerPage}
					onchange={(event) => setItemsPerPage(event.currentTarget.value)}
				>
					{#each PAGE_SIZE_OPTIONS as pageSize}
						<option value={pageSize}>{pageSize}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
</div>

{#if sortedRecipes.length === 0}
	<p class="text-secondary mb-0">{emptyMessage} Try adjusting your filters.</p>
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
				{#each paginatedRecipes as recipe}
					<tr onclick={(event) => openRecipeDetails(event, recipe._id)}>
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
							<a class="recipe-title-link text-decoration-none fw-semibold" href={`/all-recipes/${recipe._id}`}>
								{recipe.title}
							</a>
						</td>
						<td class="row-link-cell">{recipe.continent}</td>
						<td class="text-capitalize row-link-cell">{recipe.difficulty}</td>
						<td class="row-link-cell">{recipe.cookingTime} min</td>
						{#if showDelete}
							<td class="row-link-cell">
								{#if recipe.isUserCreated && currentUserId && recipe.ownerId === currentUserId}
									<div class="d-flex flex-wrap gap-2">
										<a class="btn btn-sm btn-outline-secondary" href={`/all-recipes/${recipe._id}/edit`}>
											Edit
										</a>
										<form method="POST" action="?/delete" onsubmit={requestDeleteConfirmation}>
											<input type="hidden" name="id" value={recipe._id} />
											<button type="submit" class="btn btn-sm btn-outline-danger">Delete</button>
										</form>
									</div>
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

	<div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-3">
		<p class="small text-secondary mb-0">Page {currentPage} of {totalPages}</p>
		<div class="d-flex flex-wrap align-items-center gap-2">
			<button
				class="btn btn-sm btn-outline-secondary"
				type="button"
				onclick={goToPreviousPage}
				disabled={currentPage <= 1}
			>
				Previous
			</button>

			{#each pageNumbers as pageNumber}
				<button
					class={`btn btn-sm ${pageNumber === currentPage ? 'btn-primary' : 'btn-outline-secondary'}`}
					type="button"
					onclick={() => goToPage(pageNumber)}
					aria-label={`Go to page ${pageNumber}`}
					aria-current={pageNumber === currentPage ? 'page' : undefined}
				>
					{pageNumber}
				</button>
			{/each}

			<button
				class="btn btn-sm btn-outline-secondary"
				type="button"
				onclick={goToNextPage}
				disabled={currentPage >= totalPages}
			>
				Next
			</button>
		</div>
	</div>
{/if}

<ConfirmDeleteModal
	open={showDeleteConfirm}
	onCancel={cancelDeleteConfirmation}
	onConfirm={confirmDelete}
/>

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

	tbody tr td:not(.star-cell) {
		cursor: pointer;
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

	.recipe-title-link {
		color: var(--brand-primary);
	}

	.recipe-title-link:hover,
	.recipe-title-link:focus-visible {
		color: var(--brand-primary-hover);
		text-decoration: underline;
	}

	.items-per-page-select {
		width: auto;
		min-width: 88px;
	}
</style>
