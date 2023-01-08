import { PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { FormBody } from "src/pages-component/form/FormBody";
import { Layout } from "src/pages-Layout/Layout";
import { Tag } from "src/pages";

type Props = {
  tags: Pick<Tag, "id" | "name">[];
};

export const getServerSideProps: GetServerSideProps = async () => {
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
