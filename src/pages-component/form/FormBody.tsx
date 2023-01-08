import { Button, Select, Textarea, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { contentFetch, reavalidate } from "src/lib/fetcher";
import { Contents, Tag } from "src/pages";

type Props = {
  tags: Pick<Tag, "id" | "name">[];
  content?: Omit<Contents, "createdAt" | "updatedAt">;
};

export const FormBody: FC<Props> = ({ tags, content }) => {
  const { pathname, push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const selectData = tags.map((tag) => ({ label: tag.name, value: tag.id }));

  const form = useForm({
    initialValues: {
      tagId: content ? content.tagId : "",
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

    [form, pathname]
  );

  return (
    <div className="min-h-[500px]  p-3 rounded-md ">
      <Title className="mb-3" order={3}>
        {formTitle}
      </Title>

      <form className="space-y-3" onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="タグ"
          placeholder="タグを選択"
          data={selectData}
          required
          {...form.getInputProps("tagId")}
        />

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
          loaderPosition="center"
          type="submit"
        >
          {buttonName}
        </Button>
      </form>
    </div>
  );
};
