import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex-svelte';
import rehypePrettyCode from 'rehype-pretty-code';

import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

function highlighter(code, lang, meta) {
	// console.log("meta", meta);
	if (meta === null) {
		meta = "";
	}

const block = `\`\`\`${lang} ${meta}
${code}
\`\`\``


const file = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypePrettyCode, prettyCodeOptions)
  .use(rehypeStringify)
  .process(block)


//   console.log("file", file);


	// console.log("lang", lang);
	// console.log("meta", meta);

	return file;
}

const prettyCodeOptions = {
	theme: "rose-pine-moon",
	keepBackground: true,
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
	rehypePlugins: [
		// [rehypePrettyCode, prettyCodeOptions],
		rehypeKatex
	],

	highlight: {highlighter},

});



export default config;
