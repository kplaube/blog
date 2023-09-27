import type { PageServerLoad } from "./$types";
import { getPosts } from "$lib/data/posts";

export const load: PageServerLoad = () => {
  return {
    posts: getPosts()
  };
}
