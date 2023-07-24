<script lang="ts">
	import { goto } from '$app/navigation';
	import { logged } from '$lib/stores';
	import { get } from 'svelte/store';

	if (get(logged)) {
		goto('/home');
	} else {
		goto('/accounts/login');
	}
</script>
