import builder from "../../builder";
import resolveFlashcards from "@/graphql/resolvers/flashcards";

builder.queryField("flashcards", (t) =>
  t.connection({
    type: "Flashcard",
    edgesNullable: false,
    nodeNullable: false,
    nullable: false,
    description: "A list of flashcards.",
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
    resolve: async (_, args, { viewer }) => {
      return resolveFlashcards(args, viewer);
    },
  }),
);
