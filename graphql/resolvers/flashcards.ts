import supabaseAdmin from "@/supabase/supabaseAdmin";
import resolveConnection from "../utils/resolveConnection";
import { Flashcard, User } from "@/lib/type";
import { DefaultConnectionArguments } from "@pothos/plugin-relay";

const resolveFlashcards = async (
  args: {
    availableBefore?: string | null;
    ascending?: boolean | null;
  } & DefaultConnectionArguments,
  user?: User | null,
) => {
  const countQuery = supabaseAdmin
    .from("flashcard")
    .select("id", { count: "exact" });

  const dataQuery = supabaseAdmin.from("flashcard").select("*");

  [countQuery, dataQuery].forEach((query) => {
    console.log({ user_id: user?.id });
    if (user?.id) {
      query.eq("user_id", user.id);
    }
    if (args.availableBefore) {
      query.lte("next_available_at", args.availableBefore);
      console.log({ availableBefore: args.availableBefore });
    }
    query.order("created_at", { ascending: args.ascending ?? false });
  });
  const { count } = await countQuery;
  return resolveConnection<Flashcard>(args, dataQuery, count);
};

export default resolveFlashcards;
