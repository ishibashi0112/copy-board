import { Alert, SimpleGrid, Tabs, Text } from "@mantine/core";
import { Contents, Tag } from "src/type/types";
import { CopyCard } from "./CopyCard";
import React, { FC } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";

type Props = {
  tags: Tag[];
  openModal: (content: Contents) => void;
};

export const TabsPanels: FC<Props> = ({ tags, openModal }) => {
  return (
    <div>
      {tags.map((tag) => (
        <Tabs.Panel key={tag.id} value={tag.id} pt="xs">
          {tag.contents.length ? (
            <SimpleGrid
              cols={3}
              breakpoints={[
                { maxWidth: 980, cols: 3, spacing: "md" },
                { maxWidth: 755, cols: 2, spacing: "sm" },
                { maxWidth: 600, cols: 1, spacing: "sm" },
              ]}
            >
              {tag.contents.map((content) => (
                <CopyCard
                  key={content.id}
                  content={content}
                  openModal={openModal}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Alert className="mt-5" icon={<InfoCircledIcon />} color="gray">
              <Text>コンテンツが1つもありません。</Text>
            </Alert>
          )}
        </Tabs.Panel>
      ))}
    </div>
  );
};
