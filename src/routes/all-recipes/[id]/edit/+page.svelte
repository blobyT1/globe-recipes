<script>
	import ContentBox from '$lib/components/ContentBox.svelte';
	import PageShell from '$lib/components/PageShell.svelte';

	let { data, form } = $props();
	const ingredientMax = 140;
	const instructionMax = 280;

	let ingredientInput = $state('');
	let instructionInput = $state('');
	let ingredientsList = $state([]);
	let instructionsList = $state([]);

	const values = $derived(form?.values ?? data.initialValues);

	$effect(() => {
		ingredientsList = Array.isArray(values?.ingredients) ? [...values.ingredients] : [];
		instructionsList = Array.isArray(values?.instructions) ? [...values.instructions] : [];
	});

	const ingredientsJson = $derived(JSON.stringify(ingredientsList));
	const instructionsJson = $derived(JSON.stringify(instructionsList));

	function addIngredient() {
		const value = ingredientInput.trim();
		if (!value) return;
		if (value.length > ingredientMax) return;
		ingredientsList.push(value);
		ingredientInput = '';
	}

	function addInstruction() {
		const value = instructionInput.trim();
		if (!value) return;
		if (value.length > instructionMax) return;
		instructionsList.push(value);
		instructionInput = '';
	}

	function removeIngredient(index) {
		ingredientsList.splice(index, 1);
	}

	function removeInstruction(index) {
		instructionsList.splice(index, 1);
	}

	function onIngredientKeydown(event) {
		if (event.key !== 'Enter') return;
		event.preventDefault();
		addIngredient();
	}

	function onInstructionKeydown(event) {
		if (event.key !== 'Enter') return;
		event.preventDefault();
		addInstruction();
	}
</script>

<PageShell
	backgroundImage="/images_background_pages/create_background.png"
	overlayLight="rgba(255, 255, 255, 0.5)"
	overlayDark="rgba(10, 12, 16, 0.64)"
	sectionClass="py-4 py-lg-5"
>
	<div class="container d-flex justify-content-center">
		<ContentBox maxWidth="1000px" className="w-100">
			<h1 class="mb-3">Edit Recipe</h1>
			<p class="text-secondary mb-4">Update your recipe details and save the changes.</p>

			{#if form?.message}
				<div class="alert alert-danger" role="alert">{form.message}</div>
			{/if}

			<form method="POST" class="row g-3">
				<input type="hidden" name="ingredientsJson" value={ingredientsJson} />
				<input type="hidden" name="instructionsJson" value={instructionsJson} />

				<div class="col-md-6">
					<label class="form-label" for="title">Title</label>
					<input
						class="form-control"
						type="text"
						id="title"
						name="title"
						value={values?.title ?? ''}
						maxlength="80"
						required
					/>
					<div class="form-text">Max 80 characters.</div>
				</div>
				<div class="col-md-6">
					<label class="form-label" for="continent">Continent</label>
					<select class="form-select" id="continent" name="continent" required>
						<option value="" selected={!(values?.continent ?? '')}>Select continent</option>
						{#each data.continents as continent}
							<option value={continent} selected={values?.continent === continent}>{continent}</option>
						{/each}
					</select>
				</div>

				<div class="col-md-6">
					<label class="form-label" for="country">Country</label>
					<select class="form-select" id="country" name="country" required>
						<option value="" selected={!(values?.country ?? '')}>Select country</option>
						{#each data.countries as country}
							<option value={country} selected={values?.country === country}>{country}</option>
						{/each}
					</select>
				</div>
				<div class="col-md-3">
					<label class="form-label" for="cookingTime">Cooking Time (min)</label>
					<input
						class="form-control"
						type="number"
						min="1"
						max="1440"
						id="cookingTime"
						name="cookingTime"
						value={values?.cookingTime ?? ''}
						required
					/>
					<div class="form-text">1-1440 minutes.</div>
				</div>
				<div class="col-md-3">
					<label class="form-label" for="servings">Servings</label>
					<input
						class="form-control"
						type="number"
						min="1"
						max="50"
						id="servings"
						name="servings"
						value={values?.servings ?? ''}
						required
					/>
					<div class="form-text">1-50 servings.</div>
				</div>

				<div class="col-md-6">
					<label class="form-label" for="difficulty">Difficulty</label>
					<select class="form-select text-capitalize" id="difficulty" name="difficulty" required>
						<option value="" selected={!(values?.difficulty ?? '')}>Select difficulty</option>
						<option value="easy" selected={values?.difficulty === 'easy'}>easy</option>
						<option value="medium" selected={values?.difficulty === 'medium'}>medium</option>
						<option value="hard" selected={values?.difficulty === 'hard'}>hard</option>
					</select>
				</div>
				<div class="col-12">
					<label class="form-label" for="description">Description</label>
					<textarea
						class="form-control"
						id="description"
						name="description"
						rows="3"
						maxlength="500"
						required
					>{values?.description ?? ''}</textarea>
					<div class="form-text">Max 500 characters.</div>
				</div>

				<div class="col-md-6">
					<label class="form-label" for="ingredientInput">Ingredients</label>
					<div class="input-group">
						<input
							class="form-control"
							type="text"
							id="ingredientInput"
							bind:value={ingredientInput}
							maxlength={ingredientMax}
							onkeydown={onIngredientKeydown}
							placeholder="Type one ingredient and confirm"
						/>
						<button class="btn btn-outline-primary" type="button" onclick={addIngredient}>Add</button>
					</div>
					<div class="form-text">Confirm each ingredient before adding the next one.</div>

					<ul class="list-group mt-2">
						{#if ingredientsList.length === 0}
							<li class="list-group-item text-secondary">No ingredients added yet.</li>
						{:else}
							{#each ingredientsList as ingredient, index}
								<li class="list-group-item d-flex justify-content-between align-items-start gap-2">
									<span>{ingredient}</span>
									<button
										class="btn btn-sm btn-outline-danger"
										type="button"
										onclick={() => removeIngredient(index)}
									>
										Remove
									</button>
								</li>
							{/each}
						{/if}
					</ul>
				</div>

				<div class="col-md-6">
					<label class="form-label" for="instructionInput">Instructions</label>
					<div class="input-group">
						<input
							class="form-control"
							type="text"
							id="instructionInput"
							bind:value={instructionInput}
							maxlength={instructionMax}
							onkeydown={onInstructionKeydown}
							placeholder="Type one instruction and confirm"
						/>
						<button class="btn btn-outline-primary" type="button" onclick={addInstruction}>Add</button>
					</div>
					<div class="form-text">Confirm each instruction before adding the next one.</div>

					<ol class="list-group list-group-numbered mt-2">
						{#if instructionsList.length === 0}
							<li class="list-group-item text-secondary">No instructions added yet.</li>
						{:else}
							{#each instructionsList as instruction, index}
								<li class="list-group-item d-flex justify-content-between align-items-start gap-2">
									<span>{instruction}</span>
									<button
										class="btn btn-sm btn-outline-danger"
										type="button"
										onclick={() => removeInstruction(index)}
									>
										Remove
									</button>
								</li>
							{/each}
						{/if}
					</ol>
				</div>

				<div class="col-12 d-flex flex-column flex-sm-row justify-content-sm-end gap-2 pt-2">
					<a class="btn btn-outline-secondary" href={`/all-recipes/${data.recipeId}`}>Cancel</a>
					<button
						class="btn btn-primary"
						type="submit"
						disabled={ingredientsList.length === 0 || instructionsList.length === 0}
					>
						Update Recipe
					</button>
				</div>
			</form>
		</ContentBox>
	</div>
</PageShell>
