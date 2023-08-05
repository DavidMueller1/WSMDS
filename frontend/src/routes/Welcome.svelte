<script lang="ts">
	import { auth0Client, auth0Token, loading, user } from '../store';
	import auth from '../authService';


	let name = $user?.name;

	let inputErrorVisible = false;
	let serverErrorVisible = false;

	const submitName = () => {
		if (!name) {
			inputErrorVisible = true;
			return;
		}
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
	<form class='center-flex' on:submit|preventDefault={submitName}>
		<div>Moinsen! Wie soll ich dich nennen?</div>
		<input
			maxlength='12'
			bind:value={name}
			placeholder='Dein Name'
			on:input={() => inputErrorVisible = false}
		/>
		{#if inputErrorVisible}
			<div class='error-text'>Bitte gib einen Namen ein</div>
		{:else if serverErrorVisible}
			<div class='error-text'>Der Server hat veschissen.</div>
		{/if}
		<button type='submit'>Weiter</button>
	</form>
</div>