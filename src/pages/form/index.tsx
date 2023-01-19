import { PrismaClient } from "@prisma/client";
import { GetStaticProps, NextPage } from "next";
import { FormBody } from "src/pages-component/form/FormBody";
import { Layout } from "src/pages-Layout/Layout";
import { Tag } from "src/type/types";

type Props = {
  tags: Pick<Tag, "id" | "name">[];
};

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient();

  const tags = await prisma.tags.findMany({
    orderBy: { updatedAt: "asc" },
    select: { id: true, name: true },
  });

  return {
    props: { tags },
  };
};

const Form: NextPage<Props> = ({ tags }) => {
  return (
    <Layout>
      <FormBody tags={tags} />
    </Layout>
  );
};

export default Form;
