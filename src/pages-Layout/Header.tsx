import {
  Title,
  Header as MantineHeader,
  Container,
  Flex,
  Anchor,
  Group,
} from "@mantine/core";
import Link from "next/link";
import { FC } from "react";
import { useDarkMode } from "src/lib/hook/useDarkMode";

export const Header: FC = () => {
  const { Switch } = useDarkMode();
  return (
    <MantineHeader height={50}>
      <Container size="lg">
        <Flex mih={50} justify="space-between" align="center">
          <Anchor variant="text" component={Link} href="/">
            <Title order={3}>copy board</Title>
          </Anchor>
          <Group>{Switch}</Group>
        </Flex>
      </Container>
    </MantineHeader>
  );
};
