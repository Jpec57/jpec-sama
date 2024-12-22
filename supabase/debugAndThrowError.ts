import { PostgrestError } from "@supabase/supabase-js";

const debugAndThrowError = (error: PostgrestError | null) => {
  if (error === null || error === undefined) {
    return;
  }
  console.error("Error", error!.message);
  throw new Error(error!.message);
};

export default debugAndThrowError;
