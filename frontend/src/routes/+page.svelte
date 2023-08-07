<script lang="ts">
	import InputField from '../components/InputField.svelte';

	let serverErrorVisible = false;

	const submitCode = (code: string) => {
		console.log('Submitting code:', code);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class='connect-form center-flex'>
	<InputField
		label='Hier kommt ein Code rein'
		placeholder='Code'
		maxLength={10}
		inputErrorText='Bitte gib einen Code ein'
		otherErrorText='Der Server hat veschissen'
		otherErrorVisible={serverErrorVisible}
		submitInput={submitCode}
		submitInputText='Connect'
	/>
</div>
