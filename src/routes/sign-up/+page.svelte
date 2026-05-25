<script>
	import ContentBox from '$lib/components/ContentBox.svelte';
	import PageShell from '$lib/components/PageShell.svelte';

	let { data, form } = $props();
</script>

<PageShell
	backgroundImage="/images_background_pages/about_kitchen.png"
	overlayLight="rgba(255, 255, 255, 0.56)"
	overlayDark="rgba(10, 12, 16, 0.66)"
	sectionClass="py-4 py-lg-5"
>
	<div class="container d-flex justify-content-center">
		<ContentBox maxWidth="560px" className="w-100">
			<h1 class="mb-3">Sign Up</h1>
			<p class="text-secondary mb-4">Create an account to add and manage your own recipes.</p>

			{#if form?.message}
				<div class="alert alert-danger" role="alert">{form.message}</div>
			{/if}

			<form method="POST" class="row g-3">
				<input type="hidden" name="next" value={form?.values?.next ?? data.next} />

				<div class="col-12">
					<label class="form-label" for="username">Username</label>
					<input
						class="form-control"
						type="text"
						id="username"
						name="username"
						value={form?.values?.username ?? ''}
						autocomplete="username"
						required
					/>
					<div class="form-text">3-24 chars, letters/numbers/underscore.</div>
				</div>

				<div class="col-12">
					<label class="form-label" for="password">Password</label>
					<input
						class="form-control"
						type="password"
						id="password"
						name="password"
						minlength="8"
						maxlength="24"
						autocomplete="new-password"
						required
					/>
				</div>

				<div class="col-12">
					<label class="form-label" for="confirmPassword">Confirm Password</label>
					<input
						class="form-control"
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						minlength="8"
						maxlength="24"
						autocomplete="new-password"
						required
					/>
				</div>

				<div class="col-12 d-flex flex-column flex-sm-row justify-content-sm-end gap-2 pt-2">
					<a class="btn btn-outline-secondary" href="/login">Already have an account?</a>
					<button class="btn btn-primary" type="submit">Create Account</button>
				</div>
			</form>
		</ContentBox>
	</div>
</PageShell>
