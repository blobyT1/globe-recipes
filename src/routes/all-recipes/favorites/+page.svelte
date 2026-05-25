<script>
	import ContentBox from '$lib/components/ContentBox.svelte';
	import PageShell from '$lib/components/PageShell.svelte';
	import RecipesTable from '$lib/components/RecipesTable.svelte';
	import RecipesViewNav from '$lib/components/RecipesViewNav.svelte';

	let { data } = $props();
</script>

<PageShell
	backgroundImage="/images_background_pages/allRecipes_background.png"
	overlayLight="rgba(255, 255, 255, 0.48)"
	overlayDark="rgba(10, 12, 16, 0.62)"
	sectionClass="py-4 py-lg-5"
>
	<div class="container d-flex justify-content-center">
		<ContentBox maxWidth="1080px" className="w-100">
			<h1 class="mb-3">Favorite Recipes</h1>
			<p class="text-secondary mb-3">Recipes you marked with the star icon.</p>

			<RecipesViewNav current="favorites" />

			{#if !data.currentUserId}
				<p class="mb-0">
					<a class="link-primary text-decoration-none fw-semibold" href="/login?next=/all-recipes/favorites">
						Sign in
					</a>
					to view your favorites.
				</p>
			{:else}
				<RecipesTable
					recipes={data.recipes}
					currentUserId={data.currentUserId}
					favoriteRecipeIds={data.favoriteRecipeIds}
					showDelete={false}
					emptyMessage="You do not have favorite recipes yet."
				/>
			{/if}
		</ContentBox>
	</div>
</PageShell>
