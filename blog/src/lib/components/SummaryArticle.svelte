<script lang="ts">
	import ArticleHeader from './ArticleHeader.svelte';
	import type { Post } from '$lib/types';

	export let post: Post;
</script>

<a href={post.urlPath}>
	<article>
		<img src={post.thumbnail} alt="Post thumbnail" />
		<div>
			<ArticleHeader {post} headline={false} />
		</div>
	</article>
</a>

<style>
	a {
		color: var(--primary-color);
		text-decoration: none;
	}
	a:hover :global(h2) {
		text-decoration: underline;
	}
	a:hover img {
		filter: grayscale(60%);
	}

	article {
		display: flex;
		margin-bottom: 32px;
	}

	img {
		background: #f4f4f4;
		border: 1px solid #f4f4f4;
		border-radius: 0.5rem;
		height: 80px;
		margin-right: 16px;
		width: 80px;
	}

	div {
		align-self: center;
	}
</style>
