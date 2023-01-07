export type Method = "POST" | "PUT" | "DELETE";

type ContentBodyData = {
  title: string;
  body: string;
};

type TagBodyData = {
  name: string;
};

export const contentFetch = async (
  method: Method,
  bodyData: ContentBodyData | null,
  id: string | null = null
): Promise<void> => {
  const url = id ? `/api/content/${id}` : `/api/content/`;
  const params = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyData ? JSON.stringify(bodyData) : null,
  };

  const res = await fetch(url, params);

  if (!res.ok) {
    throw new Error("失敗しました。");
  }

  const json = res.json();

  return json;
};

export const tagFetch = async (
  method: Method,
  bodyData: TagBodyData | null,
  id: string | null = null
): Promise<void> => {
  const url = id ? `/api/tag/${id}` : `/api/tag/`;
  const params = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyData ? JSON.stringify(bodyData) : null,
  };

  const res = await fetch(url, params);

  if (!res.ok) {
    throw new Error("失敗しました。");
  }

  const json = res.json();

  return json;
};

export const reavalidate = async (): Promise<void> => {
  await fetch("/api/reavalidate");
};
