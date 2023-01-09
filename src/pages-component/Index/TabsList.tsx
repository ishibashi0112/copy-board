import {
  ActionIcon,
  Button,
  Group,
  Menu,
  ScrollArea,
  Tabs,
  Text,
} from "@mantine/core";
import { Tag } from "src/type/types";
import React, { FC } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import { useContextMenu } from "./hook/ContextMenu/useContextMenu";
import { ContextMenu } from "./hook/ContextMenu/ContextMenu";
import { CreateTagFormPop } from "./CreateTagFormPop";
import { IconMenu } from "@tabler/icons";
import { TagCtxMenuBody } from "./hook/ContextMenu/TagCtxMenuBody";
import { TabsListItem } from "./TabsListItem";
import { OpenModalHandler } from "./hook/useDeleteModal";

type Props = {
  tags: Tag[];
  openModal: OpenModalHandler;
};

export const TabsList: FC<Props> = ({ tags, openModal }) => {
  const mediaQuery = useMediaQuery("(min-width: 600px)");

  const {
    ref,
    data: tagData,
    contextMenuProps,
    handleContextMenu,
  } = useContextMenu<Tag>();

  return (
    <div>
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
              <TabsListItem
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
                targetElement={
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
                  <CreateTagFormPop targetElement={<Text> タブを作成</Text>} />
                </Menu.Item>
                <Menu.Item component={Link} href="/form" icon={<PlusIcon />}>
                  <Text> コンテンツを作成</Text>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Tabs.List>

      <ContextMenu ref={ref} {...contextMenuProps}>
        <TagCtxMenuBody tagData={tagData} openModal={openModal} />
      </ContextMenu>
    </div>
  );
};
