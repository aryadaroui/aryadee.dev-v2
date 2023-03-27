import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex-svelte';

function highlighter(code, lang) {
	console.log(lang);

	return `<pre><code class="wow">${code}</code></pre>`;
}

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [remarkMath],
	rehypePlugins: [rehypeKatex],

	highlight: highlighter,

});



export default config;
