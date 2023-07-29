<script lang="ts">

import { user } from '../store';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<h2>Welcome, {$user.name}</h2>

<style>
</style>
