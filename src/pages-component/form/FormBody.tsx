import { Button, Textarea, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { contentFetch, reavalidate } from "src/lib/fetcher";
import { Contents } from "src/pages";

type Props = {
  content?: Contents;
};

export const FormBody: FC<Props> = ({ content }) => {
  const { pathname, push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      title: content ? content.title : "",
      body: content ? content.body : "",
    },
  });

  const formTitle = pathname !== "/form" ? "編集" : "新規作成";
  const buttonName = pathname !== "/form" ? "保存する" : "作成する";

  const handleSubmit = useCallback(
    async (values: typeof form.values): Promise<void> => {
      try {
        setIsLoading(true);

        const id = content ? content.id : null;
        const method = pathname !== "/form" ? "PUT" : "POST";

        await contentFetch(method, values, id);
        await reavalidate();
        await push("/");
        showNotification({
          title: "Succese‼",
          message: "成功しました",
          color: "green",
        });
      } catch (error) {
        console.error(error);
        showNotification({
          title: "Error",
          message: "失敗しました。",
          color: "red",
        });
      } finally {
        setIsLoading(false);
      }
    },

    [form, content, pathname]
  );

  return (
    <div className="min-h-[500px]  p-3 rounded-md ">
      <Title className="mb-3" order={3}>
        {formTitle}
      </Title>

      <form className="space-y-3" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="タイトル" required {...form.getInputProps("title")} />
        <Textarea
          classNames={{ input: "min-h-[300px]" }}
          label="内容"
          autosize
          required
          {...form.getInputProps("body")}
        />

        <Button
          className="block w-24 ml-auto"
          loading={isLoading}
          type="submit"
        >
          {buttonName}
        </Button>
      </form>
    </div>
  );
};
