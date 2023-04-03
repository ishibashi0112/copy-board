import { Menu, ActionIcon } from "@mantine/core";
import {
  CrossCircledIcon,
  DotsHorizontalIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { FC } from "react";
import { Contents } from "src/type/types";

type Props = {
  content: Contents;
};

export const Menus: FC<Props> = ({ content }) => {
  return (
    <Menu withinPortal position="bottom-end" shadow="sm" openDelay={100}>
      <Menu.Target>
        <ActionIcon className="active:translate-y-0">
          <DotsHorizontalIcon />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<Pencil2Icon />}
          component={Link}
          href={`/form/${content.id}`}
        >
          編集
        </Menu.Item>
        <Menu.Item
          icon={<CrossCircledIcon />}
          color="red"
          // onClick={() => openModal(content)}
        >
          削除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
