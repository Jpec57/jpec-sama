import { GraphQLError } from "graphql/error";

export const MissingApiTokenError = new GraphQLError("Missing api token", {
  extensions: {
    http: { status: 401 }
  }
});
