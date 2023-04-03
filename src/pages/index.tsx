import { PrismaClient } from "@prisma/client";
import { NextPage } from "next";
import { IndexBody } from "src/pages-component/Index/IndexBody";
import { Layout } from "src/pages-Layout/Layout";
import { Tag } from "src/type/types";
import { SWRConfig } from "swr/_internal";

type Props = {
  fallback: { tags: Tag[] };
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
    props: { fallback: { ["/api/tag"]: tags } },
  };
};

const Home: NextPage<Props> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout>
        <IndexBody />
      </Layout>
    </SWRConfig>
  );
};

export default Home;
