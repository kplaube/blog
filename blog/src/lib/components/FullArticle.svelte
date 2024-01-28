<script lang="ts">
	import type { Post } from '$lib/types';
	import ArticleHeader from './ArticleHeader.svelte';

	export let post: Post;
</script>

<article>
	<ArticleHeader {post} />

	<div class="content">
		<slot />
	</div>
</article>

<style>
	.content {
		color: var(--primary-color);
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		font-size: 1.15;
		font-weight: 300;
		letter-spacing: -0.054px;
		line-height: 1.5rem;
	}

	.content :global(a) {
		color: var(--brand-color);
		text-decoration: none;
	}
	.content :global(a:hover) {
		text-decoration: underline;
	}

	.content :global(blockquote) {
		border-left: 4px solid var(--light-highlight-color);
		color: var(--secondary-color);
		font-style: italic;
		margin-left: 0;
		padding-left: 1.25rem;
	}

	.content :global(p > code),
	.content :global(li > code) {
		background-color: var(--light-highlight-color);
		border-radius: 0.25rem;
		color: var(--primary-color);
		font-family: 'Courier New', Courier, monospace;
		font-size: 0.9rem;
		padding: 0.25rem 0.5rem;
	}

	.content :global(figcaption) {
		color: var(--secondary-color);
		font-size: 0.8rem;
		margin-top: 1rem;
		text-align: center;
	}

	.content :global(figure) {
		margin: 2rem 0;
	}

	.content :global(h2) {
		margin: 1.75rem 0;
	}

	.content :global(iframe) {
		height: 380px;
		width: 100%;
	}

	.content :global(img) {
		border-radius: 0.5rem;
		display: block;
		height: auto;
		margin: 0 auto;
		max-width: 100%;
	}

	.content :global(pre) {
		border-radius: 0.5rem;
		padding: 1.5rem;
	}

	.content :global(strong) {
		font-weight: 600;
	}
</style>
