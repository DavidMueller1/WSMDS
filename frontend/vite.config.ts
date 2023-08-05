import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import * as fs from 'fs';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	if (env.PRODUCTION)
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
			proxy: {
				'/api': {
					target: env.VITE_API_URL,
					changeOrigin: true,
					secure: false,
					rewrite: (path) => path.replace(/^\/api/, '')
				}
			}
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
