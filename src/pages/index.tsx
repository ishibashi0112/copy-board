import { PrismaClient } from "@prisma/client";
import { NextPage } from "next";
import { IndexBody } from "src/pages-component/Index/IndexBody";
import { Layout } from "src/pages-Layout/Layout";
import { Tag } from "src/type/types";

type Props = {
  tags: Tag[];
};

export const getStaticProps = async () => {
  const prisma = new PrismaClient();

  const tags = await prisma.tags.findMany({
    orderBy: { updatedAt: "asc" },
    select: {
      id: true,
      name: true,
      contents: { select: { id: true, title: true, body: true, tagId: true } },
    },
  });

  return {
    props: { tags },
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
