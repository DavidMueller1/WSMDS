<script lang="ts">
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
	<input bind:value={code} placeholder='Code'/>
	<button on:click={submitCode}>Connect</button>
</div>
