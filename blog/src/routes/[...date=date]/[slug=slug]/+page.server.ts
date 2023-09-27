import { getPosts } from "$lib/server/posts";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const post = getPosts().find(post => post.slug === params.slug)

  if (!post) {
    throw error(404);
  }

  return { post };
}
