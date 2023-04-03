import { Tag } from "src/type/types";
import useSWRImmutable from "swr/immutable";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("tagデータの取得に失敗しました。");
  }

  const data = await res.json();
  return data.tags;
};

export const useTags = () => {
  const { data, mutate } = useSWRImmutable<Tag[]>("/api/tag", fetcher);

  return { tags: data, mutate };
};
