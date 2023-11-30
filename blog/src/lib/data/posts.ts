import type { GlobEntry, Post } from "$lib/types";
import { getPathForPost } from "$lib/helpers";

export function getPosts(): Post[] {
  const paths = import.meta.glob<GlobEntry>("/src/posts/*.md", { eager: true });

  return Object.entries(paths).map(([filename, globEntry]) => (
    {
      ...globEntry.metadata,
      filename,
      urlPath: getPathForPost(globEntry.metadata)
    }
  )).sort((a, b) => new Date(b.date) > new Date(a.date) ? 1 : -1);
}

export function getPost(slug: string): Post | undefined {
  const posts = getPosts();

  return posts.find(post => post.slug === slug);
}
