import { forwardRef, ReactNode } from "react";
import { Position } from "./useContextMenu";

export const ContextMenu = forwardRef<
  HTMLDivElement,
  { children: ReactNode; opened: boolean; position: Position }
>((props, ref) => {
  const { opened, position, children } = props;

  if (!opened) {
    return null;
  }

  return (
    <div className="absolute z-[9999]" ref={ref} style={position}>
      {children}
    </div>
  );
});

ContextMenu.displayName = "ContextMenu";
