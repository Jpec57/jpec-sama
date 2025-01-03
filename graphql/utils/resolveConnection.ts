import {
  DefaultConnectionArguments,
  resolveOffsetConnection,
} from "@pothos/plugin-relay";
import { PostgrestError } from "@supabase/supabase-js";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";

const resolveConnection = async <T>(
  args: DefaultConnectionArguments,
  dataQuery:
    | PostgrestFilterBuilder<any, any, any[], string, unknown>
    | {
        range: (
          offset: number,
          limit: number,
        ) => Promise<{ data: T[]; error: PostgrestError | null }>;
      },
  count: number | null,
  postQueryProcess?: (data: T[]) => T[],
) => {
  const connection = {
    totalCount: count ?? 0,
    ...(await resolveOffsetConnection({ args }, async ({ limit, offset }) => {
      if (limit == 1 && offset == 0) {
        return [];
      }

      const { data, error } = await dataQuery.range(offset, limit + offset);

      if (error) {
        console.error(error);
        return [];
      }
      const typedData = data as unknown as T[];
      if (postQueryProcess) {
        return postQueryProcess(typedData);
      }
      return typedData;
    })),
  };
  return connection;
};

export default resolveConnection;
