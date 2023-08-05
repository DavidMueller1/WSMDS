<script lang="ts">
	import { auth0Client, auth0Token, loading, wsmdsUser } from '../../store';
	import Modal from '../../components/Modal.svelte';
	import auth from '../../authService';
	import { Auth0Client } from '@auth0/auth0-spa-js';


	let name = $wsmdsUser.name;
	let showModal = false;

	let inputErrorVisible = false;
	let serverErrorVisible = false;

	const changeName = () => {
		showModal = true;
	}

	const submitName = () => {
		// showModal = false;
		// loading.set(true);
		// auth.updateUserName($auth0Client, $auth0Token, name).then(() => {
		// 	loading.set(false);
		// })

		showModal = false;
		if (!name) {
			inputErrorVisible = true;
			return;
		}
		console.log('Submitting name:', name);
		loading.set(true);
		auth.updateUserName($auth0Client, $auth0Token, name).then(
			() => {
				loading.set(false);
			},
			() => {
				serverErrorVisible = true;
				loading.set(false);
			}
		)
	}

	const logout = () => {
		auth.logout($auth0Client);
	}

</script>

<svelte:head>
	<title>Profile</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class='profile-page center-flex'>
	<div>Hey <b>{$wsmdsUser.name}</b></div>
	<button on:click={changeName}>Namen ändern</button>
	<button class='button-logout' on:click={logout}>Logout</button>
</div>

<Modal bind:showModal>
	<form class='center-flex' on:submit|preventDefault={submitName}>
		<div>Wie heißt du fortan?</div>
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
		<button type='submit'>Name ändern</button>
	</form>
<!--	<div>Wie heißt du fortan?</div>-->
<!--	<input bind:value={name} placeholder='Dein Name'/>-->
<!--	<button on:click={submitName}>Name ändern</button>-->
</Modal>

<style>
</style>
