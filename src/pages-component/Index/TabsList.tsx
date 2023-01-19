import {
  ActionIcon,
  Button,
  Group,
  ScrollArea,
  Tabs,
  Tooltip,
} from "@mantine/core";
import { Tag } from "src/type/types";
import React, { FC } from "react";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import { useContextMenu } from "./hook/ContextMenu/useContextMenu";
import { ContextMenu } from "./hook/ContextMenu/ContextMenu";
import { IconCirclePlus, IconMenu } from "@tabler/icons";
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
              <Button
                className="active:translate-y-0"
                size="xs"
                variant="subtle"
                component={Link}
                leftIcon={<IconCirclePlus size={18} />}
                href="/form"
              >
                コンテンツ・タブを作成
              </Button>
            </>
          ) : (
            <Tooltip label="コンテンツ・タブを作成" openDelay={500}>
              <ActionIcon
                className="active:translate-y-0"
                color="blue"
                size="xl"
                component={Link}
                href="/form"
              >
                <IconCirclePlus size={25} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      </Tabs.List>

      <ContextMenu ref={ref} {...contextMenuProps}>
        <TagCtxMenuBody tagData={tagData} openModal={openModal} />
      </ContextMenu>
    </div>
  );
};
