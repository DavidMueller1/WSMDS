<script lang="ts">
	import { auth0Client, auth0Token, user } from '../store';
	import auth from '../authService';


	let name = $user?.name;

	const submitName = () => {
		console.log('Submitting name:', name);
		auth.createProfile($auth0Client, $auth0Token, name)
	}
</script>

<div class='welcome-form center-flex'>
	<div>Moinsen! Wie soll ich dich nennen?</div>
	<input bind:value={name} placeholder='Dein Name'/>
	<button on:click={submitName}>Weiter</button>
</div>