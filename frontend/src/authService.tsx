import { Auth0Client, createAuth0Client, PopupLoginOptions, User } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen, loading } from './store';
import auth0Config from './auth0.config';

async function createClient() {
	let auth0Client = await createAuth0Client({
		domain: auth0Config.domain,
		clientId: auth0Config.clientId
	});

	return auth0Client;
}

function checkAuth(client: Auth0Client): Promise<boolean> {
	return new Promise((resolve) => {
		loading.set(true);
		client.isAuthenticated().then((isAuth) => {
			isAuthenticated.set(isAuth);
			if (isAuth) {
				client.getUser().then((usr) => {
					if (usr) {
						user.set(usr);
					}
					loading.set(false);
					resolve(true);
				});
			} else {
				loading.set(false);
				resolve(false);
			}
		});
	});
}

async function loginWithPopup(client: Auth0Client, options: PopupLoginOptions) {
	console.log('loginWithPopup');
	popupOpen.set(true);
	try {
		client.loginWithPopup(options).then(() => {
			checkAuth(client);
		});
	} catch (e) {
		// eslint-disable-next-line
		console.error(e);
	} finally {
		popupOpen.set(false);
	}
}

function logout(client: Auth0Client) {
	return client.logout({ logoutParams: { returnTo: window.location.origin } });
}

const auth = {
	createClient,
	checkAuth,
	loginWithPopup,
	logout
};

export default auth;
