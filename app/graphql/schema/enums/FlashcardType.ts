import { FlashcardType } from "@/lib/type";
import builder from "../../builder";

export const FlashcardTypeEnumType = builder.enumType("FlashcardType", {
  description: "The possible flashcard types",
  values: Object.fromEntries(
    new Map(
      Object.values(FlashcardType).map((s) => [
        s,
        { description: `${s}`, value: s }
      ])
    )
  )
});
