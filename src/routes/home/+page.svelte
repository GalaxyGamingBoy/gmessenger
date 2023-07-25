<script>
	import { goto } from '$app/navigation';
	import { cred } from '$lib/stores';
	import { get } from 'svelte/store';

	const ws = new WebSocket(
		`${new URL(get(cred).server).protocol == 'https:' ? 'wss' : 'ws'}://${
			new URL(get(cred).server).host
		}/socket?token=${get(cred).token}`
	);

	ws.onerror = (err) => {
		console.error(err);
		goto('/accounts/logout');
	};

	ws.onopen = () => {
		console.log(
			'Connected to server: ' +
				`${new URL(get(cred).server).protocol == 'https:' ? 'wss' : 'ws'}://${
					new URL(get(cred).server).host
				}/socket?token=${get(cred).token}`
		);
	};

	ws.onclose = () => {
		() => {
			console.log('Disconnected from server!');
			goto('/accounts/logout');
		};
	};

	let msg = '';
</script>

<div class="flex">
	<div class="bg-gray-700 h-screen w-3/12">
		<!-- SIDEBAR -->
		<div class="flex justify-center mx-3 my-2">
			<h1 class="text-xl font-bold">GMessenger</h1>
		</div>

		<div class="my-3">
			<div class="my-3 flex justify-center">
				<button
					class="rounded bg-green-500 hover:bg-green-700 text-gray-700 py-2 px-4 font-semibold w-full mx-5"
					><!-- ICON -->Channel List</button
				>
			</div>
			<div class="my-3 flex justify-center">
				<button
					class="rounded bg-green-500 hover:bg-green-700 text-gray-700 py-2 px-4 font-semibold w-full mx-5"
					><!-- ICON -->+ New Channel</button
				>
			</div>
		</div>

		<hr />

		<div class="my-3">
			<ul class="mx-3 text-lg">
				<li class="my-1"><a href="#"># <strong class="underline">welcome</strong></a></li>
				<li class="my-1"><a href="#"># <strong class="">welcome</strong></a></li>
				<li class="my-1"><a href="#"># <strong class="">welcome</strong></a></li>
				<li class="my-1"><a href="#"># <strong class="">welcome</strong></a></li>
				<li class="my-1"><a href="#"># <strong class="">welcome</strong></a></li>
			</ul>
		</div>

		<div class="flex items-end h-[43.5vh] mx-1">
			<div>
				<p>Connected to server: <strong>localhost:8080</strong>, as: <strong>UserA</strong></p>
				<a href="/accounts/logout">Have to leave, <strong class="underline">logout</strong>.</a>
			</div>
		</div>
	</div>
	<div class="justify-end">
		<div>
			<!-- MAIN -->
			<div class="bg-gray-900 w-[75vw]">
				<!-- TOP BAR -->
				<div class="py-1.5 px-3">
					<h1 class="text-lg inline"># <strong>welcome</strong></h1>
					<p class="mx-1 inline">-</p>
					<p class="inline mr-5">
						<strong class="underline font-medium">99</strong> Subscribers
					</p>

					<button class="rounded bg-red-500 hover:bg-red-700 px-4 font-bold"
						><!-- ICON -->Unsubscribe</button
					>
				</div>
			</div>
			<div class="m-1 mx-2 overflow-y-auto h-[82.5vh]">
				<!-- CONTENT -->
				<div>
					<div class="my-1">
						<h1 class="font-semibold text-lg">UserA</h1>
						<p>This is a message! :D</p>
					</div>
					<div class="my-1">
						<h1 class="font-semibold text-lg">UserB</h1>
						<p>Yes this is! :L</p>
					</div>
					<div class="my-1">
						<h1 class="font-semibold text-lg">UserA</h1>
						<p>Hello!</p>
					</div>
					<div class="my-1">
						<h1 class="font-semibold text-lg">UserB</h1>
						<p>Hi :wave:</p>
					</div>
					<div class="my-1">
						<h1 class="font-semibold text-lg">UserA</h1>
						<p>How are you @UserB?</p>
					</div>
					<div class="my-1">
						<h1 class="font-semibold text-lg">UserB</h1>
						<p>Good!</p>
					</div>
					<div class="my-1">
						<h1 class="font-semibold text-lg">UserB</h1>
						<p>You?</p>
					</div>
					<div class="my-1">
						<h1 class="font-semibold text-lg">UserA</h1>
						<p>Fine ig ._.</p>
					</div>
				</div>
			</div>
			<div class="mx-2">
				<!-- BOTTOM BAR -->
				<form>
					<div class="text-gray-800 inline">
						<input type="text" class="rounded bg-gray-400 w-10/12" bind:value={msg} />
					</div>
					<button
						class="inline rounded bg-blue-700 hover:bg-blue-900 py-2 px-4 mx-2.5 font-semibold text-base"
						type="submit"
						on:click={() => (msg = '')}><!-- SEND ICON -->Send!</button
					>
				</form>
			</div>
		</div>
	</div>
</div>
