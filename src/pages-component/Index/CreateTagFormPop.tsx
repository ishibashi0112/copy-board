import { Button, Popover, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { FC, ReactNode, useCallback, useState } from "react";
import { reavalidate, tagFetch } from "src/lib/fetcher";

export const CreateTagFormPop: FC<{ targetComponent: ReactNode }> = ({
  targetComponent,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const form = useForm({ initialValues: { name: "" } });

  const handleSubmit = useCallback(
    async (values: typeof form.values): Promise<void> => {
      try {
        setIsLoading(true);

        await tagFetch("POST", values);
        await reavalidate();
        await push("/");
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
    []
  );

  return (
    <Popover position="bottom-end" trapFocus closeOnClickOutside={!isLoading}>
      <Popover.Target>{targetComponent}</Popover.Target>
      <Popover.Dropdown>
        <form className="flex space-x-3" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            placeholder="タグの名前"
            size="xs"
            required
            {...form.getInputProps("name")}
          />
          <Button type="submit" size="xs" loading={isLoading}>
            作成
          </Button>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
};
