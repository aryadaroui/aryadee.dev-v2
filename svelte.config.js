import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-vercel';
// import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-static';

// import { vitePreprocess } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about pre processors
	preprocess: [preprocess({
		scss: { prependData: '@import "./src/styles/vars";' }
	}), mdsvex(mdsvexConfig)],
	// preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],

	kit: {
		adapter: adapter()
	},

	// temporary, while the a11y warnings are being fixed
	onwarn: (warning, handler) => {
        if (warning.code.startsWith('a11y-')) {
            return;
        }
		if (warning.code === 'css-unused-selector') {
			return;
		}
        handler(warning);
    },
};

export default config;
