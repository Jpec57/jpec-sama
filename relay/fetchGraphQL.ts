export const IS_SERVER = typeof window === typeof undefined;
const GRAPHQL_HTTP_ENDPOINT = `http://localhost:3000/api/graphql/internal`;
// const CACHE_TTL = 5 * 1000; // 5 seconds, to resolve preloaded results


const fetchGraphQL = async (text: string, variables?: any) => {
  console.dir({ text, variables });
  const response = await fetch(GRAPHQL_HTTP_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // Add authorization headers if required
      //   Authorization: `Bearer YOUR_AUTH_TOKEN`
    },
    body: JSON.stringify({
      query: text,
      variables: null
    })
  });
  return await response.json();
};
export default fetchGraphQL;