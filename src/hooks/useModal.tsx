import { Button, Modal, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { contentFetch, reavalidate } from "src/fetcher/fetcher";
import { Contents } from "src/pages";

export type formValues = {
  title: string;
  body: string;
};

export type modalType = "POST" | "PUT" | "DELETE";

type ModalState = {
  type: modalType;
  content: Contents;
  isOpened: boolean;
  isFormLoading: boolean;
};

const initialContent = {
  id: "",
  createdAt: "",
  updatedAt: "",
  title: "",
  body: "",
};

export const useModal = () => {
  const router = useRouter();
  const [modalState, setModalState] = useState<ModalState>({
    type: "POST",
    content: initialContent,
    isOpened: false,
    isFormLoading: false,
  });

  const form = useForm<formValues>({
    initialValues: {
      title: "",
      body: "",
    },
  });

  const modalTitle =
    modalState.type === "POST"
      ? "新規作成"
      : modalState.type === "PUT"
      ? "編集"
      : "削除";

  const handleOpenModal = useCallback(
    (type: modalType, content: Contents = initialContent): void => {
      console.log(content);

      setModalState((prev) => ({
        ...prev,
        type,
        content,
        isOpened: true,
      }));
      if (type === "PUT") {
        form.setValues({ title: content.title, body: content.body });
      }
    },
    [form]
  );

  const handleSubmit = useCallback(
    async (values: formValues): Promise<void> => {
      try {
        setModalState((prev) => ({ ...prev, isFormLoading: true }));
        await contentFetch(modalState.type, values, modalState.content.id);
        await reavalidate();
        setModalState((prev) => ({ ...prev, isOpened: false }));
        await router.reload();
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
        setModalState((prev) => ({ ...prev, isFormLoading: false }));
      }
    },
    [modalState]
  );

  const handleDelete = async () => {
    try {
      setModalState((prev) => ({ ...prev, isFormLoading: true }));
      await contentFetch(modalState.type, null, modalState.content.id);
      await reavalidate();
      setModalState((prev) => ({ ...prev, isOpened: false }));
      await router.reload();
      showNotification({
        title: "Succese‼",
        message: "削除しました",
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
      setModalState((prev) => ({ ...prev, isFormLoading: false }));
    }
  };

  const modalComponent = (
    <Modal
      opened={modalState.isOpened}
      onClose={() =>
        setModalState((prev) => {
          return { ...prev, isOpened: false };
        })
      }
      title={modalTitle}
    >
      {!(modalState.type === "DELETE") ? (
        <form className="space-y-3" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput label="title" {...form.getInputProps("title")} />
          <Textarea label="body" autosize {...form.getInputProps("body")} />
          <Button
            className="w-full"
            type="submit"
            loading={modalState.isFormLoading}
          >
            {modalState.type === "POST" ? "作成" : "更新"}
          </Button>
        </form>
      ) : (
        <div>
          <Text>{`${modalState.content.title}を削除しますか？`}</Text>

          <Button
            className="mt-10"
            variant="outline"
            loading={modalState.isFormLoading}
            onClick={() => handleDelete()}
          >
            削除する
          </Button>
        </div>
      )}
    </Modal>
  );

  return {
    handleOpenModal,
    modalComponent,
  };
};
