import { Title, Group, Card, Text } from "@mantine/core";
import { FC, useRef } from "react";
import { useClipboard } from "src/lib/hook/useClipboard";
import { useDarkMode } from "src/lib/hook/useDarkMode";
import { Contents } from "src/type/types";
import { CopyedBadge } from "./CopiedBadge";
import { FullTextButton } from "./FullTextButton";
import { OpenModalHandler } from "./hook/useDeleteModal";
import { Menus } from "./Menus";

type Props = {
  content: Contents;
};

export const CopyList: FC<Props> = ({ content }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { copy, copied } = useClipboard({ timeout: 800 });

  const { isDark } = useDarkMode();

  return (
    <div className="relative">
      <Card
        className={`
          ${copied ? "border-blue-600" : ""}
          ${isDark ? "hover:bg-zinc-700" : "hover:bg-blue-50 hover:shadow-sm"}
           p-3 overflow-visible  transition  hover:transition cursor-pointer`}
        radius="sm"
        withBorder
        onClick={() => copy(ref.current as HTMLDivElement)}
      >
        <Group position="apart">
          <Group align="center" noWrap>
            <Title order={5}>{content.title}</Title>
            <Text
              ref={ref}
              fz="xs"
              color="dimmed"
              lineClamp={1}
              dangerouslySetInnerHTML={{ __html: content.body }}
            />
          </Group>
        </Group>

        <CopyedBadge copied={copied} />
      </Card>

      <Group className="absolute top-3 right-2" spacing={1}>
        <FullTextButton content={content} />

        <Menus content={content} />
      </Group>
    </div>
  );
};
