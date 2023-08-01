<script lang="ts">
	import { goto } from '$app/navigation';
	import { cred, defaultServer, logged } from '$lib/stores';
	import { get } from 'svelte/store';

	let server: string = get(defaultServer);
	let user: string;
	let pass: string;
	let errorMessage: string;

	if (get(logged)) {
		goto('/home');
	}

	const login = async () => {
		errorMessage = '';
		if (server && user && pass) {
			const url = (server.endsWith('/') ? server : server + '/') + 'login';
			const req = await fetch(url, {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ username: user, password: pass })
			}).then((v) => v.json());

			if (req.result == true) {
				cred.set({
					user: user,
					token: String(req.jwt),
					server: server.endsWith('/') ? server : server + '/'
				});
				logged.set(true);
				goto('/home');
			} else {
				errorMessage = req.msg;
			}
		} else {
			errorMessage = 'You must fill out all fields!';
		}
	};
</script>

<div class="m-3">
	<div class="flex justify-center my-5">
		<h1 class="text-3xl">Login to use <strong class="underline">GMessenger</strong></h1>
	</div>
	{#if errorMessage}
		<div class="flex justify-center align-center">
			<div class="w-[80vw] h10 bg-red-600 rounded border">
				<h2 class="text-xl text-white font-semibold text-center">{errorMessage}</h2>
			</div>
		</div>
	{/if}
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
					Don't have an account? <a
						href="/accounts/register"
						class="font-semibold underline text-indigo-500">Register!</a
					>
				</p>
			</div>
			<div class="flex justify-center">
				<button
					class="text-base rounded py-2 px-4 bg-green-500 hover:bg-green-700 text-white font-semibold"
					type="submit"
					on:click={login}>Login!</button
				>
			</div>
		</form>
	</div>
</div>
