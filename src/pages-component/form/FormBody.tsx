import { Tabs, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { FC } from "react";
import { Contents, Tag } from "src/type/types";
import { ContentForm } from "./ContentForm";
import { TagForm } from "./TagForm";

type Props = {
  tags: Pick<Tag, "id" | "name">[];
  content?: Omit<Contents, "createdAt" | "updatedAt">;
};

export const FormBody: FC<Props> = (props) => {
  const { pathname } = useRouter();

  const formTitle = pathname === "/form" ? "新規作成" : "編集";

  return (
    <div className="min-h-[500px]  p-3 rounded-md ">
      <Title className="mb-3" order={4}>
        {formTitle}
      </Title>
      {pathname === "/form" ? (
        <Tabs variant="pills" defaultValue="contents">
          <Tabs.List>
            <Tabs.Tab value="contents">コンテンツ</Tabs.Tab>
            <Tabs.Tab value="tabs">タブ</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="contents" pt="xs">
            <ContentForm {...props} />
          </Tabs.Panel>

          <Tabs.Panel value="tabs" pt="xs">
            <TagForm />
          </Tabs.Panel>
        </Tabs>
      ) : (
        <ContentForm {...props} />
      )}
    </div>
  );
};
