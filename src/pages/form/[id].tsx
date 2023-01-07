import { PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { FormBody } from "src/pages-component/form/FormBody";
import { Layout } from "src/pages-Layout/Layout";
import { Contents, Tag } from "src/pages";

type Props = {
  tags: Pick<Tag, "id" | "name">[];
  content: Omit<Contents, "createdAt" | "updatedAt">;
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const prisma = new PrismaClient();

  const tags = await prisma.tags.findMany({
    orderBy: { updatedAt: "asc" },
    select: { id: true, name: true },
  });

  const content = await prisma.contents.findUnique({
    where: { id: ctx.params.id },
    select: { id: true, title: true, body: true, tagId: true },
  });

  if (!content) {
    return {
      props: { tags: [], content: {} },
    };
  }

  return {
    props: { tags, content },
  };
};

const FormId: NextPage<Props> = ({ tags, content }) => {
  return (
    <Layout>
      <FormBody tags={tags} content={content} />
    </Layout>
  );
};

export default FormId;
