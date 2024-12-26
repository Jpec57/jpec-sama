import { PageInfoShape } from "@pothos/plugin-relay";

type Connection<T> = {
  pageInfo: PageInfoShape;
  edges: readonly {
    cursor: string;
    node: NonNullable<T>;
  }[];
  totalCount: number;
};

function getEmptyConnection<T>() {
  const emptyConnection: Connection<T> = {
    totalCount: 0,
    edges: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null,
      endCursor: null,
    },
  };

  return emptyConnection;
}

export default getEmptyConnection;
