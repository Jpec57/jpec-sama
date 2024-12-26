import { Flashcard, ReviewedFlashcard, User } from "@/lib/type";
import builder from "../../builder";
import supabaseAdmin from "@/supabase/supabaseAdmin";
import getNextAvailableAtAccordingToLevel from "@/utils/review/getNextAvailableAtAccordingToLevel";
import debugAndThrowError from "@/supabase/debugAndThrowError";

const ReviewedFlashcardInputType = builder.inputType("ReviewedFlashcard", {
  description: "A reviewed Flashcard.",
  fields: (t) => ({
    id: t.globalID({
      description: "The unique identifier of the flashcard.",
      required: true,
    }),
    errorCount: t.int({
      description: "The number of errors during the review.",
      required: true,
    }),
    givenAnswer: t.string({
      description: "The answer given by the user.",
      required: true,
    }),
    nextLevel: t.int({
      description: "The language of the flashcard text.",
      required: true,
    }),
  }),
});

builder.relayMutationField(
  "sendReview",
  {
    inputFields: (t) => ({
      reviewedFlashcards: t.field({
        type: [ReviewedFlashcardInputType],
        required: true,
        description: "A list of reviewed flashcards.",
      }),
    }),
  },
  {
    resolve: async (
      root,
      { input },
      context,
    ): Promise<{
      user: User | null;
    }> => {
      const { reviewedFlashcards } = input;

      //   console.dir(
      //     {
      //       reviewedFlashcards,
      //     },
      //     { depth: null },
      //   );
      const levelMap = new Map<number, ReviewedFlashcard[]>();
      for (const flashcard of reviewedFlashcards) {
        if (!levelMap.has(flashcard.nextLevel)) {
          levelMap.set(flashcard.nextLevel, []);
        }
        levelMap
          .get(flashcard.nextLevel)
          ?.push({ ...flashcard, id: flashcard.id.id });
      }
      for (const [level, flashcards] of levelMap) {
        console.dir({
          ids: flashcards.map((f: ReviewedFlashcard) => f.id),
          level,
          flashcards: flashcards.length,
          nextAvailableAt:
            getNextAvailableAtAccordingToLevel(level).toISOString(),
        });
        const { error } = await supabaseAdmin
          .from("flashcard")
          .update({
            level: level,
            next_available_at:
              getNextAvailableAtAccordingToLevel(level).toISOString(),
          })
          .in(
            "id",
            flashcards.map((f: ReviewedFlashcard) => f.id),
          );

        debugAndThrowError(error);
      }

      return {
        user: context?.viewer ?? null,
      };
    },
  },
  {
    outputFields: (t) => ({
      user: t.field({
        type: "User",
        resolve: (v) => v.user,
        nullable: true,
        description: "The user who has done the review.",
      }),
    }),
  },
);
