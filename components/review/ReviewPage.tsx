'use client';
import { useLazyLoadQuery, graphql } from "react-relay";
import { ReviewPageQuery } from "./__generated__/ReviewPageQuery.graphql";
import dayjs from "dayjs";


export default function ReviewPage() {
  const data = useLazyLoadQuery<ReviewPageQuery>(graphql`
query ReviewPageQuery($availableBefore: String!) {
    flashcards(availableBefore: $availableBefore) {
      edges {
        node {
          id
          flashcardText
        }
      }
      totalCount
    }
  }`, {
    availableBefore: dayjs().toISOString().split('T')[0],
  },     {
      fetchPolicy: 'store-and-network',
    });

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold">Flashcards</h1>
              <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
    </div>
  );
}
