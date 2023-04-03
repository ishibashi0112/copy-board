import { Card, NavLink, Stack, Text } from "@mantine/core";
import { Tag } from "src/type/types";
import React, { FC } from "react";
import { CrossCircledIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { CreateTagFormPop } from "src/pages-component/Index/CreateTagFormPop";
import { useDeleteModal } from "../useDeleteModal";

type Props = {
  tagData: Tag | null;
};

export const TagCtxMenuBody: FC<Props> = ({ tagData }) => {
  const { openModal, modalComponent } = useDeleteModal();

  if (!tagData) return <></>;

  return (
    <div>
      <Card className="overflow-visible" withBorder shadow="sm" p={4}>
        <Text className="px-3 py-1" fz={1}>
          {tagData.name}
        </Text>

        <Stack spacing={1}>
          <CreateTagFormPop
            targetElement={
              <NavLink
                label="編集"
                variant="subtle"
                component="button"
                icon={<Pencil2Icon />}
              />
            }
            tag={tagData}
          />
          <NavLink
            label="削除"
            color="red"
            variant="subtle"
            icon={<CrossCircledIcon />}
            active
            component="button"
            onClick={() => openModal(tagData)}
          />
        </Stack>
      </Card>

      {modalComponent}
    </div>
  );
};
