import { ActionIcon, Popover } from "@mantine/core";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { FC, useState } from "react";

import { Contents } from "src/type/types";
import { OpenModalHandler } from "./hook/useDeleteModal";

type Props = {
  content: Contents;
  openModal: OpenModalHandler;
};

export const FullTextButton: FC<Pick<Props, "content">> = ({ content }) => {
  const [opened, setOpened] = useState(false);

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom"
      withArrow
      width={500}
    >
      <Popover.Target>
        <ActionIcon
          className="active:translate-y-0"
          onClick={() => setOpened((o) => !o)}
        >
          <OpenInNewWindowIcon />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <div
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: content.body }}
        />
      </Popover.Dropdown>
    </Popover>
  );
};
