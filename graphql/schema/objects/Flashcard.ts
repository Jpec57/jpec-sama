import { Flashcard, FlashcardAnswer } from "@/lib/type";
import builder from "../../builder";
import { FlashcardTypeEnumType } from "../enums/FlashcardType";
import supabaseAdmin from "@/supabase/supabaseAdmin";
import debugAndThrowError from "@/supabase/debugAndThrowError";
import { DefaultConnectionArguments } from "@pothos/plugin-relay";
import resolveConnection from "../../utils/resolveConnection";

builder.node("Flashcard", {
  description: "A Flashcard.",
  id: {
    resolve: (v: Flashcard) => v.id
  },
  loadOne: async (id: string, { viewer }) => {
    const { data, error } = await supabaseAdmin
      .from("flashcard")
      .select("*")
      .eq("id", id)
      .match({
        user_id: viewer?.id
      })
      .single();
    debugAndThrowError(error);
    return data;
  },
  fields: (t) => ({
    _id: t.string({
      resolve: (v: Flashcard) => v.id,
      description: "The unique identifier of the flashcard."
    }),
    type: t.field({
      type: FlashcardTypeEnumType,
      resolve: (v: Flashcard) => v.type,
      nullable: false,
      description: "The type of the flashcard."
    }),
    createdAt: t.string({
      resolve: (v: Flashcard) => v.created_at,
      nullable: false,
      description: "The date of creation of the flashcard."
    }),
    nextAvailableAt: t.string({
      resolve: (v: Flashcard) => v.next_available_at,
      nullable: true,
      description: "When the flashcard will be in review."
    }),
    flashcardText: t.string({
      resolve: (v: Flashcard) => v.flashcard_text,
      nullable: false,
      description: "What is shown to help the user guess."
    }),
    hint: t.string({
      resolve: (v: Flashcard) => v.hint,
      nullable: true,
      description: "An optional hint."
    }),
    answerInfos: t.string({
      resolve: (v: Flashcard) => v.answer_infos,
      nullable: true,
      description: "Information about the answer."
    }),
    sourceLanguage: t.string({
      resolve: (v: Flashcard) => v.source_language,
      nullable: false,
      description: "The language of the flashcard text."
    }),
    destLanguage: t.string({
      resolve: (v: Flashcard) => v.source_language,
      nullable: false,
      description: "The language of the flashcard answers."
    }),
    flashcardAnswers: t.connection({
      type: "FlashcardAnswer",
      resolve: async (v: Flashcard, args: DefaultConnectionArguments) => {
        const select = "*";
        const dataQuery = supabaseAdmin.from("flashcard_answer").select(select);

        const countQuery = supabaseAdmin
          .from("flashcard_answer")
          .select(select, { head: true, count: "exact" });

        [countQuery, dataQuery].forEach((query) => {
          query.eq("flashcard_id", v.id);
        });

        dataQuery.order("last_used_at", {
          ascending: false
        });

        const { count } = await countQuery;
        return resolveConnection<FlashcardAnswer>(args, dataQuery, count);
      },
      nullable: false,
      description: "The answers associated with the flashcard."
    })
  })
});
