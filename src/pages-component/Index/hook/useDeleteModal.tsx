import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { contentFetch, reavalidate } from "src/lib/fetcher";
import { Contents } from "src/type/types";
import { IconCheck, IconX } from "@tabler/icons";

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
        title: "コンテンツ削除",
        message: "削除が完了しました",
        color: "green",
        icon: <IconCheck size={18} />,
      });
    } catch (error) {
      console.error(error);
      showNotification({
        title: "コンテンツ削除",
        message: "エラーが発生しました。",
        color: "red",
        icon: <IconX size={18} />,
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
