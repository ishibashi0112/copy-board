import { Alert, Button, Modal, Text, Textarea, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { contentFetch, reavalidate, tagFetch } from "src/lib/fetcher";
import { Contents, Tag } from "src/type/types";
import { IconCheck, IconX, IconAlertCircle } from "@tabler/icons";

type ModalState = {
  data: Contents | Tag | null;
  isOpened: boolean;
  isLoading: boolean;
};

export type OpenModalHandler = (data: Contents | Tag) => void;

export const useDeleteModal = () => {
  const { push } = useRouter();
  const [modalState, setModalState] = useState<ModalState>({
    data: null,

    isOpened: false,
    isLoading: false,
  });

  const isContent = modalState.data ? "title" in modalState.data : false;
  const notificationTitle = isContent ? "コンテンツ削除" : "タグ削除";

  const openModal: OpenModalHandler = useCallback((data) => {
    setModalState((prev) => ({
      ...prev,
      data,
      isOpened: true,
    }));
  }, []);

  const handleDelete = useCallback(async () => {
    if (!modalState.data) return;

    try {
      setModalState((prev) => ({ ...prev, isLoading: true }));

      if ("title" in modalState.data) {
        await contentFetch("DELETE", null, modalState.data.id);
        await reavalidate("/");
      } else {
        await tagFetch("DELETE", null, modalState.data.id);
        await reavalidate("/");
        await reavalidate("/form");
      }

      setModalState((prev) => ({ ...prev, isOpened: false }));
      await push("/");
      showNotification({
        title: notificationTitle,
        message: "削除が完了しました",
        color: "green",
        icon: <IconCheck size={18} />,
      });
    } catch (error) {
      console.error(error);
      showNotification({
        title: notificationTitle,
        message: "エラーが発生しました。",
        color: "red",
        icon: <IconX size={18} />,
      });
    } finally {
      setModalState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [modalState]);

  const modalComponent = modalState.data ? (
    <Modal
      zIndex={9999}
      opened={modalState.isOpened}
      onClose={() =>
        setModalState((prev) => {
          return { ...prev, isOpened: false };
        })
      }
    >
      <div className="flex flex-col gap-3">
        {"title" in modalState.data ? (
          <>
            <TextInput
              classNames={{ input: "focus: border-none" }}
              label="タイトル"
              defaultValue={modalState.data.title}
              readOnly
              variant="default"
            />
            <Textarea
              classNames={{ input: "focus: border-none" }}
              label="内容"
              defaultValue={modalState.data.body}
              readOnly
              autosize
              variant="default"
            />
          </>
        ) : (
          <>
            <TextInput
              classNames={{ input: "focus: border-none" }}
              label="タグ"
              defaultValue={modalState.data.name}
              readOnly
              variant="default"
            />
            {modalState.data.contents.length ? (
              <Alert
                className="mt-5"
                icon={<IconAlertCircle size={16} />}
                color="red"
              >
                <Text color="red">
                  {`このタグに${modalState.data.contents.length}件のコンテンツが登録されています。
              それらのコンテンツもすべて削除されます。`}
                </Text>
              </Alert>
            ) : (
              <Alert
                className="mt-5"
                color="gray"
                icon={<IconAlertCircle size={16} />}
              >
                <Text fz="xs">このタグにコンテンツはありません</Text>
              </Alert>
            )}
          </>
        )}

        <Button
          className="flex mt-10 ml-auto active:translate-y-0"
          color="red"
          loading={modalState.isLoading}
          onClick={() => handleDelete()}
        >
          削除する
        </Button>
      </div>
    </Modal>
  ) : (
    <></>
  );

  return {
    openModal,
    modalComponent,
  };
};
