<script>
	import './Header.scss'
	import { auth0Client, isAuthenticated, user, wsmdsUser } from '../store';
	import auth from '../authService';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import M from '$lib/images/mm.png'

	// export let auth0Client;
</script>

<header>
	<button class='text-button' on:click={() => {goto("/")}}>WS<img class='header-img' src={M}/>DS</button>
	{#if $isAuthenticated && $user}
		{#if $wsmdsUser}
			<button
				class='user-name text-button'
				on:click={() => {goto("/profile")}}
				in:fly={{x: 200, duration: 1000}}
				out:fade={{duration: 400}}
			>{ $wsmdsUser.name }</button>
		{:else }
<!--			<button-->
<!--				class='user-name text-button'-->
<!--				on:click={() => {goto("/profile")}}-->
<!--				in:fly={{x: 200, duration: 1000}}-->
<!--				out:fade={{duration: 400}}-->
<!--			>{ $user.name }</button>-->
		{/if}
	{:else }
	{/if}
</header>

<style>

</style>
