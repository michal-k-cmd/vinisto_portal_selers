import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), viteTsconfigPaths()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/tests/setup.ts',
	},
});
