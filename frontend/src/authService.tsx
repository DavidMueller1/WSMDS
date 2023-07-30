import { Auth0Client, createAuth0Client, PopupLoginOptions } from '@auth0/auth0-spa-js';
import { auth0Token, isAuthenticated, loading, popupOpen, user, wsmdsUser } from './store';
import auth0Config from './auth0.config';
// Import environment variables
// import dotenv from 'dotenv';
// dotenv.config();

async function createClient() {
	return await createAuth0Client({
		domain: auth0Config.domain,
		clientId: auth0Config.clientId,
		authorizationParams: {
			redirect_uri: window.location.origin,
			audience: auth0Config.audience
		}
	});
}

function checkAuth(client: Auth0Client): Promise<boolean> {
	return new Promise((resolve) => {
		client.isAuthenticated().then((isAuth) => {
			isAuthenticated.set(isAuth);
			if (isAuth) {
				client.getUser().then((usr) => {
					if (usr) {
						user.set(usr);
					}
					client.getTokenSilently().then((token) => {
						auth0Token.set(token);
						resolve(true);
					});
				});
			} else {
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

const getUserProfile = (client: Auth0Client, token: string): Promise<void> => {
	return new Promise<void>((resolve) => {
		fetch(`http://localhost:8000/api/profile`, {
			method: 'GET',
			headers: {
				authorization: `Bearer ${token}`
			}
		}).then((res) => {
			if (res.ok) {
				res.json().then((profile) => {
					console.log('profile: ', profile);
					wsmdsUser.set({
						id: profile.userId,
						name: profile.userName,
						role: profile.role
					});
					resolve();
				});
			} else {
				resolve();
			}
		});
	});
};

const createProfile = (client: Auth0Client, token: string, userName: string): Promise<void> => {
	return new Promise<void>((resolve) => {
		fetch(`http://localhost:8000/api/profile`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userName: userName
			})
		}).then((res) => {
			if (res.ok) {
				res.json().then((profile) => {
					console.log('profile: ', profile);
					wsmdsUser.set({
						id: profile.userId,
						name: profile.userName,
						role: profile.role
					});
					resolve();
				});
			} else {
				resolve();
			}
		});
	});
};

const auth = {
	createClient,
	createProfile,
	checkAuth,
	getUserProfile,
	loginWithPopup,
	logout
};

export default auth;
