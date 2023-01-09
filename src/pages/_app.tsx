import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useDarkMode } from "src/lib/hook/useDarkMode";
import { useSsrPageLoading } from "src/lib/useSsrPageLoading";

const App = ({ Component, pageProps }: AppProps) => {
  const { colorScheme } = useDarkMode();
  const { loadingComponent } = useSsrPageLoading();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
      <NotificationsProvider position="top-center">
        {loadingComponent}
        <Component {...pageProps} />
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default App;
