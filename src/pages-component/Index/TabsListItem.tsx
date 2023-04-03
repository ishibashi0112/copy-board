import { Avatar, Tabs, Text } from "@mantine/core";
import { Tag } from "src/type/types";
import React, { FC } from "react";
import { useDarkMode } from "src/lib/hook/useDarkMode";
import { useContextMenu } from "./hook/ContextMenu/useContextMenu";
import { ContextMenu } from "./hook/ContextMenu/ContextMenu";
import { TagCtxMenuBody } from "./hook/ContextMenu/TagCtxMenuBody";

type Props = {
  tag: Tag;
};

export const TabsListItem: FC<Props> = ({ tag }) => {
  const { isDark } = useDarkMode();
  const {
    ref,
    data: tagData,
    contextMenuProps,
    handleContextMenu,
  } = useContextMenu<Tag>();

  return (
    <div key={tag.id}>
      <Tabs.Tab
        className="flex"
        key={tag.id}
        value={tag.id}
        rightSection={
          tag.contents?.length ? (
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

      <ContextMenu ref={ref} {...contextMenuProps}>
        <TagCtxMenuBody tagData={tagData} />
      </ContextMenu>
    </div>
  );
};
