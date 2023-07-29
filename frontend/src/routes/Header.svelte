<script>
	import './Header.scss'
	import { isAuthenticated, user } from '../store';
	import auth from '../authService';

	export let auth0Client;

	function logout() {
		auth.logout(auth0Client);
	}
</script>

<header>
	{#if $isAuthenticated && $user}
		<div>{ $user.name }</div>
		<button class='button-logout' on:click={logout}>Logout</button>
	{:else }
		<div>HEADER</div>
	{/if}
</header>

<style>

</style>
