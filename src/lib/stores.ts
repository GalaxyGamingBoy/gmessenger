import { writable } from 'svelte/store';

export const defaultServer = writable('localhost:8080');
export const logged = writable(false);
export const cred = writable({
	user: '',
	token: ''
});
