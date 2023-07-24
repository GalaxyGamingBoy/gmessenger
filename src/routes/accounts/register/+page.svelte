<script lang="ts">
	import { goto } from '$app/navigation';
	import { defaultServer } from '$lib/stores';
	import { get } from 'svelte/store';

	let server: string = get(defaultServer);
	let user: string;
	let pass: string;

	const register = () => {
		goto('/accounts/login');
	};
</script>

<div class="m-3">
	<div class="flex justify-center my-5">
		<h1 class="text-3xl">Register to use <strong class="underline">GMessenger</strong></h1>
	</div>
	<br />
	<div class="flex justify-center m-5">
		<form class="">
			<div class="m-4">
				<span class="text-xl"><strong>Server</strong>: </span>
				<div class="inline text-gray-800">
					<br />
					<input type="url" class="rounded-lg bg-gray-400" bind:value={server} required />
				</div>
			</div>
			<div class="m-4">
				<span class="text-xl"><strong>Username</strong>: </span>
				<div class="inline text-gray-800">
					<br />
					<input type="text" class="rounded-lg bg-gray-400" bind:value={user} required />
				</div>
			</div>
			<div class="m-4">
				<span class="text-xl"><strong>Password</strong>: </span>
				<div class="inline text-gray-800">
					<br />
					<input type="password" class="rounded-lg bg-gray-400" bind:value={pass} required />
				</div>
			</div>
			<div class="text-base mx-6 my-3">
				<p>
					Have an account? <a href="/accounts/login" class="font-semibold underline text-indigo-500"
						>Login!</a
					>
				</p>
			</div>
			<div class="flex justify-center">
				<button
					class="text-base rounded py-2 px-4 bg-green-500 hover:bg-green-700 text-white font-semibold"
					type="submit"
					on:click={register}>Register!</button
				>
			</div>
		</form>
	</div>
</div>
