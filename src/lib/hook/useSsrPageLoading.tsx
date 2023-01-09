import { Card, Group, Loader, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useSsrPageLoading = () => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  const loadingComponent = pageLoading && (
    <div
      className="absolute left-1/2 top-6"
      style={{ transform: "translateX(-50%)" }}
    >
      <Card shadow="sm">
        <Group align="center" position="center">
          <Loader size="sm" />
          <Text>loading...</Text>
        </Group>
      </Card>
    </div>
  );

  useEffect(() => {
    const handleStart = (url: "/" | "/form" | "/form/[id]") => {
      if (url !== "/" && url !== router.asPath) setPageLoading(true);
    };

    const handleComplete = () => setPageLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return { pageLoading, loadingComponent };
};
