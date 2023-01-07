import {
  Alert,
  Anchor,
  Avatar,
  Button,
  Group,
  Indicator,
  Popover,
  SimpleGrid,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import { useDeleteModal } from "src/pages-component/Index/hook/useDeleteModal";
import { Tag } from "src/pages";
import { CopyCard } from "./CopyCard";
import { FC, ReactNode, useCallback, useState } from "react";
import { InfoCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { useForm } from "@mantine/form";
import { reavalidate, tagFetch } from "src/lib/fetcher";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

type Props = {
  tags: Tag[];
};

export const IndexBody: FC<Props> = ({ tags }) => {
  const { openModal, modalComponent } = useDeleteModal();

  if (!tags.length) {
    return (
      <Alert className="overflow-visible " icon={<InfoCircledIcon />}>
        <Text>
          タグが1つもありません。
          <CreateTagFormPop
            targetComponent={
              <Anchor component="button" type="button">
                最初のタグを作成
              </Anchor>
            }
          />
        </Text>
      </Alert>
    );
  }

  return (
    <>
      <Tabs>
        <Tabs.List className="flex justify-between">
          <div className="flex">
            {tags.map((tag) => (
              <Tabs.Tab className="flex" key={tag.id} value={tag.id}>
                <Group align="center">
                  <Text>{tag.name}</Text>
                  {tag.contents.length ? (
                    <Avatar size={19} radius="xl" color="blue" variant="filled">
                      {tag.contents.length}
                    </Avatar>
                  ) : null}
                </Group>
              </Tabs.Tab>
            ))}
          </div>

          <Group position="right">
            <CreateTagFormPop
              targetComponent={
                <Button
                  className="active:translate-y-0"
                  classNames={{ leftIcon: "mr-1" }}
                  size="xs"
                  variant="subtle"
                  leftIcon={<PlusIcon />}
                >
                  タブ追加
                </Button>
              }
            />
          </Group>
        </Tabs.List>
        {tags.map((tag) => (
          <Tabs.Panel key={tag.id} value={tag.id} pt="xs">
            {tag.contents.length ? (
              <SimpleGrid
                cols={3}
                breakpoints={[
                  { maxWidth: 980, cols: 3, spacing: "md" },
                  { maxWidth: 755, cols: 2, spacing: "sm" },
                  { maxWidth: 600, cols: 1, spacing: "sm" },
                ]}
              >
                {tag.contents.map((content) => (
                  <CopyCard
                    key={content.id}
                    content={content}
                    openModal={openModal}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Alert className="mt-5" icon={<InfoCircledIcon />}>
                <Text>コンテンツが1つもありません。</Text>
              </Alert>
            )}
          </Tabs.Panel>
        ))}
      </Tabs>

      {modalComponent}
    </>
  );
};

const CreateTagFormPop: FC<{ targetComponent: ReactNode }> = ({
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
    <Popover
      zIndex={9999}
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
          <Button type="submit" size="xs" loading={isLoading}>
            作成
          </Button>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
};
