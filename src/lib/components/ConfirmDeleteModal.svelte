<script>
	let {
		open = false,
		title = 'Delete recipe?',
		message = 'Are you sure you want to delete this recipe? This action cannot be undone.',
		onConfirm = () => {},
		onCancel = () => {}
	} = $props();
</script>

{#if open}
	<div class="confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
		<div class="confirm-card shadow">
			<h2 id="confirm-title" class="h5 mb-2">{title}</h2>
			<p class="text-secondary mb-3">{message}</p>
			<div class="d-flex justify-content-end gap-2">
				<button type="button" class="btn btn-sm btn-outline-secondary" onclick={onCancel}>Cancel</button>
				<button type="button" class="btn btn-sm btn-danger" onclick={onConfirm}>Delete</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.confirm-overlay {
		position: fixed;
		inset: 0;
		background: rgba(15, 23, 42, 0.55);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		z-index: 1100;
	}

	.confirm-card {
		width: min(420px, 100%);
		background: rgba(255, 255, 255, 0.98);
		border-radius: 0.8rem;
		padding: 1rem;
		border: 1px solid rgba(148, 163, 184, 0.3);
	}

	:global(html[data-bs-theme='dark'] .confirm-card) {
		background: rgba(20, 24, 31, 0.96);
		border-color: rgba(148, 163, 184, 0.35);
	}
</style>
