import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <NotificationsProvider position="top-center">
        <Component {...pageProps} />
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default App;
