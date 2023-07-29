import { writable, derived, Writable } from 'svelte/store';
import { User } from '@auth0/auth0-spa-js';

export const isAuthenticated = writable(false);
export const loadingAuth = writable(true);
export const user: Writable<User | undefined> = writable();
export const popupOpen = writable(false);
export const error = writable();
