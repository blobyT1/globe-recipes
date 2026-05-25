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
			<h1 class="mb-3">Your Created Recipes</h1>
			<p class="text-secondary mb-3">Recipes you created with your account.</p>

			<RecipesViewNav current="user-created" />

			{#if !data.currentUserId}
				<p class="mb-0">
					<a class="link-primary text-decoration-none fw-semibold" href="/login?next=/all-recipes/user-created">
						Sign in
					</a>
					to view your user-created recipes.
				</p>
			{:else}
				<RecipesTable
					recipes={data.recipes}
					currentUserId={data.currentUserId}
					favoriteRecipeIds={data.favoriteRecipeIds}
					emptyMessage="You have not created any recipes yet."
				/>
			{/if}
		</ContentBox>
	</div>
</PageShell>
