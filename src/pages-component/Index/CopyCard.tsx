import { UnstyledButton, Title, Group, ScrollArea, Card } from "@mantine/core";
import { FC, useRef } from "react";
import { useClipboard } from "src/lib/hook/useClipboard";
import { useDarkMode } from "src/lib/hook/useDarkMode";
import { Contents } from "src/type/types";
import { CopyedBadge } from "./CopiedBadge";
import { FullTextButton } from "./FullTextButton";
import { Menus } from "./Menus";

type Props = {
  content: Contents;
};

export const CopyCard: FC<Props> = ({ content }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { copy, copied } = useClipboard({ timeout: 800 });

  const { isDark } = useDarkMode();

  return (
    <div className="relative">
      <Card
        className={`
          ${copied ? "border-blue-600" : ""}
          ${isDark ? "hover:bg-zinc-700" : "hover:bg-blue-50 hover:shadow-sm"}
           p-3 overflow-visible  transition  hover:transition `}
        radius="sm"
        withBorder
      >
        <UnstyledButton
          className="block w-full"
          onClick={() => copy(ref.current as HTMLDivElement)}
        >
          <Title order={5}>{content.title}</Title>

          <ScrollArea className="pt-2" style={{ height: 110 }}>
            <div
              className="whitespace-pre-wrap"
              ref={ref}
              dangerouslySetInnerHTML={{ __html: content.body }}
            />
          </ScrollArea>
        </UnstyledButton>

        <CopyedBadge copied={copied} />
      </Card>
      <Group className="absolute top-2 right-2" position="apart">
        <Group spacing={1}>
          <FullTextButton content={content} />
          <Menus content={content} />
        </Group>
      </Group>
    </div>
  );
};
