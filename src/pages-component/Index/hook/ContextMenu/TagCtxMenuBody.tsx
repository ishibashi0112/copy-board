import { Card, NavLink, Stack, Text } from "@mantine/core";
import { Tag } from "src/type/types";
import React, { FC } from "react";
import { CrossCircledIcon, Pencil2Icon } from "@radix-ui/react-icons";

type Props = {
  tagData: Tag | null;
};

export const TagCtxMenuBody: FC<Props> = ({ tagData }) => {
  if (!tagData) return <></>;

  return (
    <Card withBorder shadow="sm" p={4}>
      <Text className="px-3 py-1" fz={1}>
        {tagData.name}
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
  );
};
