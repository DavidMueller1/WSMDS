<script lang="ts">
	import { auth0Client, auth0Token, loading, user } from '../store';
	import auth from '../authService';
	import InputField from '../components/InputField.svelte';


	// let name = $user?.name;

	let serverErrorVisible = false;

	const submitName = (name: string) => {
		console.log('Submitting name:', name);
		loading.set(true);
		auth.createProfile($auth0Client, $auth0Token, name).then(
			() => {
				loading.set(false);
			},
			() => {
				serverErrorVisible = true;
				loading.set(false);
			}
		)
	}
</script>

<div class='welcome-form center-flex'>
<!--	<form class='center-flex' on:submit|preventDefault={submitName}>-->
		<InputField
			label='Moinsen! Wie soll ich dich nennen?'
			placeholder='Dein Name'
			maxLength={12}
			inputErrorText='Bitte gib einen Code ein'
			otherErrorText='Der Server hat veschissen'
			otherErrorVisible={serverErrorVisible}
			submitInput={submitName}
			submitInputText='Weiter'
		/>

<!--		<div>Moinsen! Wie soll ich dich nennen?</div>-->
<!--		<input-->
<!--			maxlength='12'-->
<!--			bind:value={name}-->
<!--			placeholder='Dein Name'-->
<!--			on:input={() => inputErrorVisible = false}-->
<!--		/>-->
<!--		{#if inputErrorVisible}-->
<!--			<div class='error-text'>Bitte gib einen Namen ein</div>-->
<!--		{:else if serverErrorVisible}-->
<!--			<div class='error-text'>Der Server hat veschissen.</div>-->
<!--		{/if}-->
<!--		<button type='submit'>Weiter</button>-->
<!--	</form>-->
</div>