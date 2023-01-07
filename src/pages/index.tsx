import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NextPage } from "next";
import { IndexBody } from "src/pages-component/Index/IndexBody";
import { Layout } from "src/pages-Layout/Layout";

export type Contents = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  body: string;
  tagId: string;
};

export type Tag = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  contents: Contents[];
};

type Props = {
  tags: Tag[];
};

export const getStaticProps = async () => {
  const prisma = new PrismaClient();

  const tags = await prisma.tags.findMany({
    orderBy: { updatedAt: "asc" },
    include: { contents: true },
  });

  const dateToStringTags = tags.map((tag) => {
    const dateToStringContents = tag.contents.map((content) => ({
      ...content,
      createdAt: dayjs(content.createdAt).format("YYYY/MM/DD"),
      updatedAt: dayjs(content.updatedAt).format("YYYY/MM/DD"),
    }));

    return {
      ...tag,
      createdAt: dayjs(tag.createdAt).format("YYYY/MM/DD"),
      updatedAt: dayjs(tag.updatedAt).format("YYYY/MM/DD"),
      contents: dateToStringContents,
    };
  });

  return {
    props: { tags: [...dateToStringTags] },
  };
};

const Home: NextPage<Props> = ({ tags }) => {
  return (
    <Layout>
      <IndexBody tags={tags} />
    </Layout>
  );
};

export default Home;
