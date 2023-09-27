<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1>Welcome to SvelteKit</h1>

<ul>
	{#each data.posts as post (post.slug)}
		<li><a href={post.urlPath}>{post.title}</a></li>
	{/each}
</ul>
