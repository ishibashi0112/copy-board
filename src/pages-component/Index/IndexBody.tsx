import { Alert, Anchor, Tabs, Text } from "@mantine/core";
import { useDeleteModal } from "src/pages-component/Index/hook/useDeleteModal";
import { Tag } from "src/type/types";
import React, { FC, useState } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useDarkMode } from "src/lib/hook/useDarkMode";
import { CreateTagFormPop } from "./CreateTagFormPop";
import { IconAlertCircle } from "@tabler/icons";
import { TabsList } from "./TabsList";
import { TabsPanels } from "./TabsPanels";

type Props = {
  tags: Tag[];
};

export const IndexBody: FC<Props> = ({ tags }) => {
  const { isDark } = useDarkMode();

  const [activeTab, setActiveTab] = useState<string | null>(tags[0].id);
  const { openModal, modalComponent } = useDeleteModal();

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
            targetElement={
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
        <TabsList tags={tags} />

        <TabsPanels tags={tags} openModal={openModal} />
      </Tabs>

      {modalComponent}
    </div>
  );
};
