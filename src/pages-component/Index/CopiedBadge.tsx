import { Badge, Transition } from "@mantine/core";

import { FC } from "react";

export const CopyedBadge: FC<{ copied: boolean }> = ({ copied }) => {
  return (
    <Transition
      mounted={copied}
      transition="fade"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <div style={styles}>
          <Badge
            className="absolute top-1/2 left-1/2"
            style={{ transform: "translate(-50%, -50%)" }}
            color="green"
            variant="filled"
            size="lg"
          >
            ✓Copyed!
          </Badge>
        </div>
      )}
    </Transition>
  );
};
