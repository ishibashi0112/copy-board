import { Container } from "@mantine/core";

import { FC, ReactNode } from "react";

import { Header } from "src/pages-component/Header";

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
    <div className="h-screen bg-gray-100">
      <Container size="lg">
        <Header />
        {children}
      </Container>
    </div>
  );
};
