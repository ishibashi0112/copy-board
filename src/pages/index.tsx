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
};

type Props = {
  contents: Contents[];
};

export const getStaticProps = async () => {
  const prisma = new PrismaClient();
  const contents = await prisma.contents.findMany({
    orderBy: { updatedAt: "asc" },
  });
  const dateToStringContents = contents.map((content) => {
    return {
      ...content,
      createdAt: dayjs(content.createdAt).format("YYYY/MM/DD"),
      updatedAt: dayjs(content.updatedAt).format("YYYY/MM/DD"),
    };
  });

  return {
    props: { contents: [...dateToStringContents] },
  };
};

const Home: NextPage<Props> = ({ contents }) => {
  return (
    <Layout>
      <IndexBody contents={contents} />
    </Layout>
  );
};

export default Home;
