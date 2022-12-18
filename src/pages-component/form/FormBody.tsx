import { Button, Text, Textarea, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
// import { RichTextEditor } from "@mantine/tiptap";
// import Color from "@tiptap/extension-color";
// import Highlight from "@tiptap/extension-highlight";
// import TextStyle from "@tiptap/extension-text-style";
// import Underline from "@tiptap/extension-underline";
// import { useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { contentFetch, reavalidate } from "src/lib/fetcher";
import { Contents } from "src/pages";

type Props = {
  content?: Contents;
};

export const FormBody: FC<Props> = ({ content }) => {
  const { pathname, push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      title: content ? content.title : "",
      body: content ? content.body : "",
    },
  });

  //   const [title, setTitle] = useState(content ? content.title : "");

  //   const editor = useEditor({
  //     extensions: [StarterKit, Underline, TextStyle, Color, Highlight],
  //     content: content ? content.body : "",
  //   });

  const formTitle = pathname !== "/form" ? "編集" : "新規作成";
  const buttonName = pathname !== "/form" ? "保存する" : "作成する";

  //   const handleSubmit = useCallback(async (): Promise<void> => {
  const handleSubmit = useCallback(
    async (values: typeof form.values): Promise<void> => {
      try {
        setIsLoading(true);
        //   const data = { title, body: editor ? editor.getHTML() : "" };
        //   const data = { title, body };

        const id = content ? content.id : null;
        const method = pathname !== "/form" ? "PUT" : "POST";
        //   await contentFetch(method, data, id);
        await contentFetch(method, values, id);
        await reavalidate();
        await push("/");
        showNotification({
          title: "Succese‼",
          message: "成功しました",
          color: "green",
        });
      } catch (error) {
        console.error(error);
        showNotification({
          title: "Error",
          message: "失敗しました。",
          color: "red",
        });
      } finally {
        setIsLoading(false);
      }
    },
    //   [title, body, editor, content, pathname]
    [form, content, pathname]
  );

  return (
    <div className="min-h-[500px] bg-white p-3 rounded-md ">
      <Title className="mb-3" order={3}>
        {formTitle}
      </Title>

      {/* <div className="space-y-3"> */}
      <form className="space-y-3" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="タイトル" {...form.getInputProps("title")} />
        <Textarea
          classNames={{ input: "min-h-[300px]" }}
          label="内容"
          autosize
          {...form.getInputProps("body")}
        />
        {/* <div>
          <Text>内容</Text>
          <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

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
                <RichTextEditor.Color color="#F03E3E" />
                <RichTextEditor.Color color="#7048E8" />
                <RichTextEditor.Color color="#1098AD" />
                <RichTextEditor.Color color="#37B24D" />
                <RichTextEditor.Color color="#F59F00" />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content className="min-h-[300px]" />
          </RichTextEditor>
        </div>*/}
        <Button
          className="block w-24 ml-auto"
          loading={isLoading}
          //   onClick={() => handleSubmit()}
          type="submit"
        >
          {buttonName}
        </Button>
      </form>
      {/* </div> */}
    </div>
  );
};
