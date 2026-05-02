<script>
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	let isDarkMode = $state(false);

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

<nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
	<div class="container-fluid nav-container py-2">
		<a class="navbar-brand fw-semibold brand-offset" href="/">Globe Recipes</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#mainNavbar"
			aria-controls="mainNavbar"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="mainNavbar">
			<ul class="navbar-nav nav-links mx-auto">
				<li class="nav-item"><a class="nav-link" href="/">Home</a></li>
				<li class="nav-item dropdown">
					<a
						class="nav-link dropdown-toggle"
						href="/continents"
						role="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Continents
					</a>
					<ul class="dropdown-menu">
						<li><a class="dropdown-item" href="/continents/north-america">North America</a></li>
						<li><a class="dropdown-item" href="/continents/europe">Europe</a></li>
						<li><a class="dropdown-item" href="/continents/asia">Asia</a></li>
						<li><a class="dropdown-item" href="/continents/south-america">South America</a></li>
						<li><a class="dropdown-item" href="/continents/africa">Africa</a></li>
						<li><a class="dropdown-item" href="/continents/oceania">Oceania</a></li>
					</ul>
				</li>
				<li class="nav-item"><a class="nav-link" href="/create">Create</a></li>
				<li class="nav-item"><a class="nav-link" href="/all-recipes">All Recipes</a></li>
				<li class="nav-item"><a class="nav-link" href="/about">About</a></li>
			</ul>
			<div class="actions">
				<button class="btn btn-outline-secondary btn-sm" type="button" onclick={toggleTheme}>
					{isDarkMode ? 'Light mode' : 'Dark mode'}
				</button>
				<a class="btn btn-primary btn-sm" href="/login">Login</a>
			</div>
		</div>
	</div>
</nav>

<main class="container content-shell py-4">
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

	.nav-container {
		padding-left: 0.75rem;
		padding-right: 0.75rem;
	}

	.brand-offset {
		margin-left: 0.25rem;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.content-shell {
		padding-left: 1rem;
		padding-right: 1rem;
		max-width: 100%;
	}

	@media (min-width: 992px) {
		.nav-links {
			display: flex;
			flex-direction: row;
			gap: 0.35rem;
		}
	}

	@media (max-width: 991.98px) {
		.actions {
			margin-top: 0.75rem;
			justify-content: flex-start;
		}

		.nav-links {
			margin-top: 0.5rem;
		}
	}
</style>
