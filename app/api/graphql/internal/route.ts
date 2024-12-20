import { createYoga } from "graphql-yoga";
import schema from "@/graphql/schema";

const { handleRequest } = createYoga({
  schema: schema,
  graphqlEndpoint: "/api/graphql/internal",
  graphiql: true,
  context: async ({ request }) => {
    const auth = request.headers.get("Authorization");
    if ((auth?.length ?? 0) === 0) {
      return { request, sdk: null };
    }
    return {
      request
    };
  },
  fetchAPI: { Response, Request }
});

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}

export { handleRequest as GET, handleRequest as POST };
