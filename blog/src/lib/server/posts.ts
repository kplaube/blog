import type { GlobEntry, Post } from "$lib/types";
import { getPathForPost } from "$lib/utils";

export function getPosts(): Post[] {
  const paths = import.meta.glob<GlobEntry>("/src/posts/*.md", { eager: true });
  return Object.entries(paths).map(([, globEntry]) => (
    {
      ...globEntry.metadata,
      urlPath: getPathForPost(globEntry.metadata)
    }
  ));
}
