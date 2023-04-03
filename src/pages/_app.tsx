import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { useDarkMode } from "src/lib/hook/useDarkMode";
import { useSsrPageLoading } from "src/lib/hook/useSsrPageLoading";
import { Notifications } from "@mantine/notifications";

const App = ({ Component, pageProps }: AppProps) => {
  const { colorScheme } = useDarkMode();
  const { loadingComponent } = useSsrPageLoading();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
      <Notifications />
      {loadingComponent}
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default App;
