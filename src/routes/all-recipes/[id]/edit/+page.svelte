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
	let editingIngredientIndex = $state(null);
	let editingInstructionIndex = $state(null);
	let editingIngredientValue = $state('');
	let editingInstructionValue = $state('');
	let draggedIngredientIndex = $state(null);
	let draggedInstructionIndex = $state(null);

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
		if (editingIngredientIndex === null) return;
		if (editingIngredientIndex === index) {
			cancelIngredientEdit();
			return;
		}
		if (editingIngredientIndex > index) {
			editingIngredientIndex -= 1;
		}
	}

	function removeInstruction(index) {
		instructionsList.splice(index, 1);
		if (editingInstructionIndex === null) return;
		if (editingInstructionIndex === index) {
			cancelInstructionEdit();
			return;
		}
		if (editingInstructionIndex > index) {
			editingInstructionIndex -= 1;
		}
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

	function beginIngredientEdit(index) {
		editingIngredientIndex = index;
		editingIngredientValue = ingredientsList[index] ?? '';
	}

	function cancelIngredientEdit() {
		editingIngredientIndex = null;
		editingIngredientValue = '';
	}

	function saveIngredientEdit() {
		if (editingIngredientIndex === null) return;
		const value = editingIngredientValue.trim();
		if (!value || value.length > ingredientMax) return;
		ingredientsList[editingIngredientIndex] = value;
		cancelIngredientEdit();
	}

	function onIngredientEditKeydown(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			saveIngredientEdit();
			return;
		}
		if (event.key === 'Escape') {
			event.preventDefault();
			cancelIngredientEdit();
		}
	}

	function beginInstructionEdit(index) {
		editingInstructionIndex = index;
		editingInstructionValue = instructionsList[index] ?? '';
	}

	function cancelInstructionEdit() {
		editingInstructionIndex = null;
		editingInstructionValue = '';
	}

	function saveInstructionEdit() {
		if (editingInstructionIndex === null) return;
		const value = editingInstructionValue.trim();
		if (!value || value.length > instructionMax) return;
		instructionsList[editingInstructionIndex] = value;
		cancelInstructionEdit();
	}

	function onInstructionEditKeydown(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			saveInstructionEdit();
			return;
		}
		if (event.key === 'Escape') {
			event.preventDefault();
			cancelInstructionEdit();
		}
	}

	function moveItem(list, fromIndex, toIndex) {
		if (
			fromIndex === null ||
			toIndex === null ||
			fromIndex < 0 ||
			toIndex < 0 ||
			fromIndex >= list.length ||
			toIndex >= list.length ||
			fromIndex === toIndex
		) {
			return;
		}

		const [movedItem] = list.splice(fromIndex, 1);
		list.splice(toIndex, 0, movedItem);
	}

	function onIngredientDragStart(index, event) {
		event.dataTransfer?.setData('text/plain', String(index));
		if (event.dataTransfer) {
			event.dataTransfer.effectAllowed = 'move';
		}
		draggedIngredientIndex = index;
	}

	function onIngredientDragOver(event) {
		event.preventDefault();
	}

	function onIngredientDrop(index) {
		moveItem(ingredientsList, draggedIngredientIndex, index);
		draggedIngredientIndex = null;
	}

	function onIngredientDragEnd() {
		draggedIngredientIndex = null;
	}

	function onInstructionDragStart(index, event) {
		event.dataTransfer?.setData('text/plain', String(index));
		if (event.dataTransfer) {
			event.dataTransfer.effectAllowed = 'move';
		}
		draggedInstructionIndex = index;
	}

	function onInstructionDragOver(event) {
		event.preventDefault();
	}

	function onInstructionDrop(index) {
		moveItem(instructionsList, draggedInstructionIndex, index);
		draggedInstructionIndex = null;
	}

	function onInstructionDragEnd() {
		draggedInstructionIndex = null;
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
								<li
									class="list-group-item d-flex justify-content-between align-items-start gap-2"
									ondragover={onIngredientDragOver}
									ondrop={() => onIngredientDrop(index)}
								>
									{#if editingIngredientIndex === index}
										<input
											class="form-control"
											type="text"
											bind:value={editingIngredientValue}
											maxlength={ingredientMax}
											onkeydown={onIngredientEditKeydown}
										/>
										<div class="d-flex gap-2">
											<button class="btn btn-sm btn-outline-primary" type="button" onclick={saveIngredientEdit}>
												Save
											</button>
											<button
												class="btn btn-sm btn-outline-secondary"
												type="button"
												onclick={cancelIngredientEdit}
											>
												Cancel
											</button>
											<button
												class="btn btn-sm btn-outline-danger"
												type="button"
												onclick={() => removeIngredient(index)}
											>
												Remove
											</button>
										</div>
									{:else}
										<div class="d-flex align-items-center gap-2 flex-grow-1">
											<span
												class="drag-handle"
												title="Drag to reorder"
												role="button"
												tabindex="0"
												aria-label="Drag ingredient to reorder"
												draggable="true"
												ondragstart={(event) => onIngredientDragStart(index, event)}
												ondragend={onIngredientDragEnd}
											>
												⋮⋮
											</span>
											<span>{ingredient}</span>
										</div>
										<div class="d-flex gap-2">
											<button
												class="btn btn-sm btn-outline-secondary"
												type="button"
												onclick={() => beginIngredientEdit(index)}
											>
												Edit
											</button>
											<button
												class="btn btn-sm btn-outline-danger"
												type="button"
												onclick={() => removeIngredient(index)}
											>
												Remove
											</button>
										</div>
									{/if}
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

					<ul class="list-group mt-2">
						{#if instructionsList.length === 0}
							<li class="list-group-item text-secondary">No instructions added yet.</li>
						{:else}
							{#each instructionsList as instruction, index}
								<li
									class="list-group-item d-flex justify-content-between align-items-start gap-2"
									ondragover={onInstructionDragOver}
									ondrop={() => onInstructionDrop(index)}
								>
									{#if editingInstructionIndex === index}
										<input
											class="form-control"
											type="text"
											bind:value={editingInstructionValue}
											maxlength={instructionMax}
											onkeydown={onInstructionEditKeydown}
										/>
										<div class="d-flex gap-2">
											<button class="btn btn-sm btn-outline-primary" type="button" onclick={saveInstructionEdit}>
												Save
											</button>
											<button
												class="btn btn-sm btn-outline-secondary"
												type="button"
												onclick={cancelInstructionEdit}
											>
												Cancel
											</button>
											<button
												class="btn btn-sm btn-outline-danger"
												type="button"
												onclick={() => removeInstruction(index)}
											>
												Remove
											</button>
										</div>
									{:else}
										<div class="d-flex align-items-start gap-2 flex-grow-1">
											<span
												class="drag-handle"
												title="Drag to reorder"
												role="button"
												tabindex="0"
												aria-label="Drag instruction to reorder"
												draggable="true"
												ondragstart={(event) => onInstructionDragStart(index, event)}
												ondragend={onInstructionDragEnd}
											>
												⋮⋮
											</span>
											<span class="instruction-index">{index + 1}.</span>
											<span>{instruction}</span>
										</div>
										<div class="d-flex gap-2">
											<button
												class="btn btn-sm btn-outline-secondary"
												type="button"
												onclick={() => beginInstructionEdit(index)}
											>
												Edit
											</button>
											<button
												class="btn btn-sm btn-outline-danger"
												type="button"
												onclick={() => removeInstruction(index)}
											>
												Remove
											</button>
										</div>
									{/if}
								</li>
							{/each}
						{/if}
					</ul>
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

<style>
	.drag-handle {
		cursor: move;
		user-select: none;
		color: var(--bs-secondary-color);
		font-weight: 700;
		letter-spacing: 0.04em;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.2rem;
		flex-shrink: 0;
	}

	.instruction-index {
		min-width: 1.4rem;
		font-weight: 600;
		flex-shrink: 0;
	}
</style>
