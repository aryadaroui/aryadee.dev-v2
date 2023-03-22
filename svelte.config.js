import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
// import adapter from '@sveltejs/adapter-vercel';
// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about pre processors
	preprocess: [preprocess(), mdsvex(mdsvexConfig)],

	kit: {
		adapter: adapter()
	}
};

export default config;
