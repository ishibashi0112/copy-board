import { Button, Card, Modal, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { FC } from "react";
import { useDarkMode } from "src/lib/hook/useDarkMode";

export const AddContent: FC = () => {
  const { isDark } = useDarkMode();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Button variant="outline" fullWidth>
        コンテンツを作成
      </Button>

      <Modal opened={opened} onClose={close}></Modal>
    </div>
  );
};
