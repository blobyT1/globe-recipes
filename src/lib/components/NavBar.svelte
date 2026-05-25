<script>
	let {
		brand = 'Globe Recipes',
		links = [],
		continents = [],
		isDarkMode = false,
		onToggleTheme = null,
		user = null
	} = $props();
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
	<div class="container-fluid nav-container py-2">
		<a class="navbar-brand fw-semibold brand-offset" href="/">{brand}</a>
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
				{#each links as link}
					{#if link.label === 'Continents'}
						<li class="nav-item dropdown">
							<a
								class="nav-link dropdown-toggle"
								href={link.href}
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								{link.label}
							</a>
							<ul class="dropdown-menu">
								{#each continents as continent}
									<li><a class="dropdown-item" href={continent.href}>{continent.label}</a></li>
								{/each}
							</ul>
						</li>
					{:else}
						<li class="nav-item"><a class="nav-link" href={link.href}>{link.label}</a></li>
					{/if}
				{/each}
			</ul>
			<div class="actions">
				<button class="btn btn-outline-secondary btn-sm" type="button" onclick={onToggleTheme}>
					{isDarkMode ? 'Light mode' : 'Dark mode'}
				</button>
				{#if user}
					<span class="badge text-bg-light border">{user.username}</span>
					<form method="POST" action="/logout">
						<button class="btn btn-primary btn-sm" type="submit">Logout</button>
					</form>
				{:else}
					<a class="btn btn-outline-primary btn-sm" href="/sign-up">Sign up</a>
					<a class="btn btn-primary btn-sm" href="/login">Login</a>
				{/if}
			</div>
		</div>
	</div>
</nav>

<style>
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

	.actions form {
		margin: 0;
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
