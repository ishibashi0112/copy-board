import { Tabs } from "@mantine/core";
import React, { FC } from "react";

import { TabsListItem } from "./TabsListItem";
import { useTags } from "src/lib/hook/useTags";
import { CreateTagButton } from "./CreateTagButton";

export const TabsList: FC = () => {
  const { tags } = useTags();

  if (!tags) {
    return <></>;
  }

  return (
    <Tabs.List className="flex justify-between items-center">
      <div className="flex flex-1 overflow-x-auto ">
        {tags.map((tag) => (
          <TabsListItem key={tag.id} tag={tag} />
        ))}
      </div>

      <CreateTagButton />
    </Tabs.List>
  );
};
