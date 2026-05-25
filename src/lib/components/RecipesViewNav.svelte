<script>
	let { current = 'all' } = $props();

	const views = [
		{ key: 'all', label: 'All Recipes', href: '/all-recipes' },
		{ key: 'user-created', label: 'User Created', href: '/all-recipes/user-created' },
		{ key: 'favorites', label: 'Favorites', href: '/all-recipes/favorites' }
	];
</script>

<ul class="nav nav-pills mb-4 flex-wrap gap-2">
	{#each views as view}
		<li class="nav-item">
			<a
				class={`nav-link${current === view.key ? ' active' : ''}`}
				aria-current={current === view.key ? 'page' : undefined}
				href={view.href}
			>
				{view.label}
			</a>
		</li>
	{/each}
</ul>
