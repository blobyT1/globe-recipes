<script>
	let {
		backgroundImage,
		overlayLight = 'rgba(255, 255, 255, 0.38)',
		overlayDark = 'rgba(10, 12, 16, 0.52)',
		minHeight = 'calc(100vh - 110px)',
		sectionClass = '',
		children
	} = $props();
</script>

<section
	class={`page-shell ${sectionClass}`}
	style={`--page-shell-bg: url('${backgroundImage}'); --page-shell-overlay-light: ${overlayLight}; --page-shell-overlay-dark: ${overlayDark}; --page-shell-min-height: ${minHeight};`}
>
	{@render children?.()}
</section>

<style>
	.page-shell {
		background-image:
			linear-gradient(var(--page-shell-overlay-light), var(--page-shell-overlay-light)),
			var(--page-shell-bg);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		min-height: var(--page-shell-min-height);
	}

	:global(html[data-bs-theme='dark'] .page-shell) {
		background-image:
			linear-gradient(var(--page-shell-overlay-dark), var(--page-shell-overlay-dark)),
			var(--page-shell-bg);
	}
</style>
