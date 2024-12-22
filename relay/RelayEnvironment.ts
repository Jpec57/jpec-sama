import { Environment, Network, RecordSource, Store } from "relay-runtime";
import fetchGraphQL, { IS_SERVER } from "./fetchGraphQL";

// Export a singleton instance of Relay Environment configured with our network function:
export default new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource()),
  isServer: IS_SERVER
});
