import { LanguageCode } from "@/lib/type";
import builder from "../../builder";

export const LanguageCodeEnumType = builder.enumType("LanguageCode", {
  description: "The possible language codes",
  values: Object.fromEntries(
    new Map(
      Object.values(LanguageCode).map((s) => [
        s,
        { description: `${s}`, value: s }
      ])
    )
  )
});
