<script>
	let {
		maxWidth = '980px',
		paddingClass = 'p-4 p-md-5',
		className = '',
		children
	} = $props();
</script>

<div class={`content-box ${paddingClass} shadow ${className}`} style={`--box-max-width: ${maxWidth};`}>
	{@render children?.()}
</div>

<style>
	.content-box {
		background-color: rgba(255, 255, 255, 0.93);
		border-radius: 1rem;
		max-width: var(--box-max-width);
		margin: 0 auto;
		color: #1f2937;
	}

	:global(html[data-bs-theme='dark'] .content-box) {
		background-color: rgba(20, 24, 31, 0.9);
		color: #f8f9fa;
	}
</style>
