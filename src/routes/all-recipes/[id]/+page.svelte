<script>
	import ContentBox from '$lib/components/ContentBox.svelte';
	import ConfirmDeleteModal from '$lib/components/ConfirmDeleteModal.svelte';
	import PageShell from '$lib/components/PageShell.svelte';

	let { data } = $props();
	let showDeleteConfirm = $state(false);
	let allowDeleteSubmit = $state(false);
	let pendingDeleteForm = $state(null);

	const creatorName = $derived(
		data.recipe.isUserCreated ? (data.recipe.ownerUsername ?? 'Unknown User') : 'Globe Recipes'
	);

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
				<a class="back-link text-decoration-none" href="/all-recipes">Back to all recipes</a>
			</div>

			<h1 class="mb-2">{data.recipe.title}</h1>
			<p class="text-secondary mb-4">{data.recipe.description}</p>

			<div class="row g-3 mb-4 detail-top-grid">
				<div class="col-lg-4 col-md-6">
					<div class="p-3 rounded border bg-body-tertiary h-100">
						<div><strong>Continent:</strong> {data.recipe.continent}</div>
						<div><strong>Country:</strong> {data.recipe.country}</div>
						<div class="text-capitalize"><strong>Difficulty:</strong> {data.recipe.difficulty}</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-6">
					<div class="p-3 rounded border bg-body-tertiary h-100">
						<div><strong>Cooking Time:</strong> {data.recipe.cookingTime} min</div>
						<div><strong>Servings:</strong> {data.recipe.servings}</div>
						<div><strong>User Created:</strong> {data.recipe.isUserCreated ? 'Yes' : 'No'}</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-12">
					<div class="p-3 rounded border bg-body-tertiary h-100 d-flex flex-column justify-content-between">
						<div class="mb-3">
							<strong>Created by:</strong>
							{creatorName}
						</div>

						<div class="recipe-actions">
							<form method="POST" action="?/toggleFavorite">
								<div class="d-flex flex-wrap gap-2">
									<button
										type="submit"
										class={`btn btn-sm favorite-button ${data.isFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
										aria-pressed={data.isFavorite}
										aria-label={data.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
									>
										{data.isFavorite ? '★ Favorite' : '☆ Favorite'}
									</button>

									{#if data.currentUserId && data.recipe.isUserCreated && data.recipe.ownerId === data.currentUserId}
										<a class="btn btn-sm btn-outline-secondary" href={`/all-recipes/${data.recipe._id}/edit`}>
											Edit Recipe
										</a>
									{/if}
								</div>
							</form>

							{#if data.currentUserId && data.recipe.isUserCreated && data.recipe.ownerId === data.currentUserId}
								<form
									method="POST"
									action="?/delete"
									class="mt-2"
									onsubmit={requestDeleteConfirmation}
								>
									<button type="submit" class="btn btn-sm btn-outline-danger w-100">Delete Recipe</button>
								</form>
							{/if}
						</div>

						{#if !data.currentUserId}
							<small class="text-secondary mt-2 d-block">Sign in to save favorites.</small>
						{/if}
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

<ConfirmDeleteModal
	open={showDeleteConfirm}
	onCancel={cancelDeleteConfirmation}
	onConfirm={confirmDelete}
/>

<style>
	:global(html[data-bs-theme='dark'] .list-group-item) {
		background-color: rgba(20, 24, 31, 0.9);
		color: #f8f9fa;
		border-color: rgba(203, 213, 225, 0.2);
	}

	.favorite-button {
		min-width: 130px;
	}

	.recipe-actions {
		display: inline-flex;
		flex-direction: column;
		align-items: stretch;
		max-width: 100%;
	}

	.back-link {
		color: var(--brand-primary);
		font-weight: 500;
	}

	.back-link:hover,
	.back-link:focus-visible {
		color: var(--brand-primary-hover);
		text-decoration: underline;
	}
</style>
