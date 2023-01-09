import { Menu } from "@mantine/core";
import { forwardRef, ReactNode } from "react";
import { Position } from "./useContextMenu";

export const ContextMenu = forwardRef<
  HTMLDivElement,
  { children: ReactNode; opened: boolean; position: Position }
>((props, ref) => {
  const { opened, position, children } = props;

  return (
    <div className="absolute z-[9999]" ref={ref} style={position}>
      {opened ? children : null}
    </div>
  );
});

ContextMenu.displayName = "ContextMenu";
