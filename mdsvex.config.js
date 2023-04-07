import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex-svelte';
import rehypePrettyCode from 'rehype-pretty-code';
// import rehypePrettyCode from './src/lib/rehype-pretty-code.js';
import rehypePrettyCodeMdsvex from './rehype-pretty-code-mdsvex.js';

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

import { visit } from 'unist-util-visit';

// import bubble_dark from './src/styles/bubble_dark.json' assert {type: "json"};

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
	return file.toString().replaceAll('{', "&#123;").replaceAll('}', "&#125;");
	// return file;
}

const prettyCodeOptions = {
	theme: "rose-pine-moon",

	tokensMap: {
		function: 'support.function',
		variable: 'variable.other',
		keyword: 'keyword',
		param: 'variable.parameter',
		string: 'string',
		comment: 'comment',
		number: 'constant.numeric',
		type: 'storage.type',
	  },

	onVisitLine(node) {
		// Prevent lines from collapsing in `display: grid` mode, and allow empty
		// lines to be copy/pasted
		if (node.children.length === 0) {
			node.children = [{ type: 'text', value: ' ' }];
		}
	},
	onVisitHighlightedLine(node) {
		node.properties.className.push('highlighted');
	},
	onVisitHighlightedWord(node, id) {
		node.properties.className = ['word'];

		if (id) {
			const backgroundColor = {
				v: 'rgb(196 42 94 / 59%)',
				s: 'rgb(0 103 163 / 56%)',
				i: 'rgb(100 50 255 / 35%)',
			}[id];

			const color = {
				v: 'rgb(255 225 225 / 100%)',
				s: 'rgb(175 255 255 / 100%)',
				i: 'rgb(225 200 255 / 100%)',
			}[id];

			if (node.properties['data-rehype-pretty-code-wrapper']) {
				node.children.forEach((childNode) => {
					childNode.properties.style = '';
				});
			}

			node.properties.style = `background-color: ${backgroundColor}; color: ${color};`;
		}
	},
};

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	// smartypants: false,

	remarkPlugins: [remarkMath],
	rehypePlugins: [[rehypePrettyCodeMdsvex, prettyCodeOptions], rehypeKatex],
	// rehypePlugins: [rehypeKatex],

	highlight: {highlighter},

});



export default config;
