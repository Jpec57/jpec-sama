import { PostgrestError } from "@supabase/supabase-js";

const debugAndThrowError = (error: PostgrestError | null) => {
  console.error(error);
};

export default debugAndThrowError;
