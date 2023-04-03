import { useMediaQuery } from "@mantine/hooks";
import { FC } from "react";
import { Contents } from "src/type/types";
import { CopyCard } from "./CopyCard";
import { CopyList } from "./CopyList";
import { OpenModalHandler } from "./hook/useDeleteModal";

type Props = {
  content: Contents;
};

export const CopyContent: FC<Props> = (props) => {
  const mediaQuery = useMediaQuery("(max-width: 600px)");

  if (mediaQuery) {
    return <CopyList {...props} />;
  }

  return <CopyCard {...props} />;
};
