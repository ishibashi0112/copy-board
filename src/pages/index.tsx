import {
  Stack,
  Text,
  UnstyledButton,
  Button,
  Container,
  Title,
  Modal,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useClipboard } from "@mantine/hooks";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NextPage } from "next";
import { MouseEventHandler, useState } from "react";

type Contents = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  body: string;
};

type Props = {
  contents: Contents[];
};

type formValues = {
  title: string;
  body: string;
};

export const getStaticProps = async () => {
  const prisma = new PrismaClient();
  const contents = await prisma.contents.findMany();
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
  const [opened, setOpened] = useState(false);
  const clipboard = useClipboard({ timeout: 500 });
  const handleClickCopy: MouseEventHandler<HTMLButtonElement> = (event) => {
    clipboard.copy(event.currentTarget.dataset.contentText);
  };

  const form = useForm<formValues>({
    initialValues: {
      title: "",
      body: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const createContent = async (values: formValues): Promise<void> => {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log(res);

    if (!res.ok) {
      throw new Error("作成が失敗しました。");
    }

    const json = res.json();

    return json;
  };

  const handleSubmit = async (values: formValues): Promise<void> => {
    try {
      setIsLoading(true);
      await createContent(values);
      alert("作成しました。");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Container size="lg">
        <header className="flex justify-between items-center h-12 px-5 mb-3">
          <Title order={3}>copy board</Title>
          <Button onClick={() => setOpened((o) => !o)}>追加</Button>
        </header>
        <Stack>
          {contents.map((content) => (
            <UnstyledButton
              className=" bg-gray-200  p-2  rounded-sm transition hover:transition hover:bg-gray-300 active:bg-blue-100"
              key={content.id}
              onClick={handleClickCopy}
              data-content-text={content.body}
            >
              <Text>{content.title ? content.title : "無題"}</Text>
              <Text>{content.body}</Text>
            </UnstyledButton>
          ))}
        </Stack>
      </Container>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <form className="space-y-3" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput label="title" {...form.getInputProps("title")} />
          <Textarea label="body" autosize {...form.getInputProps("body")} />
          <Button className="w-full" type="submit" loading={isLoading}>
            作成
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Home;
