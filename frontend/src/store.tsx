import { writable, derived, Writable } from 'svelte/store';
import { Auth0Client, User } from '@auth0/auth0-spa-js';

enum Role {
	USER = 0,
	ADMIN = 1,
	VISUALIZER = 2
}

export interface WsmdsUser {
	id: string;
	name: string;
	role: Role;
}

export const isAuthenticated = writable(false);
export const auth0Token = writable('');
export const auth0Client: Writable<Auth0Client> = writable();
export const loading = writable(true);
export const user: Writable<User | undefined> = writable();
export const wsmdsUser: Writable<WsmdsUser | undefined> = writable();
export const popupOpen = writable(false);
export const error = writable();
