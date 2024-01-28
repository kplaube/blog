export type Post = {
  date: string;
  filename: string;
  urlPath: string;
  slug: string;
  tags: string[];
  thumbnail: string;
  title: string;
}

export type GlobEntry = {
  metadata: Post;
  default: unknown;
}
