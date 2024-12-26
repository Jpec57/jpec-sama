import { Flashcard, FlashcardAnswer } from "@/lib/type";
import builder from "../../builder";
import { FlashcardTypeEnumType } from "../enums/FlashcardType";
import supabaseAdmin from "@/supabase/supabaseAdmin";
import debugAndThrowError from "@/supabase/debugAndThrowError";

builder.node("FlashcardAnswer", {
  description: "A Flashcard answer.",
  id: {
    resolve: (v: FlashcardAnswer) => v.id,
  },
  loadOne: async (id: string, { viewer }) => {
    const { data, error } = await supabaseAdmin
      .from("flashcard_answer")
      .select("*,flashcard_id!inner(id,user_id)")
      .eq("id", id)
      .eq("flashcard_id.user_id", viewer?.id)
      .single();
    debugAndThrowError(error);
    return data;
  },
  fields: (t) => ({
    _id: t.string({
      resolve: (v: FlashcardAnswer) => v.id,
      description: "The unique identifier of the flashcard answer.",
    }),
    answer: t.string({
      resolve: (v: FlashcardAnswer) => v.answer,
      nullable: false,
      description: "The flashcard answer.",
    }),
    lastUsedAt: t.string({
      resolve: (v: FlashcardAnswer) => v.last_used_at,
      nullable: true,
      description: "When the flashcard answer has been used for the last time.",
    }),
    flashcard: t.field({
      type: "Flashcard",
      resolve: async (v: FlashcardAnswer) => {
        const { data, error } = await supabaseAdmin
          .from("flashcard")
          .select("*")
          .eq("id", v.flashcard_id);
        debugAndThrowError(error);
        return data as unknown as Flashcard;
      },
      nullable: false,
      description: "The flashcard associated with the answer.",
    }),
  }),
});
