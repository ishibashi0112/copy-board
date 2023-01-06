import { SimpleGrid } from "@mantine/core";
import { NextPage } from "next";
import { useDeleteModal } from "src/pages-component/Index/hook/useDeleteModal";
import { Contents } from "src/pages";
import { CopyCard } from "./CopyCard";

type Props = {
  contents: Contents[];
};

export const IndexBody: NextPage<Props> = ({ contents }) => {
  const { openModal, modalComponent } = useDeleteModal();

  return (
    <>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {contents.map((content) => (
          <CopyCard key={content.id} content={content} openModal={openModal} />
        ))}
      </SimpleGrid>

      {modalComponent}
    </>
  );
};
