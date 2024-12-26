"use client";
import { useLazyLoadQuery, graphql } from "react-relay";
import { ReviewPageQuery } from "./__generated__/ReviewPageQuery.graphql";
import dayjs from "dayjs";
import ReviewPageContent from "./ReviewPageContent";
import { encodeBase64 } from "@pothos/core";

export default function ReviewPage() {
  const data = useLazyLoadQuery<ReviewPageQuery>(
    graphql`
      query ReviewPageQuery($userId: ID!, $availableBefore: String!) {
        node(id: $userId) {
          ... on User {
            ...ReviewPageContent @arguments(availableBefore: $availableBefore)
          }
        }
      }
    `,
    {
      availableBefore: dayjs().toISOString().split("T")[0],
      userId: encodeBase64("User:814f1337-2b5f-4574-b0d5-1e903ff0ff28"),
    },
    {
      fetchPolicy: "network-only",
      // fetchPolicy: "store-and-network",
    },
  );

  if (!data?.node) {
    return <div>No flashcards available</div>;
  }
  return (
    <div className="flex flex-col space-y-6">
      <ReviewPageContent reviewData={data.node} />
    </div>
  );
}
