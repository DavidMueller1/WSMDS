<script>
	import './Header.scss'
	import { isAuthenticated, user, wsmdsUser } from '../store';
	import auth from '../authService';

	export let auth0Client;

	function logout() {
		auth.logout(auth0Client);
	}
</script>

<header>
	{#if $isAuthenticated && $user}
		{#if $wsmdsUser}
			<div>{ $wsmdsUser.name }</div>
		{:else }
			<div>{ $user.name }</div>
		{/if}
		<button class='button-logout' on:click={logout}>Logout</button>
	{:else }
		<div>WSMDS</div>
	{/if}
</header>

<style>

</style>
