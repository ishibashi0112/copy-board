import { Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { FC } from "react";
import { ContentForm } from "./ContentForm";

type Props = {
  variant: "button" | "card";
  tagId: string;
};

export const AddContent: FC<Props> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      {props.variant === "button" ? (
        <Button variant="outline" onClick={open}>
          コンテンツを作成
        </Button>
      ) : (
        <Button className="h-full" fullWidth variant="outline" onClick={open}>
          <Group>
            <IconPlus />
            <Text>コンテンツを作成</Text>
          </Group>
        </Button>
      )}
      <Modal title="" opened={opened} onClose={close}>
        <ContentForm close={close} tagId={props.tagId} />
      </Modal>
    </div>
  );
};
