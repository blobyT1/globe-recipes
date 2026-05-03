<script>
	let { data, form } = $props();
</script>

<section class="container py-5">
	<div class="row justify-content-center">
		<div class="col-md-6 col-lg-5">
			<div class="card shadow-sm">
				<div class="card-body p-4">
					<h1 class="h3 mb-3">Login</h1>
					<p class="text-secondary mb-4">Login to create and manage your recipes.</p>

					{#if form?.message}
						<div class="alert alert-danger py-2" role="alert">{form.message}</div>
					{/if}

					<form method="POST" class="d-grid gap-3">
						<input type="hidden" name="next" value={form?.values?.next ?? data.next} />
						<div>
							<label class="form-label" for="username">Username</label>
							<input
								class="form-control"
								id="username"
								name="username"
								value={form?.values?.username ?? ''}
								required
							/>
						</div>
						<div>
							<label class="form-label" for="password">Password</label>
							<input class="form-control" id="password" name="password" type="password" required />
						</div>
						<button class="btn btn-primary" type="submit">Login</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>
