import type { Post } from "./types";

export function getPathForPost({ date, slug }: Post): string {
  const stringToDate = new Date(date);

  return "/" + [
    stringToDate.getFullYear(),
    ("0" + (stringToDate.getMonth() + 1).toString()).slice(-2),
    ("0" + stringToDate.getDate().toString()).slice(-2),
    `${slug}`,
  ].join("/");
}
