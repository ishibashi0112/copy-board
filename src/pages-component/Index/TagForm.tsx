import { Button, Stack, TextInput } from "@mantine/core";
import React, { FC, useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { reavalidate, tagFetch } from "src/lib/fetcher";
import { notifications, showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { randomId } from "@mantine/hooks";
import { useTags } from "src/lib/hook/useTags";
import { Tag } from "src/type/types";

const schema = z.object({ name: z.string().min(1, "必ず入力してください。") });

export type CreateTagFormValues = z.infer<typeof schema>;

const createTag = async (
  currentTags: Tag[],
  values: CreateTagFormValues
): Promise<Tag[]> => {
  const id = randomId();
  notifications.show({
    id,
    loading: true,
    title: "Loading your data",
    message: "タグを作成中...",
    autoClose: false,
    withCloseButton: false,
  });
  const tag = await tagFetch("POST", values);
  await reavalidate("/");
  notifications.update({
    id,
    color: "green",
    title: "タグ作成が完了",
    message: "作成した新しいタグが反映されました。",
    icon: <IconCheck size={18} />,
  });

  return [...currentTags, tag];
};

export const TagForm: FC<{ close: () => void }> = ({ close }) => {
  const { tags, mutate } = useTags();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: typeof form.values): Promise<void> => {
    try {
      if (!tags) return;
      setIsLoading(true);

      mutate(createTag(tags, values), {
        optimisticData: [
          ...tags,
          { id: randomId(), name: values.name, contents: [] },
        ],
      });
      close();
    } catch (error) {
      console.error(error);
      showNotification({
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
        <TextInput label="タグネーム" {...form.getInputProps("name")} />

        <Button loaderPosition="center" loading={isLoading} type="submit">
          {isLoading ? "" : "作成する"}
        </Button>
      </Stack>
    </form>
  );
};
