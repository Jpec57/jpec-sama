import supabaseAdmin from "@/supabase/supabaseAdmin";
import builder from "../../builder";
import { MissingApiTokenError } from "../errors";
import resolveConnection from "../../utils/resolveConnection";
import { Flashcard } from "@/lib/type";

builder.queryField("flashcards", (t) =>
  t.connection({
    type: "Flashcard",
    description: "A list of flashcards.",
    args: {
      ascending: t.arg.boolean({
        required: false,
        description: "Whether the sort is ascending or not.",
        defaultValue: false
      }),
      availableBefore: t.arg.string({
        required: false,
        description:
          "Filter the cards not available for review before a given date."
      })
    },
    resolve: async (_, args, { viewer }) => {
      //TODO - remove this check
      // if (viewer === null || viewer === undefined) {
      //   throw MissingApiTokenError;
      // }
      const countQuery = supabaseAdmin
        .from("flashcard")
        .select("id", { count: "exact" });

      const dataQuery = supabaseAdmin.from("flashcard").select("*");

      [countQuery, dataQuery].forEach((query) => {
        // query.eq("user_id", viewer.id);
        if (args.availableBefore) {
          query.lte("next_available_at", args.availableBefore);
        }
        query.order("created_at", { ascending: args.ascending ?? false });
      });
      const { count } = await countQuery;
      return resolveConnection<Flashcard>(args, dataQuery, count);
    }
  })
);
