import {
  UnstyledButton,
  Title,
  Card,
  Group,
  SimpleGrid,
  Menu,
  ScrollArea,
  Badge,
  Text,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import {
  CrossCircledIcon,
  DotsHorizontalIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { NextPage } from "next";
import Link from "next/link";
import { ReactNode, useCallback, useRef } from "react";
import { useDeleteModal } from "src/pages-component/Index/hook/useDeleteModal";
import { Contents } from "src/pages";

type Props = {
  contents: Contents[];
};

export const IndexBody: NextPage<Props> = ({ contents }) => {
  let clickTargetId = useRef<string>("");
  const Ref = useRef(null);
  const clipboard = useClipboard({ timeout: 800 });
  const { handleOpenModal, modalComponent } = useDeleteModal();

  const handleClickCopy = useCallback(
    (body: string, id: string) => {
      clickTargetId.current = id;
      clipboard.copy(body);
    },

    [clipboard]
  );

  return (
    <>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {contents.map((content) => (
          <Card
            className="relative transition hover:transition hover:bg-blue-200"
            p="md"
            radius="md"
            withBorder
            h={150}
            key={content.id}
          >
            <Card.Section inheritPadding py={3}>
              <Group position="apart">
                <Title order={5}>
                  {content.title ? content.title : "無題"}
                </Title>

                <Menu
                  withinPortal
                  position="bottom-end"
                  shadow="sm"
                  openDelay={100}
                >
                  <Menu.Target>
                    <DotsHorizontalIcon className="cursor-pointer" />
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
                      onClick={() => handleOpenModal(content)}
                    >
                      削除
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Card.Section>

            <UnstyledButton
              className="w-full "
              onClick={() => {
                handleClickCopy(content.body, content.id);
              }}
            >
              <Card.Section inheritPadding py={3}>
                <ScrollArea style={{ height: 110 }}>
                  <Text className="whitespace-pre-wrap">{content.body}</Text>
                  {/* <div
                    ref={Ref}
                    dangerouslySetInnerHTML={{
                      __html: content.body,
                    }}
                  /> */}
                </ScrollArea>
              </Card.Section>
            </UnstyledButton>

            {clipboard.copied && content.id === clickTargetId.current ? (
              <Badge
                className="absolute top-1/2 left-1/2"
                style={{ transform: "translate(-50%, -50%)" }}
                color="green"
                variant="filled"
                size="lg"
              >
                ✓Copyed!
              </Badge>
            ) : null}
          </Card>
        ))}
      </SimpleGrid>

      {modalComponent}
    </>
  );
};
