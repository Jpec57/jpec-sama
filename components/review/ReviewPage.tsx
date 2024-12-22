import { useLazyLoadQuery, graphql } from "react-relay";
import { ReviewPageQuery } from "./__generated__/ReviewPageQuery.graphql";
import { useEffect, useState } from "react";
import fetchGraphQL from "@/relay/fetchGraphQL";

const query = graphql`
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
  }`;
export default function ReviewPage() {
  // const data = useLazyLoadQuery<ReviewPageQuery>(query, {});
  const [data, setData] = useState()

  // When the component mounts we'll fetch a repository name
  useEffect(() => {
    let isMounted = true;
    fetchGraphQL(`
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
    `).then(response => {
      // Avoid updating state if the component unmounted before the fetch completes
      if (!isMounted) {
        return;
      }
      const data = response.data;
      setData(data);
    }).catch(error => {
      console.error(error);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold">Flashcards</h1>
              <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      {/* <p>Total Flashcards: {data.flashcards.totalCount}</p>
      <ul className="space-y-2">
        {data.flashcards.edges.map(({ node }) => (
          <li key={node.id} className="p-4 border rounded">
            {node.flashcardText}
          </li>
        ))}
      </ul> */}
    </div>
  );
}
