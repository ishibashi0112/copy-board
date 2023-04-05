import { Button, Stack, Text, TextInput } from "@mantine/core";
import React, { FC, useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { contentFetch, reavalidate, tagFetch } from "src/lib/fetcher";
import { notifications, showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { randomId } from "@mantine/hooks";
import { Contents, Tag } from "src/type/types";

import { Editor } from "./Editor";
import { useRouter } from "next/router";

const transformEditorHtml = (html: string): string => {
  const pToBr = html.replaceAll("<p></p>", "<br/>");
  return pToBr;
};

const formSchema = z.object({
  title: z.string().min(1, "必ず入力してください。"),
});

const RequestBodySchema = formSchema.merge(
  z.object({
    body: z.string().min(1, "必ず入力してください。"),
    tagId: z.string().min(1, "tagId情報が取得できていません。"),
  })
);

export type CreateContentFormValues = z.infer<typeof RequestBodySchema>;

type Props = {
  tagId: string;
  close: () => void;
  content?: Contents;
};

export const ContentForm: FC<Props> = (props) => {
  const { pathname } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [body, setBody] = useState(props.content ? props.content.body : "");

  const form = useForm({
    initialValues: {
      title: props.content ? props.content.title : "",
      body,
      tagId: props.tagId,
    },
    validate: zodResolver(formSchema),
  });

  const notificationsText = pathname === "/form" ? "作成" : "編集";
  const buttonName = pathname === "/form" ? "作成する" : "保存する";
  const id = props.content ? props.content.id : null;
  const method = pathname === "/form" ? "POST" : "PUT";

  const handleSubmit = async (values: typeof form.values): Promise<void> => {
    try {
      setIsLoading(true);

      const bodyData = transformEditorHtml(body);
      const data = { ...values, body: bodyData };

      const parsed = RequestBodySchema.parse(data);

      await contentFetch(method, parsed, id);
      await reavalidate("/");

      props.close();

      notifications.show({
        color: "green",
        title: "タグ作成が完了",
        message: "作成した新しいタグが反映されました。",
        icon: <IconCheck size={18} />,
      });
    } catch (error) {
      console.error(error);
      notifications.show({
        title: `タグ作成`,
        message: "失敗しました。",
        color: "red",
        icon: <IconX size={18} />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput placeholder="タイトル" {...form.getInputProps("title")} />

        <Editor content={props.content} setBody={setBody} />

        <Button type="submit" loaderPosition="center" loading={isLoading}>
          {isLoading ? "" : "作成"}
        </Button>
      </Stack>
    </form>
  );
};
