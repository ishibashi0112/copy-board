import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { reavalidate, tagFetch } from "src/lib/fetcher";

export const TagForm: FC = () => {
  const { pathname, push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
    },
  });

  const handleSubmit = useCallback(
    async (values: typeof form.values): Promise<void> => {
      try {
        setIsLoading(true);

        await tagFetch("POST", values);
        await reavalidate("/");
        await reavalidate("/form");
        await push("/");
        showNotification({
          title: `タグ作成`,
          message: `作成が完了しました。`,
          color: "green",
          icon: <IconCheck size={18} />,
        });
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
    },

    [form, pathname]
  );

  return (
    <form className="space-y-3" onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="タグネーム" required {...form.getInputProps("name")} />

      <Button
        className="block w-24 ml-auto"
        loading={isLoading}
        loaderPosition="center"
        type="submit"
      >
        作成する
      </Button>
    </form>
  );
};
