import {
  Button,
  Select,
  Tabs,
  Textarea,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { contentFetch, reavalidate } from "src/lib/fetcher";
import { Contents, Tag } from "src/type/types";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import tsLanguageSyntax from "highlight.js/lib/languages/typescript";
import Highlight from "@tiptap/extension-highlight";

// register languages that your are planning to use
lowlight.registerLanguage("ts", tsLanguageSyntax);

// const escapeHtml = (unsafe: string): string => {
//   return unsafe
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// };

type Props = {
  tags: Pick<Tag, "id" | "name">[];
  content?: Omit<Contents, "createdAt" | "updatedAt">;
};

const transformEditorHtml = (html: string): string => {
  const pToBr = html.replaceAll("<p></p>", "<br/>");
  return pToBr;
};

export const ContentForm: FC<Props> = ({ tags, content }) => {
  const { pathname, push, reload } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const selectData = tags.map((tag) => ({ label: tag.name, value: tag.id }));

  const form = useForm({
    initialValues: {
      tagId: content ? content.tagId : "",
      title: content ? content.title : "",
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      TextStyle,
      Color,
      Highlight,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: content ? content.body : "",
  });

  const notificationsText = pathname === "/form" ? "作成" : "編集";
  const buttonName = pathname === "/form" ? "作成する" : "保存する";
  const id = content ? content.id : null;
  const method = pathname === "/form" ? "POST" : "PUT";

  const handleSubmit = useCallback(
    async (values: typeof form.values): Promise<void> => {
      try {
        if (!editor) return;

        setIsLoading(true);

        const body = transformEditorHtml(editor.getHTML());
        const data = { ...values, body };

        await contentFetch(method, data, id);
        await reavalidate("/");
        await push("/");

        showNotification({
          title: `コンテンツ${notificationsText}`,
          message: `${notificationsText}が完了しました`,
          color: "green",
          icon: <IconCheck size={18} />,
        });
      } catch (error) {
        console.error(error);
        showNotification({
          title: `コンテンツ${notificationsText}`,
          message: "エラーが発生しました。",
          color: "red",
          icon: <IconX size={18} />,
        });
      } finally {
        setIsLoading(false);
      }
    },

    [form, pathname, editor]
  );

  return (
    <form className="space-y-3" onSubmit={form.onSubmit(handleSubmit)}>
      <Select
        label="タグ"
        placeholder="タグを選択"
        data={selectData}
        required
        {...form.getInputProps("tagId")}
      />

      <TextInput label="タイトル" required {...form.getInputProps("title")} />

      <div>
        <Text>内容</Text>
        <RichTextEditor
          editor={editor}
          classNames={{ content: "min-h-[300px]" }}
        >
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ColorPicker
              colors={[
                "#25262b",
                "#868e96",
                "#fa5252",
                "#e64980",
                "#be4bdb",
                "#7950f2",
                "#4c6ef5",
                "#228be6",
                "#15aabf",
                "#12b886",
                "#40c057",
                "#82c91e",
                "#fab005",
                "#fd7e14",
              ]}
            />
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.Highlight />
              <RichTextEditor.CodeBlock
              // onClick={() => editor?.chain().toggleCodeBlock().run()}
              />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
          <RichTextEditor.Content />
        </RichTextEditor>
      </div>

      <Button
        className="block w-24 ml-auto"
        loading={isLoading}
        loaderPosition="center"
        type="submit"
      >
        {buttonName}
      </Button>
    </form>
  );
};
