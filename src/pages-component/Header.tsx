import {
  Button,
  Title,
  Header as MantineHeader,
  Container,
  Flex,
  Anchor,
  Group,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

export const Header: FC = () => {
  const { pathname } = useRouter();

  return (
    <MantineHeader height={50}>
      <Container size="lg">
        <Flex mih={50} justify="space-between" align="center">
          <Anchor variant="text" component={Link} href="/">
            <Title order={3}>copy board</Title>
          </Anchor>
          <Group>
            {pathname === "/" && (
              <Button
                className="active:translate-y-0"
                component={Link}
                href="/form"
              >
                追加
              </Button>
            )}
          </Group>
        </Flex>
      </Container>
    </MantineHeader>
  );
};
