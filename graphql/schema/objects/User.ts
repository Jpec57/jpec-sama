import { Flashcard, Typename, User } from "@/lib/type";
import builder from "../../builder";
import supabaseAdmin from "@/supabase/supabaseAdmin";
import debugAndThrowError from "@/supabase/debugAndThrowError";
import resolveFlashcards from "@/graphql/resolvers/flashcards";
import getEmptyConnection from "@/graphql/utils/getEmptyConnection";

builder.node("User", {
  description: "A user.",
  id: {
    resolve: (v: User) => v.id,
  },
  loadOne: async (id: string, { viewer }) => {
    if (!viewer?.id || (!viewer.is_admin && viewer.id !== id)) {
      return null;
    }
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    debugAndThrowError(error);
    return { ...data, __typename: Typename.User };
  },
  fields: (t) => ({
    _id: t.string({
      resolve: (v: User) => v.id,
      description: "The unique identifier of the user.",
    }),
    username: t.string({
      resolve: (v: User) => v.username,
      nullable: false,
      description: "The username of the user.",
    }),

    email: t.string({
      resolve: (v: User) => v.email,
      nullable: false,
      description: "The email of the user.",
    }),
    reviewCards: t.connection({
      type: "Flashcard",
      description: "The flashcards to review.",
      edgesNullable: false,
      nodeNullable: false,
      nullable: false,
      args: {
        ascending: t.arg.boolean({
          required: false,
          description: "Whether the sort is ascending or not.",
          defaultValue: false,
        }),
        availableBefore: t.arg.string({
          required: false,
          description:
            "Filter the cards not available for review before a given date.",
        }),
      },
      resolve: async (user, args, { viewer }) => {
        if (viewer && (viewer?.is_admin || viewer.id === user.id)) {
          return await resolveFlashcards(args, user);
        }
        return getEmptyConnection<Flashcard>();
      },
    }),
  }),
});
