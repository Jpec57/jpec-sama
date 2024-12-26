import fetchGraphQL from "@/relay/fetchGraphQL";

(async () => {
  const test = await fetchGraphQL(
    `
    query ReviewPageQuery {
  flashcards(availableBefore: "2024-12-22") {
    edges {
      node {
        id
        flashcardText
      }
    }
    totalCount
  }
}
        `,
    null,
  );
  console.dir({ test }, { depth: null });
})().catch(console.error);
