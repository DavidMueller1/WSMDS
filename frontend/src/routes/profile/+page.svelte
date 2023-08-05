<script lang="ts">
	import { auth0Client, auth0Token, loading, wsmdsUser } from '../../store';
	import Modal from '../../components/Modal.svelte';
	import auth from '../../authService';
	import { Auth0Client } from '@auth0/auth0-spa-js';


	let name = $wsmdsUser.name;
	let showModal = false;

	const changeName = () => {
		showModal = true;
	}

	const submitName = () => {
		showModal = false;
		loading.set(true);
		auth.updateUserName($auth0Client, $auth0Token, name).then(() => {
			loading.set(false);
		})
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
	<div>Wie heißt du fortan?</div>
	<input bind:value={name} placeholder='Dein Name'/>
	<button on:click={submitName}>Name ändern</button>
</Modal>

<style>
</style>
