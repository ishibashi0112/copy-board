import {
  Alert,
  Button,
  Card,
  Group,
  SimpleGrid,
  Tabs,
  Text,
} from "@mantine/core";
import { CopyContent } from "./CopyContent";
import React, { FC } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useTags } from "src/lib/hook/useTags";
import { AddContent } from "./AddContent";
import { SWRConfig } from "swr";

export const TabsPanels: FC = () => {
  const { tags } = useTags();

  if (!tags) {
    return <></>;
  }

  return (
    <div>
      {tags.map((tag) => (
        <SWRConfig
          key={tag.id}
          value={{
            fallback: { [`/api/contentByTagId/${tag.id}`]: tag.contents },
          }}
        >
          <Tabs.Panel key={tag.id} value={tag.id} pt="xs">
            {tag.contents?.length ? (
              <SimpleGrid
                cols={3}
                breakpoints={[
                  { maxWidth: 980, cols: 3, spacing: "md" },
                  { maxWidth: 755, cols: 2, spacing: "sm" },
                  { maxWidth: 600, cols: 1, spacing: "sm" },
                ]}
              >
                <AddContent variant="card" tagId={tag.id} />
                {tag.contents.map((content) => (
                  <CopyContent key={content.id} content={content} />
                ))}
              </SimpleGrid>
            ) : (
              <>
                <Alert className="mt-5" icon={<InfoCircledIcon />} color="gray">
                  <Group>
                    <Text>コンテンツがありません。</Text>
                    <AddContent variant="button" tagId={tag.id} />
                  </Group>
                </Alert>
              </>
            )}
          </Tabs.Panel>
        </SWRConfig>
      ))}
    </div>
  );
};
