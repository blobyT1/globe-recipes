<script>
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$lib/components/NavBar.svelte';
	import { continentLinks } from '$lib/data/continents.js';

	let { children } = $props();
	let isDarkMode = $state(false);
	const navLinks = [
		{ label: 'Home', href: '/' },
		{ label: 'Continents', href: '/continents' },
		{ label: 'Create', href: '/create' },
		{ label: 'All Recipes', href: '/all-recipes' },
		{ label: 'About', href: '/about' }
	];

	function applyTheme() {
		const theme = isDarkMode ? 'dark' : 'light';
		document.documentElement.setAttribute('data-bs-theme', theme);
	}

	function toggleTheme() {
		isDarkMode = !isDarkMode;
		applyTheme();
	}

	onMount(() => {
		applyTheme();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<NavBar links={navLinks} continents={continentLinks} {isDarkMode} onToggleTheme={toggleTheme} />

<main class="content-shell">
	{@render children()}
</main>

<style>
	:global(html),
	:global(body) {
		font-size: 17px;
		font-family:
			'Inter',
			'Segoe UI',
			'Helvetica Neue',
			Arial,
			sans-serif;
		color: var(--bs-body-color);
		background-color: var(--bs-body-bg);
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:global(h1),
	:global(h2),
	:global(h3),
	:global(h4),
	:global(h5),
	:global(h6) {
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	:global(h1) {
		font-size: clamp(2rem, 1.5rem + 1.2vw, 2.5rem);
	}

	:global(h2) {
		font-size: clamp(1.7rem, 1.35rem + 0.9vw, 2.1rem);
	}

	.content-shell {
		min-height: calc(100vh - 72px);
	}
</style>
