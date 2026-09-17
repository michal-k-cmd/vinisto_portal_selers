import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

import createConfigFile from './src/createConfigFile.ts';

export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd() + '/env');

	return defineConfig({
		define: {
			'process.env': process.env,
		},
		build: {
			outDir: './build',
			target: 'es2015',
		},
		root: './',
		envDir: './env',
		plugins: [
			createConfigFile({ mode, env }),
			react(),
			viteTsconfigPaths(),
			checker({
				typescript: true,
				eslint: {
					lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
					dev: {
						logLevel: ['error'],
					},
				},
				enableBuild: false,
			}),
		],
		server: {
			open: true,
			port: 3000,
		},
	});
};
