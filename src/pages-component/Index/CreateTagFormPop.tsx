import { Button, Popover, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { cloneElement, FC, ReactElement, useCallback, useState } from "react";
import { reavalidate, tagFetch } from "src/lib/fetcher";
import { Tag } from "src/type/types";
import { IconCheck, IconX } from "@tabler/icons";

type Props = {
  targetElement: ReactElement;
  tag?: Tag;
};

export const CreateTagFormPop: FC<Props> = ({ targetElement, tag }) => {
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const form = useForm({ initialValues: { name: tag ? tag.name : "" } });

  const text = tag ? "編集" : "作成";
  const id = tag ? tag.id : null;
  const method = tag ? "PUT" : "POST";

  const handleSubmit = useCallback(
    async (values: typeof form.values): Promise<void> => {
      try {
        setIsLoading(true);

        await tagFetch(method, values, id);
        await reavalidate();
        await push("/");
        setOpened(false);
        showNotification({
          title: `タグ${text}`,
          message: `${text}が完了しました。`,
          color: "green",
          icon: <IconCheck size={18} />,
        });
      } catch (error) {
        console.error(error);
        showNotification({
          title: `タグ${text}`,
          message: "失敗しました。",
          color: "red",
          icon: <IconX size={18} />,
        });
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const targetComponent = cloneElement(targetElement, {
    onClick: () => {
      setOpened((o) => !o);
    },
  });

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom-end"
      trapFocus
      closeOnClickOutside={!isLoading}
    >
      <Popover.Target>{targetComponent}</Popover.Target>
      <Popover.Dropdown>
        <form className="flex space-x-3" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            placeholder="タグの名前"
            size="xs"
            required
            {...form.getInputProps("name")}
          />
          <Button
            type="submit"
            size="xs"
            loaderPosition="center"
            loading={isLoading}
          >
            {text}
          </Button>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
};
