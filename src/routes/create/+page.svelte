<script>
	let { data, form } = $props();
</script>

<section class="container py-4">
	<h1 class="mb-3">Create Recipe</h1>
	<p class="text-secondary mb-4">Add a custom recipe that will appear in the All Recipes list.</p>

	{#if form?.message}
		<div class="alert alert-danger" role="alert">{form.message}</div>
	{/if}

	<form method="POST" class="row g-3">
		<div class="col-md-6">
			<label class="form-label" for="title">Title</label>
			<input
				class="form-control"
				type="text"
				id="title"
				name="title"
				value={form?.values?.title ?? ''}
				required
			/>
		</div>
		<div class="col-md-6">
			<label class="form-label" for="continent">Continent</label>
			<select class="form-select" id="continent" name="continent" required>
				<option value="" selected={!(form?.values?.continent ?? '')}>Select continent</option>
				{#each data.continents as continent}
					<option value={continent} selected={form?.values?.continent === continent}>{continent}</option>
				{/each}
			</select>
		</div>

		<div class="col-md-6">
			<label class="form-label" for="country">Country</label>
			<input
				class="form-control"
				type="text"
				id="country"
				name="country"
				value={form?.values?.country ?? ''}
				required
			/>
		</div>
		<div class="col-md-3">
			<label class="form-label" for="cookingTime">Cooking Time (min)</label>
			<input
				class="form-control"
				type="number"
				min="1"
				id="cookingTime"
				name="cookingTime"
				value={form?.values?.cookingTime ?? ''}
				required
			/>
		</div>
		<div class="col-md-3">
			<label class="form-label" for="servings">Servings</label>
			<input
				class="form-control"
				type="number"
				min="1"
				id="servings"
				name="servings"
				value={form?.values?.servings ?? ''}
				required
			/>
		</div>

		<div class="col-md-6">
			<label class="form-label" for="difficulty">Difficulty</label>
			<select class="form-select text-capitalize" id="difficulty" name="difficulty" required>
				<option value="" selected={!(form?.values?.difficulty ?? '')}>Select difficulty</option>
				<option value="easy" selected={form?.values?.difficulty === 'easy'}>easy</option>
				<option value="medium" selected={form?.values?.difficulty === 'medium'}>medium</option>
				<option value="hard" selected={form?.values?.difficulty === 'hard'}>hard</option>
			</select>
		</div>
		<div class="col-12">
			<label class="form-label" for="description">Description</label>
			<textarea
				class="form-control"
				id="description"
				name="description"
				rows="3"
				required
			>{form?.values?.description ?? ''}</textarea>
		</div>
		<div class="col-md-6">
			<label class="form-label" for="ingredients">Ingredients (one per line)</label>
			<textarea
				class="form-control"
				id="ingredients"
				name="ingredients"
				rows="7"
				required
			>{form?.values?.ingredients ?? ''}</textarea>
		</div>
		<div class="col-md-6">
			<label class="form-label" for="instructions">Instructions (one per line)</label>
			<textarea
				class="form-control"
				id="instructions"
				name="instructions"
				rows="7"
				required
			>{form?.values?.instructions ?? ''}</textarea>
		</div>

		<div class="col-12 d-flex gap-2">
			<button class="btn btn-primary" type="submit">Save Recipe</button>
			<a class="btn btn-outline-secondary" href="/all-recipes">Go to All Recipes</a>
		</div>
	</form>
</section>
