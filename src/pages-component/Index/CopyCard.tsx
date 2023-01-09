import {
  UnstyledButton,
  Title,
  Group,
  Menu,
  ScrollArea,
  Badge,
  Text,
  Transition,
  ActionIcon,
  Popover,
  Textarea,
  Card,
} from "@mantine/core";
import { useClipboard, useMediaQuery } from "@mantine/hooks";
import {
  CrossCircledIcon,
  DotsHorizontalIcon,
  OpenInNewWindowIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { FC, useState } from "react";
import { useDarkMode } from "src/lib/hook/useDarkMode";
import { Contents } from "src/pages";

type Props = {
  content: Contents;
  openModal: (content: Contents) => void;
};

export const CopyCard: FC<Props> = ({ content, openModal }) => {
  const { copy, copied } = useClipboard({ timeout: 800 });

  const { isDark } = useDarkMode();
  const mediaQuery = useMediaQuery("(max-width: 600px)");

  if (mediaQuery) {
    return (
      <Card
        className={`
          ${copied ? "border-blue-600" : ""}
          ${isDark ? "hover:bg-zinc-700" : "hover:bg-blue-50 hover:shadow-sm"}
           p-3 overflow-visible  transition  hover:transition `}
        radius="sm"
        withBorder
        key={content.id}
      >
        <Group position="apart">
          <div
            className="flex-1 cursor-pointer"
            onClick={() => copy(content.body)}
          >
            <Title order={5}>{content.title}</Title>
          </div>

          <Group spacing={1}>
            <FullTextButton content={content} />

            <Menus content={content} openModal={openModal} />
          </Group>
        </Group>

        <CopyedBadge copied={copied} />
      </Card>
    );
  }

  return (
    <Card
      className={`
          ${copied ? "border-blue-600" : ""}
          ${isDark ? "hover:bg-zinc-700" : "hover:bg-blue-50 hover:shadow-sm"}
           p-3 overflow-visible  transition  hover:transition `}
      radius="sm"
      withBorder
      key={content.id}
    >
      <Group position="apart">
        <Title order={5}>{content.title}</Title>

        <Group spacing={1}>
          <FullTextButton content={content} />
          <Menus content={content} openModal={openModal} />
        </Group>
      </Group>

      <UnstyledButton
        className="block w-full"
        onClick={() => copy(content.body)}
      >
        <ScrollArea className="pt-2" style={{ height: 110 }}>
          <Text className="whitespace-pre-wrap">{content.body}</Text>
        </ScrollArea>
      </UnstyledButton>

      <CopyedBadge copied={copied} />
    </Card>
  );
};

const FullTextButton: FC<Pick<Props, "content">> = ({ content }) => {
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
        <Textarea
          classNames={{ input: "min-h-[300px]" }}
          autosize
          variant="filled"
          defaultValue={content.body}
          readOnly
        />
      </Popover.Dropdown>
    </Popover>
  );
};

const Menus: FC<Props> = ({ content, openModal }) => {
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
          onClick={() => openModal(content)}
        >
          削除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const CopyedBadge: FC<{ copied: boolean }> = ({ copied }) => {
  return (
    <Transition
      mounted={copied}
      transition="fade"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <div style={styles}>
          <Badge
            className="absolute top-1/2 left-1/2"
            style={{ transform: "translate(-50%, -50%)" }}
            color="green"
            variant="filled"
            size="lg"
          >
            ✓Copyed!
          </Badge>
        </div>
      )}
    </Transition>
  );
};
