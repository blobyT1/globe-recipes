<script>
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$lib/components/NavBar.svelte';
	import { continentLinks } from '$lib/data/continents.js';

	let { children, data } = $props();
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
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<NavBar
	links={navLinks}
	continents={continentLinks}
	{isDarkMode}
	onToggleTheme={toggleTheme}
	user={data.user}
/>

<main class="content-shell">
	{@render children()}
</main>

<style>
	:global(:root) {
		--brand-primary: #c96a3d;
		--brand-primary-hover: #b85c31;
		--brand-primary-active: #a64f28;
		--brand-secondary: #6f8b74;
		--brand-secondary-hover: #607a65;
		--brand-neutral: #475569;
	}

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
		font-family:
			'Lora',
			'Georgia',
			'Times New Roman',
			serif;
		font-weight: 700;
		letter-spacing: -0.01em;
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

	:global(.btn) {
		--bs-btn-font-weight: 600;
		border-radius: 0.6rem;
	}

	:global(.btn-primary) {
		--bs-btn-color: #fff;
		--bs-btn-bg: var(--brand-primary);
		--bs-btn-border-color: var(--brand-primary);
		--bs-btn-hover-color: #fff;
		--bs-btn-hover-bg: var(--brand-primary-hover);
		--bs-btn-hover-border-color: var(--brand-primary-hover);
		--bs-btn-active-color: #fff;
		--bs-btn-active-bg: var(--brand-primary-active);
		--bs-btn-active-border-color: var(--brand-primary-active);
		--bs-btn-disabled-color: #fff;
		--bs-btn-disabled-bg: var(--brand-primary);
		--bs-btn-disabled-border-color: var(--brand-primary);
	}

	:global(.btn-secondary) {
		--bs-btn-color: #fff;
		--bs-btn-bg: var(--brand-secondary);
		--bs-btn-border-color: var(--brand-secondary);
		--bs-btn-hover-color: #fff;
		--bs-btn-hover-bg: var(--brand-secondary-hover);
		--bs-btn-hover-border-color: var(--brand-secondary-hover);
		--bs-btn-active-color: #fff;
		--bs-btn-active-bg: #546c59;
		--bs-btn-active-border-color: #546c59;
	}

	:global(.btn-outline-primary) {
		--bs-btn-color: var(--brand-primary);
		--bs-btn-border-color: var(--brand-primary);
		--bs-btn-hover-color: #fff;
		--bs-btn-hover-bg: var(--brand-primary);
		--bs-btn-hover-border-color: var(--brand-primary);
		--bs-btn-active-color: #fff;
		--bs-btn-active-bg: var(--brand-primary-hover);
		--bs-btn-active-border-color: var(--brand-primary-hover);
	}

	:global(.btn-outline-secondary) {
		--bs-btn-color: var(--brand-neutral);
		--bs-btn-border-color: #94a3b8;
		--bs-btn-hover-color: #fff;
		--bs-btn-hover-bg: var(--brand-neutral);
		--bs-btn-hover-border-color: var(--brand-neutral);
		--bs-btn-active-color: #fff;
		--bs-btn-active-bg: #334155;
		--bs-btn-active-border-color: #334155;
	}

	:global(html[data-bs-theme='dark'] .btn-outline-secondary) {
		--bs-btn-color: #e2e8f0;
		--bs-btn-border-color: #94a3b8;
		--bs-btn-hover-color: #0f172a;
		--bs-btn-hover-bg: #e2e8f0;
		--bs-btn-hover-border-color: #e2e8f0;
		--bs-btn-active-color: #0f172a;
		--bs-btn-active-bg: #cbd5e1;
		--bs-btn-active-border-color: #cbd5e1;
	}
</style>
