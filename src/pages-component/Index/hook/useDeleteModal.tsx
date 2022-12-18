import { Button, Modal, ScrollArea, Text } from "@mantine/core";
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
};

export const useDeleteModal = () => {
  const { push } = useRouter();
  const [modalState, setModalState] = useState<ModalState>({
    content: initialContent,
    isOpened: false,
    isLoading: false,
  });

  const handleOpenModal = useCallback((content: Contents): void => {
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
        <div>
          <Text fz="xs" underline>
            タイトル
          </Text>
          <Text fz="xl">{`${modalState.content.title}`}</Text>
        </div>
        <div>
          <Text fz="xs" underline>
            内容
          </Text>
          <ScrollArea style={{ height: 200 }}>
            <div
              className="text-md"
              dangerouslySetInnerHTML={{ __html: modalState.content.body }}
            />
          </ScrollArea>
        </div>

        <Button
          className="flex mt-10 ml-auto"
          variant="outline"
          loading={modalState.isLoading}
          onClick={() => handleDelete()}
        >
          削除する
        </Button>
      </div>
    </Modal>
  );

  return {
    handleOpenModal,
    modalComponent,
  };
};
