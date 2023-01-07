import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { contentFetch, reavalidate } from "src/lib/fetcher";
import { Contents } from "src/pages";

type ModalState = {
  content: Contents;
  isOpened: boolean;
  isLoading: boolean;
};

const initialContent = {
  id: "",
  createdAt: "",
  updatedAt: "",
  title: "",
  body: "",
  tagId: "",
};

export const useDeleteModal = () => {
  const { push } = useRouter();
  const [modalState, setModalState] = useState<ModalState>({
    content: initialContent,
    isOpened: false,
    isLoading: false,
  });

  const openModal = useCallback((content: Contents): void => {
    setModalState((prev) => ({
      ...prev,
      content,
      isOpened: true,
    }));
  }, []);

  const handleDelete = useCallback(async () => {
    try {
      setModalState((prev) => ({ ...prev, isLoading: true }));
      await contentFetch("DELETE", null, modalState.content.id);
      await reavalidate();
      setModalState((prev) => ({ ...prev, isOpened: false }));
      await push("/");
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
      setModalState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [modalState]);

  const modalComponent = (
    <Modal
      opened={modalState.isOpened}
      onClose={() =>
        setModalState((prev) => {
          return { ...prev, isOpened: false };
        })
      }
      title="削除画面"
    >
      <div className="space-y-3">
        <TextInput
          classNames={{ input: "focus: border-none" }}
          label="タイトル"
          defaultValue={modalState.content.title}
          readOnly
          variant="default"
        />
        <Textarea
          classNames={{ input: "focus: border-none" }}
          label="内容"
          defaultValue={modalState.content.body}
          readOnly
          autosize
          variant="default"
        />

        <Button
          className="flex mt-10 ml-auto active:translate-y-0"
          variant="outline"
          color="red"
          loading={modalState.isLoading}
          onClick={() => handleDelete()}
        >
          削除する
        </Button>
      </div>
    </Modal>
  );

  return {
    openModal,
    modalComponent,
  };
};
