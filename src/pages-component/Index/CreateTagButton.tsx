import { ActionIcon, Button, Modal, Tooltip } from "@mantine/core";
import React, { FC } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconCirclePlus } from "@tabler/icons-react";
import { TagForm } from "./TagForm";

export const CreateTagButton: FC = () => {
  const mediaQuery = useMediaQuery("(min-width: 600px)");

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      {mediaQuery ? (
        <Button
          className="active:translate-y-0"
          size="xs"
          variant="subtle"
          leftIcon={<IconCirclePlus size={18} />}
          onClick={open}
        >
          タブを作成
        </Button>
      ) : (
        <Tooltip label="タブを作成" openDelay={200}>
          <ActionIcon
            className="active:translate-y-0"
            color="blue"
            size="xl"
            onClick={open}
          >
            <IconCirclePlus size={25} />
          </ActionIcon>
        </Tooltip>
      )}

      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <TagForm close={close} />
      </Modal>
    </div>
  );
};
