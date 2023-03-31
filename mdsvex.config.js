import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex-svelte';
import rehypePrettyCode from 'rehype-pretty-code';
// import rehypePrettyCode from './src/lib/rehype-pretty-code.js';

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

import { visit } from 'unist-util-visit';

function addCustomAttribute() {
	return function transformer(tree) {
		visit(tree, ['element'], function (node) {
			if (node.tagName === 'div') {
				// has to be done like this because of eslint warning: https://eslint.org/docs/latest/rules/no-prototype-builtins
				if (Object.prototype.hasOwnProperty.call(node.properties, 'data-rehype-pretty-code-fragment')) {
					node.properties['tabindex'] = '0';
				}
			}
		});
	};
}

async function highlighter(code, lang, meta) {
	// mdsvex destructure the code block, so we have to reassemble it and pass it to rehype-pretty-code

	// if extra meta is not provided, we need to set an empty string
	if (meta === null) {
		meta = "";
	}

	const block = `\`\`\`${lang} ${meta}
${code}
\`\`\``

	const file = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypePrettyCode, prettyCodeOptions)
		.use(addCustomAttribute)
		.use(rehypeStringify)
		.process(block)


	// console.log(file)
	return file;
}

const prettyCodeOptions = {
	theme: "rose-pine-moon",
	keepBackground: false,
	onVisitLine(node) {
		if (node.children.length === 0) {
			node.children = [
				{
					type: "text",
					value: " ",
				},
			];
		}
	},
	onVisitHighlightedLine(node) {
		node.properties.className.push("highlighted");
	},
	onVisitHighlightedWord(node) {
		node.properties.className = ["word"];
	},
	tokensMap: {},
};

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
	},

	remarkPlugins: [remarkMath],
	rehypePlugins: [rehypeKatex],

	highlight: { highlighter },

});



export default config;
