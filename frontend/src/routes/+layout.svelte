<script lang="ts">
	import Header from './Header.svelte';
	import './global.scss';
	import auth from '../authService';
	import { auth0Client, auth0Token, isAuthenticated, loading, user, wsmdsUser } from '../store';
	import { Auth0Client, User } from '@auth0/auth0-spa-js';
	import { onMount } from 'svelte';
	import { Circle3 } from 'svelte-loading-spinners';
	import { initWebSocket } from '../websocketService';
	import Welcome from './Welcome.svelte';

	// let auth0Client: Auth0Client;

	onMount(async () => {
		loading.set(true);

		auth0Client.set(await auth.createClient());
		auth.checkAuth($auth0Client).then(isAuth => {
			loading.set(false);
			// if (isAuth) {
			// 	// initWebSocket();
			// 	auth.getUserProfile($auth0Client, $auth0Token).then(() => {
			// 		loading.set(false);
			// 	})
			// } else {
			// 	loading.set(false);
			// }
		});
	});

	const login = () => {
		loading.set(true);
		auth.loginWithPopup($auth0Client, {}).then(() => {
			loading.set(false);
		});
	}

</script>

<div class="app">
	<Header />

	<div class='content'>
		{#if $loading}
			<span class='loading-spinner'>
				<Circle3
					size='100'
					ballTopLeft='#0083b4'
					ballTopRight='#df2c45'
					ballBottomLeft='#892c6b'
					ballBottomRight='#0a72d4'
				/>
			</span>
		{:else }
			{#if $isAuthenticated && $user}
				{#if $wsmdsUser}
					<slot />
				{:else }
					<Welcome />
				{/if}
			{:else}
				<div class='no-auth center-flex'>
					<div>Log dich bitte ein, damit ich weiß wer du bist</div>
					<button on:click={login}>Login</button>
				</div>
			{/if}
		{/if}
	</div>

<!--	<footer>-->
<!--		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>-->
<!--	</footer>-->
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	/*main {*/
	/*	flex: 1;*/
	/*	display: flex;*/
	/*	flex-direction: column;*/
	/*	padding: 1rem;*/
	/*	width: 100%;*/
	/*	max-width: 64rem;*/
	/*	margin: 0 auto;*/
	/*	box-sizing: border-box;*/
	/*}*/

	/*footer {*/
	/*	display: flex;*/
	/*	flex-direction: column;*/
	/*	justify-content: center;*/
	/*	align-items: center;*/
	/*	padding: 12px;*/
	/*}*/

	/*footer a {*/
	/*	font-weight: bold;*/
	/*}*/

	/*@media (min-width: 480px) {*/
	/*	footer {*/
	/*		padding: 12px 0;*/
	/*	}*/
	/*}*/
</style>
