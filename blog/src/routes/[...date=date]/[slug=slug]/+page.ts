import { getPost } from "$lib/data/posts";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const post = getPost(params.slug);
  const component = await import(`${post.filename}`);

  return {
    post,
    component: component.default,
  };
}
