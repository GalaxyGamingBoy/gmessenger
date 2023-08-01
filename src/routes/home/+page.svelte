<script lang="ts">
	import { goto } from '$app/navigation';
	import { cred } from '$lib/stores';
	import { get } from 'svelte/store';

	const scrollToBottom = () => {
		if (document.getElementById('msg-list') && document.getElementById('msg-list') != null) {
			// @ts-ignore
			document.getElementById('msg-list').scrollTop = // @ts-ignore
				document.getElementById('msg-list').scrollHeight;
		}
	};

	// Set Channels
	let channels = new Map<string, Array<{ msg: string; user: string }>>();
	channels.set('welcome', []);

	// Establish Websocket
	const ws = new WebSocket(
		`${new URL(get(cred).server).protocol == 'https:' ? 'wss' : 'ws'}://${
			new URL(get(cred).server).host
		}/socket?token=${get(cred).token}`
	);

	// Disconnect on error
	ws.onerror = (err) => {
		console.error(err);
		goto('/accounts/logout');
	};

	// On Open WS Connection
	ws.onopen = () => {
		console.log(
			'Connected to server: ' +
				`${new URL(get(cred).server).protocol == 'https:' ? 'wss' : 'ws'}://${
					new URL(get(cred).server).host
				}/socket?token=${get(cred).token}`
		);
	};

	// Disconnect on close
	ws.onclose = () => {
		() => {
			console.log('Disconnected from server!');
			goto('/accounts/logout');
		};
	};

	// Parse messages
	const parse = (str: string): Array<string> => {
		return str.split(',');
	};

	// On Message
	ws.onmessage = (message) => {
		const data: string = String(message.data);

		if (String(data).startsWith('imsg')) {
			// Incoming Message
			const cmd = parse(data);
			if (channels.has(cmd[1])) {
				//@ts-expect-error
				channels.get(cmd[1]).push({ msg: atob(cmd[3]), user: cmd[2] });
				channels = channels;
				scrollToBottom();
			}
		} else if (data == 'fail,exist') {
			goto('/accounts/logout');
		} else if (data.indexOf('fail') != -1) {
			console.error(data);
		} else {
			console.warn(data);
		}
	};

	// Send Message
	let msg = '';
	const send = () => {
		if (msg != '') {
			ws.send(`omsg,${location.hash.replace('#', '')},${btoa(msg)}`);
			msg = '';
		}
	};

	// Select Default Channel
	if (location.hash == '') {
		location.hash = 'welcome';
	}
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
				{#each Array.from(channels.keys()) as chan}
					<li class="my-1">
						<a href={`#${chan}`}
							># <strong class={`#${chan}` == location.hash ? 'underline' : ''}>{chan}</strong></a
						>
					</li>
				{/each}
			</ul>
		</div>

		<div class="flex items-end h-[43.5vh] mx-1">
			<div>
				<p>
					Connected to server: <strong>{get(cred).server}</strong>, as:
					<strong>{get(cred).user}</strong>
				</p>
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
					<h1 class="text-lg inline"># <strong>{location.hash.replace('#', '')}</strong></h1>
					<p class="mx-1 inline">-</p>
					<!-- <p class="inline mr-5">
						<strong class="underline font-medium">99</strong> Subscribers
					</p> -->

					<button class="rounded bg-red-500 hover:bg-red-700 px-4 font-bold"
						><!-- ICON -->Unsubscribe</button
					>
				</div>
			</div>
			<div class="m-1 mx-2 overflow-y-scroll h-[82.5vh]" id="msg-list">
				<!-- CONTENT -->
				<div>
					{#each channels.get(location.hash.replace('#', '')) || [] as m}
						<div class="my-1">
							<h1 class="font-semibold text-lg">{m.user}</h1>
							<p>{m.msg}</p>
						</div>
					{/each}
				</div>
			</div>
			<div class="mx-2">
				<!-- BOTTOM BAR -->
				<form>
					<div class="text-gray-800 inline">
						<input type="text" class="rounded bg-gray-400 w-10/12" bind:value={msg} autofocus />
					</div>
					<button
						class="inline rounded bg-blue-700 hover:bg-blue-900 py-2 px-4 mx-2.5 font-semibold text-base"
						type="submit"
						on:click={() => {
							send();
						}}><!-- SEND ICON -->Send!</button
					>
				</form>
			</div>
		</div>
	</div>
</div>
