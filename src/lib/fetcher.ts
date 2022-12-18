export type Method = "POST" | "PUT" | "DELETE";

type BodyData = {
  title: string;
  body: string;
};
export const contentFetch = async (
  method: Method,
  bodyData: BodyData | null,
  id: string | null = null
): Promise<void> => {
  console.log(`id ${id}`);

  const url = id ? `/api/content/${id}` : `/api/content/`;
  const params = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyData ? JSON.stringify(bodyData) : null,
  };
  console.log(params);

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
