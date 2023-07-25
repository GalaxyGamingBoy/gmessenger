<script lang="ts">
	import { goto } from '$app/navigation';
	import { cred, logged } from '$lib/stores';
	import { get } from 'svelte/store';

	const logout = async () => {
		await fetch(`${get(cred).server}logout`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ username: get(cred).user, token: get(cred).token })
		});

		cred.set({ user: '', token: '', server: '' });
		logged.set(false);
		goto('/');
	};

	logout();
</script>

Logging out...
