import { useClickOutside } from "@mantine/hooks";
import React, { MouseEvent, useCallback, useState } from "react";

export type Position = {
  top: number;
  left: number;
};

export type ContextMenuHandler<T = any> = (event: MouseEvent, data?: T) => void;

export const useContextMenu = <T,>() => {
  const [opened, setOpened] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  const ref = useClickOutside(() => setOpened(false));

  const handleContextMenu: ContextMenuHandler<T> = useCallback(
    (event, data) => {
      event.preventDefault();

      if (data) {
        setData(data);
      }

      setPosition({
        top: event.pageY,
        left: event.pageX,
      });
      setOpened(true);
    },
    []
  );

  const contextMenuProps = {
    opened,
    position,
  };

  return {
    ref,
    data,
    position,
    opened,
    contextMenuProps,
    handleContextMenu,
  };
};
