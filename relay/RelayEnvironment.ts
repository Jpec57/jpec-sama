import {
  Environment,
  Network,
  RecordSource,
  Store,
  CacheConfig,
  GraphQLResponse,
  QueryResponseCache,
  RequestParameters,
  Variables,
} from "relay-runtime";
import fetchGraphQL, { CACHE_TTL, IS_SERVER } from "./fetchGraphQL";

const fetchRelay = async (
  params: RequestParameters,
  variables: Variables,
): Promise<GraphQLResponse> => {
  // console.log(
  //   `fetching query ${params.name} with ${JSON.stringify(variables)}`
  // );
  const json = await fetchGraphQL(params.text, variables);

  // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
  // property of the response. If any exceptions occurred when processing the request,
  // throw an error to indicate to the developer what went wrong.
  if (Array.isArray(json?.errors)) {
    console.error(json.errors);

    throw new Error(
      `Error fetching GraphQL query '${
        params.name
      }' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
        json.errors,
      )}`,
    );
  }
  return json;
};

export const responseCache: QueryResponseCache | null = IS_SERVER
  ? null
  : new QueryResponseCache({
      size: 100,
      ttl: CACHE_TTL,
    });

const createNetwork = () => {
  async function fetchResponse(
    params: RequestParameters,
    variables: Variables,
    cacheConfig: CacheConfig,
  ) {
    const isQuery = params.operationKind === "query";
    const cacheKey = params.id;
    const forceFetch = cacheConfig && cacheConfig.force;
    if (cacheKey && responseCache != null && isQuery && !forceFetch) {
      const fromCache = responseCache.get(cacheKey, variables);
      if (fromCache != null) {
        return Promise.resolve(fromCache);
      }
    }

    return fetchRelay(params, variables);
  }
  return Network.create(fetchResponse);
};

// Export a singleton instance of Relay Environment configured with our network function:
// export default new Environment({
//   network: createNetwork(),
//   store: new Store(new RecordSource())
// });

function createRelayEnvironment() {
  return new Environment({
    network: createNetwork(),
    store: new Store(RecordSource.create()),
    // isServer: IS_SERVER,
  });
}

export const relayEnvironment = createRelayEnvironment();

export function getCurrentEnvironment(): Environment {
  // if (IS_SERVER) {
  //   return createRelayEnvironment();
  // }

  return relayEnvironment;
}
