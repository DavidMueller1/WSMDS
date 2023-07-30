import { writable, derived, Writable } from 'svelte/store';
import { User } from '@auth0/auth0-spa-js';

export interface WsmdsUser {
	id: string;
	name: string;
	role: string;
}

export const isAuthenticated = writable(false);
export const auth0Token = writable('');
export const loading = writable(true);
export const user: Writable<User | undefined> = writable();
export const wsmdsUser: Writable<WsmdsUser | undefined> = writable();
export const popupOpen = writable(false);
export const error = writable();
