import { Container } from "@mantine/core";
import { FC, ReactNode } from "react";
import { Header } from "src/pages-Layout/Header";

export type Contents = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  body: string;
};

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <Container size="lg">{children}</Container>
    </div>
  );
};
