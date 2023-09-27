import type { PageServerLoad } from "./$types";
import { getPosts } from "$lib/server/posts";

export const load: PageServerLoad = () => {
  return {
    posts: getPosts()
  };
}
