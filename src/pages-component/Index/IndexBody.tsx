import {
  ActionIcon,
  Alert,
  Anchor,
  Avatar,
  Button,
  Card,
  CardSection,
  Group,
  Menu,
  NavLink,
  ScrollArea,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { useDeleteModal } from "src/pages-component/Index/hook/useDeleteModal";
import { Tag } from "src/pages";
import { CopyCard } from "./CopyCard";
import React, { FC, useState } from "react";
import {
  CrossCircledIcon,
  DropdownMenuIcon,
  InfoCircledIcon,
  Pencil2Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useDarkMode } from "src/lib/hook/useDarkMode";
import { useMediaQuery } from "@mantine/hooks";
import {
  ContextMenuHandler,
  useContextMenu,
} from "./hook/ContextMenu/useContextMenu";
import { ContextMenu } from "./hook/ContextMenu/ContextMenu";
import { CreateTagFormPop } from "./CreateTagFormPop";
import { IconMenu } from "@tabler/icons";

type Props = {
  tags: Tag[];
};

export const IndexBody: FC<Props> = ({ tags }) => {
  const { isDark } = useDarkMode();
  const mediaQuery = useMediaQuery("(min-width: 600px)");
  const [activeTab, setActiveTab] = useState<string | null>(tags[0].id);
  const { openModal, modalComponent } = useDeleteModal();
  const { ref, data, contextMenuProps, handleContextMenu } =
    useContextMenu<Tag>();

  if (!tags.length) {
    return (
      <Alert
        className="overflow-visible "
        icon={<InfoCircledIcon />}
        color="gray"
      >
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
      <Tabs
        variant="pills"
        color={isDark ? "gray" : "blue"}
        value={activeTab}
        onTabChange={setActiveTab}
      >
        <Tabs.List className="flex justify-between w-full">
          <ScrollArea
            className={
              mediaQuery ? "w-[calc(100%-230px)]" : "w-[calc(100%-80px)]"
            }
            scrollbarSize={4}
            offsetScrollbars
          >
            <div className="flex">
              {tags.map((tag) => (
                <TagListItem
                  key={tag.id}
                  tag={tag}
                  handleContextMenu={handleContextMenu}
                />
              ))}
            </div>
          </ScrollArea>

          <Group
            className={mediaQuery ? "w-56" : "w-16"}
            position="right"
            spacing={1}
          >
            {mediaQuery ? (
              <>
                <CreateTagFormPop
                  targetComponent={
                    <Button
                      className="active:translate-y-0"
                      classNames={{ leftIcon: "mr-1" }}
                      size="xs"
                      variant="subtle"
                    >
                      タブを作成
                    </Button>
                  }
                />

                <Button
                  className="active:translate-y-0"
                  size="xs"
                  variant="subtle"
                  component={Link}
                  href="/form"
                >
                  コンテンツを作成
                </Button>
              </>
            ) : (
              <Menu position="left-start">
                <Menu.Target>
                  <ActionIcon
                    className="active:translate-y-0"
                    color="blue"
                    size="lg"
                  >
                    <IconMenu />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item closeMenuOnClick={false} icon={<PlusIcon />}>
                    <CreateTagFormPop
                      targetComponent={<Text> タブを作成</Text>}
                    />
                  </Menu.Item>
                  <Menu.Item component={Link} href="/form" icon={<PlusIcon />}>
                    <Text> コンテンツを作成</Text>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
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
              <Alert className="mt-5" icon={<InfoCircledIcon />} color="gray">
                <Text>コンテンツが1つもありません。</Text>
              </Alert>
            )}
          </Tabs.Panel>
        ))}
      </Tabs>

      <ContextMenu ref={ref} {...contextMenuProps}>
        {data ? (
          <Card withBorder shadow="sm" p={4}>
            <Text className="px-3 py-1" fz={1}>
              {data.name}
            </Text>

            <Stack spacing={1}>
              <NavLink label="編集" variant="subtle" icon={<Pencil2Icon />} />
              <NavLink
                label="削除"
                variant="subtle"
                color="red"
                active
                icon={<CrossCircledIcon />}
              />
            </Stack>
          </Card>
        ) : (
          <></>
        )}
      </ContextMenu>

      {modalComponent}
    </>
  );
};

const TagListItem: FC<{
  tag: Tag;
  handleContextMenu: ContextMenuHandler<Tag>;
}> = ({ tag, handleContextMenu }) => {
  const { isDark } = useDarkMode();

  return (
    <div key={tag.id}>
      <Tabs.Tab
        className="flex"
        key={tag.id}
        value={tag.id}
        rightSection={
          tag.contents.length ? (
            <Avatar
              className="bg-opacity-20"
              size={19}
              radius="xl"
              color="blue"
              variant={isDark ? "filled" : "light"}
            >
              {tag.contents.length}
            </Avatar>
          ) : null
        }
        onContextMenu={(e) => handleContextMenu(e, tag)}
      >
        <Text>{tag.name}</Text>
      </Tabs.Tab>
    </div>
  );
};
