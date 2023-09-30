import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import figure from "./src/lib/plugins/figure.js";

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: [".md"],
  rehypePlugins: [figure],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
	kit: {
		adapter: adapter(),
	},
	preprocess: [mdsvex(mdsvexOptions), vitePreprocess()],
};

export default config;
