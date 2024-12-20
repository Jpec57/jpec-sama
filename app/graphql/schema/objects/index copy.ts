// import builder from "../../builder";

// builder.objectType("Flashcard", {
//   description: "A Flashcard discount object.",
//   fields: (t) => ({
//     type: t.string({
//       resolve: (v: Flashcard) => v!.type,
//       nullable: false,
//       description: "The type of discount."
//     }),
//     value: t.string({
//       resolve: (v: Flashcard) => v!.value!,
//       nullable: false,
//       description: "The value of the discount."
//     })
//   })
// });
