import { GetStaticProps, NextPage } from "next";
import { FormBody } from "src/pages-component/form/FormBody";
import { Layout } from "src/pages-Layout/Layout";

export const getStaticProps: GetStaticProps = () => {
  return { props: {} };
};

const Form: NextPage = () => {
  return (
    <Layout>
      <FormBody />
    </Layout>
  );
};

export default Form;
