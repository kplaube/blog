export type Post = {
  date: string;
  urlPath: string;
  slug: string;
  tags: string[];
  title: string;
}

export type GlobEntry = {
  metadata: Post;
  default: unknown;
}
