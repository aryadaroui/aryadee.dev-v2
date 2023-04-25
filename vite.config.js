import { sveltekit } from '@sveltejs/kit/vite';
import autoImport from 'sveltekit-autoimport';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		autoImport({
			components: ['./src/lib'],
			include: ['**/*.svelte', '**/*.svx'],
		}),
		sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	css: {
		postcss: true
	},
	assetsInclude: ['**/*.m4a', '**/*.webp']
};

export default config;
