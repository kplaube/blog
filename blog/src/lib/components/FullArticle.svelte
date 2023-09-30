<script lang="ts">
	import type { Post } from '$lib/types';

	export let post: Post;

	const formattedDate = new Date(post.date).toLocaleDateString('pt-BR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<article>
	<header>
		<h1>{post.title}</h1>
		<time datetime={post.date}>{formattedDate}</time>
	</header>

	<div class="content">
		<slot />
	</div>
</article>

<style lang="scss">
	.content {
		color: var(--primary-color);
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		font-size: 1.15;
		font-weight: 300;
		letter-spacing: -0.054px;
		line-height: 1.5rem;

		& :global(a) {
			color: var(--brand-color);
			text-decoration: none;
		}
		& :global(a:hover) {
			text-decoration: underline;
		}

		& :global(blockquote) {
			border-left: 4px solid var(--light-highlight-color);
			color: var(--secondary-color);
			font-style: italic;
			margin-left: 0;
			padding-left: 1.25rem;
		}

		& :global(p > code) {
			background-color: var(--light-highlight-color);
			border-radius: 0.25rem;
			color: var(--primary-color);
			font-family: 'Courier New', Courier, monospace;
			font-size: 0.9rem;
			padding: 0.25rem 0.5rem;
		}

		& :global(figcaption) {
			color: var(--secondary-color);
			font-size: 0.8rem;
			margin-top: 1rem;
			text-align: center;
		}

		& :global(figure) {
			margin: 2rem 0;
		}

		& :global(h2) {
			margin: 1.75rem 0;
		}

		& :global(iframe) {
			height: 380px;
			width: 100%;
		}

		& :global(img) {
			border-radius: 0.5rem;
			display: block;
			height: auto;
			margin: 0 auto;
			max-width: 100%;
		}

		& :global(pre) {
			border-radius: 0.5rem;
			padding: 1.5rem;
		}

		& :global(strong) {
			font-weight: 600;
		}
	}

	article {
		header {
			margin-bottom: 3rem;

			h1 {
				font-size: 2.5rem;
				margin-bottom: 0.3rem;
			}
		}
	}

	header {
		text-align: center;
	}

	time {
		color: var(--secondary-color);
	}
</style>
