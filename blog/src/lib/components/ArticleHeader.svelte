<script lang="ts">
	import type { Post } from '$lib/types';

	export let post: Post;
	export let headline = true;
	export let link: string = '';

	const formattedDate = new Date(post.date).toLocaleDateString('pt-BR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const tag = headline ? 'h1' : 'h2';
</script>

<header class:headline>
	<svelte:element this={tag}>{post.title}</svelte:element>

	<time datetime={post.date}>{formattedDate}</time>
</header>

<style>
	h2 {
		margin-top: 0;
		margin-bottom: 0.2rem;
	}

	time {
		color: var(--secondary-color);
	}

	.headline {
		text-align: center;
		margin-bottom: 3rem;
	}

	.headline h1 {
		font-size: 2.5rem;
		margin-bottom: 0.3rem;
	}
</style>
