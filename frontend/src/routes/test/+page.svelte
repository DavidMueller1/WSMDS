<script lang="ts">
	import { user } from '../../store';

	let code = '';

	const submitCode = () => {
		console.log('Submitting code:', code);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class='connect-form center-flex'>
	Servus {$user.name}!
</div>

<style>
</style>
