import { Alert, Anchor, Tabs, Text } from "@mantine/core";
import React, { FC, useState } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useDarkMode } from "src/lib/hook/useDarkMode";
import { IconAlertCircle } from "@tabler/icons-react";
import { TabsList } from "./TabsList";
import { TabsPanels } from "./TabsPanels";
import Link from "next/link";
import { useTags } from "src/lib/hook/useTags";

export const IndexBody: FC = () => {
  const { isDark } = useDarkMode();
  const { tags } = useTags();

  const [activeTab, setActiveTab] = useState<string | null>(
    tags && tags[0] ? tags[0].id : ""
  );

  if (!tags || !tags.length) {
    return (
      <>
        <Alert
          classNames={{ root: "my-3 py-2 -z-10", body: "flex items-center" }}
          icon={<IconAlertCircle size={16} />}
          color="gray"
        >
          <Text fz="xs">
            更新が反映されない場合は、タイトルをクリックしてください。
          </Text>
        </Alert>
        <Alert
          className="overflow-visible "
          icon={<InfoCircledIcon />}
          color="gray"
        >
          <Text>
            タグが1つもありません。
            <Anchor component={Link} href="/form">
              最初のタグを作成
            </Anchor>
          </Text>
        </Alert>
      </>
    );
  }

  return (
    <div className="py-3">
      <Alert
        classNames={{ root: "my-3 py-2 -z-10", body: "flex items-center" }}
        icon={<IconAlertCircle size={16} />}
        color="gray"
      >
        <Text fz="xs">
          更新が反映されない場合は、タイトルをクリックしてください。
        </Text>
      </Alert>

      <Tabs
        variant="pills"
        color={isDark ? "gray" : "blue"}
        value={activeTab}
        onTabChange={setActiveTab}
      >
        <TabsList />

        <TabsPanels />
      </Tabs>
    </div>
  );
};
