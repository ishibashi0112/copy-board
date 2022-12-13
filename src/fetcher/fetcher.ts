import { formValues, modalType } from "src/hooks/useModal";

export const contentFetch = async (
  method: modalType,
  values: formValues | null,
  id: string | null = null
): Promise<void> => {
  const url = id ? `/api/content/${id}` : `/api/content/`;
  const params = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: values ? JSON.stringify(values) : null,
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
