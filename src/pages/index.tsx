import {
  Text,
  UnstyledButton,
  Button,
  Container,
  Title,
  Card,
  Group,
  SimpleGrid,
  Menu,
  ScrollArea,
  Tooltip,
  Flex,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { PrismaClient } from "@prisma/client";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  DotsHorizontalIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useCallback, useRef } from "react";
import { useModal } from "src/hooks/useModal";

export type Contents = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  body: string;
};

type Props = {
  contents: Contents[];
};

export const getStaticProps = async () => {
  const prisma = new PrismaClient();
  const contents = await prisma.contents.findMany({
    orderBy: { updatedAt: "asc" },
  });
  const dateToStringContens = contents.map((content) => {
    return {
      ...content,
      createdAt: dayjs(content.createdAt).format("YYYY/MM/DD"),
      updatedAt: dayjs(content.updatedAt).format("YYYY/MM/DD"),
    };
  });

  return {
    props: { contents: [...dateToStringContens] },
  };
};

const Home: NextPage<Props> = ({ contents }) => {
  const clipboard = useClipboard({ timeout: 800 });
  let clickTargetId = useRef<string>("");

  const { handleOpenModal, modalComponent } = useModal();

  const handleClickCopy = useCallback(
    (body: string, id: string) => {
      clickTargetId.current = id;
      clipboard.copy(body);
    },
    [clipboard]
  );

  return (
    <div className="h-screen">
      <Container size="lg">
        <header className="flex justify-between items-center h-12 px-5 mb-3">
          <Title order={3}>copy board</Title>
          <Button onClick={() => handleOpenModal("POST")}>追加</Button>
        </header>

        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          {contents.map((content) => (
            <Tooltip
              label={
                <Flex
                  gap={1}
                  justify="flex-start"
                  align="center"
                  direction="row"
                  wrap="wrap"
                >
                  <CheckCircledIcon />
                  <Text>Copyed!</Text>
                </Flex>
              }
              opened={clipboard.copied && content.id === clickTargetId.current}
              key={content.id}
              withArrow
            >
              <UnstyledButton
                className="z-0"
                onClick={() => {
                  handleClickCopy(content.body, content.id);
                }}
              >
                <Card
                  className=" transition hover:bg-gray-100 hover:transition "
                  shadow="sm"
                  p="md"
                  radius="md"
                  withBorder
                  h={150}
                >
                  <Card.Section withBorder inheritPadding py={3}>
                    <Group position="apart">
                      <Title order={5}>
                        {content.title ? content.title : "無題"}
                      </Title>
                      <Menu
                        withinPortal
                        position="bottom-end"
                        shadow="sm"
                        trigger="hover"
                        openDelay={100}
                      >
                        <Menu.Target>
                          <DotsHorizontalIcon />
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item
                            icon={<Pencil2Icon />}
                            onClick={() => handleOpenModal("PUT", content)}
                          >
                            編集
                          </Menu.Item>
                          <Menu.Item
                            icon={<CrossCircledIcon />}
                            color="red"
                            onClick={() => handleOpenModal("DELETE", content)}
                          >
                            削除
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Card.Section>
                  <Card.Section withBorder inheritPadding py={3}>
                    <ScrollArea style={{ height: 110 }}>
                      <Text className="whitespace-pre-wrap" fz="sm">
                        {content.body}
                      </Text>
                    </ScrollArea>
                  </Card.Section>
                </Card>
              </UnstyledButton>
            </Tooltip>
          ))}
        </SimpleGrid>
      </Container>

      {modalComponent}
    </div>
  );
};

export default Home;
