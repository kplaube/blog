import { getPost } from "$lib/data/posts";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const post = getPost(params.slug);

  if (!post) {
    return {
      status: 404,
    };
  }

  const component = await import(`${post.filename}`);

  return {
    post,
    component: component.default,
  };
}
