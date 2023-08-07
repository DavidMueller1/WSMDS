<script lang="ts">
	export let label: string;
	export let placeholder: string = '';
	export let maxLength: number = 0;

	export let inputErrorText: string = 'Bitte gib etwas ein.'
	export let inputErrorVisible = false;

	export let otherErrorText: string = 'Da hat was verschissen';
	export let otherErrorVisible = false;

	export let submitInput: ((input: string) => void) | undefined;
	export let value = '';
	export let submitInputText = 'OK';

	const submitInputInner = () => {
		if (value.length === 0) {
			inputErrorVisible = true;
			return;
		}
		inputErrorVisible = false;
		otherErrorVisible = false;

		if (submitInput === undefined) {
			return;
		}
		submitInput(value);
	};

</script>

<form class='center-flex' on:submit|preventDefault={submitInputInner}>
	<div>{label}</div>
	<input
		maxlength='{maxLength > 0 ? maxLength : null}'
		bind:value={value}
		placeholder={placeholder}
		on:input={() => inputErrorVisible = false}
	/>
	{#if inputErrorVisible}
		<div class='error-text'>{inputErrorText}</div>
	{:else if otherErrorVisible}
		<div class='error-text'>{otherErrorText}</div>
	{/if}
	<button type='submit'>{submitInputText}</button>
</form>