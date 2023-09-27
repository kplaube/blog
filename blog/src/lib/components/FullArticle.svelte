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

<style scoped>
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

	.content :global(h2) {
		margin: 1.75rem 0;
	}

	article header {
		margin-bottom: 3rem;
	}

	article header h1 {
		font-size: 2.5rem;
		margin-bottom: 0.3rem;
	}

	header {
		text-align: center;
	}

	time {
		color: var(--secondary-color);
	}
</style>
