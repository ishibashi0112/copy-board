import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { GetServerSideProps, NextPage } from "next";
import { FormBody } from "src/pages-component/form/FormBody";
import { Contents, Layout } from "src/pages-Layout/Layout";

type Props = {
  content: Contents;
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const prisma = new PrismaClient();
  const content = await prisma.contents.findUnique({
    where: { id: ctx.params.id },
  });

  if (!content) {
    return {
      props: { content: {} },
    };
  }

  const dateToStringContent = {
    ...content,
    createdAt: dayjs(content.createdAt).format("YYYY/MM/DD"),
    updatedAt: dayjs(content.updatedAt).format("YYYY/MM/DD"),
  };

  return {
    props: { content: dateToStringContent },
  };
};

const FormId: NextPage<Props> = ({ content }) => {
  return (
    <Layout>
      <FormBody content={content} />
    </Layout>
  );
};

export default FormId;
