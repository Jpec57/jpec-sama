import RelayEnvironment from "@/relay/RelayEnvironment";
import { RelayEnvironmentProvider } from "react-relay";

export default function App({ Component, pageProps }) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  );
}