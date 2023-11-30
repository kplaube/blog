import { getPost } from "$lib/data/posts";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const post = getPost(params.slug);

  if (!post) {
    throw error(404, "Post not found");
  }

  const component = await import(`${post.filename}`);

  return {
    post,
    component: component.default,
  };
}
