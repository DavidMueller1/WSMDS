import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import * as fs from 'fs';

export default defineConfig(({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	if (process.env.PRODUCTION)
		return {
			plugins: [sveltekit()]
		};

	return {
		plugins: [sveltekit()],
		server: {
			https: {
				key: fs.readFileSync(`${__dirname}/cert/key.pem`),
				cert: fs.readFileSync(`${__dirname}/cert/cert.pem`)
			},
			proxy: {}
		}
	};
});

// export default defineConfig({
// 	plugins: [sveltekit()],
// 	server: {
// 		https: {
// 			key: fs.readFileSync(`${__dirname}/cert/key.pem`),
// 			cert: fs.readFileSync(`${__dirname}/cert/cert.pem`)
// 		},
// 		proxy: {}
// 	}
// });
