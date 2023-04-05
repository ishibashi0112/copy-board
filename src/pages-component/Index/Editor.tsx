import { Button, Text, TextInput } from "@mantine/core";
import React, { FC, useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { reavalidate, tagFetch } from "src/lib/fetcher";
import { notifications, showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { randomId } from "@mantine/hooks";
import { useTags } from "src/lib/hook/useTags";
import { Tag } from "src/type/types";
import { useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import Highlight from "@tiptap/extension-highlight";
import tsLanguageSyntax from "highlight.js/lib/languages/typescript";

lowlight.registerLanguage("ts", tsLanguageSyntax);

type Props = {
  content?: any;
  setBody: React.Dispatch<React.SetStateAction<string>>;
};

export const Editor: FC<Props> = (props) => {
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
    content: props.content ? props.content.body : "",
    onUpdate: ({ editor }) => {
      props.setBody(editor.getHTML());
    },
  });

  return (
    <div>
      <RichTextEditor editor={editor} classNames={{ content: "min-h-[300px]" }}>
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
            <RichTextEditor.CodeBlock />
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
  );
};
