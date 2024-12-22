import SchemaBuilder from "@pothos/core";
import RelayPlugin from "@pothos/plugin-relay";
import { Enums } from "./schema/enums/_type";
import { Objects } from "./schema/objects/_type";

export type GraphQLContext = {
  request: Request;
  viewer?: { id: string } | null;
};

const builder = new SchemaBuilder<{
  Context: GraphQLContext;
  // Inputs: {}
  Objects: Objects;
  Interfaces: {
    Node: { id: string };
  };
  Enums: Enums;
  //   Scalars: {
  //     LocalDate: {
  //       Input: string | null;
  //       Output: string | null;
  //     };
  //   };
  Connection: {
    totalCount: number;
  };
}>({
  plugins: [RelayPlugin],
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "ID",
    idFieldName: "id",
    idFieldOptions: {
      description: "The ID of an object"
    },
    firstArgOptions: {
      description: "Only read the first `n` values of the set."
    }
  }
});
builder.globalConnectionField("totalCount", (t) =>
  t.int({
    nullable: false,
    description: "A count of the total number of objects in this connection.",
    resolve: (parent) => parent.totalCount
  })
);

export default builder;
