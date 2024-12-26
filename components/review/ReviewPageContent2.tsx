"use client";
import { JSX, useEffect, useState } from "react";
// import ReviewHeader from "./elements/ReviewHeader";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import ReviewAnswer from "./elements/ReviewAnswer";
// import getComparableString from "@/utils/str/getComparableString";
// import getRandomArrayIndex from "@/utils/array/getRandomArrayIndex";
// import getNextLevel from "@/lib/review/getNextLevel";
// import { ReviewedFlashcard } from "@/lib/type";
// import { ReviewPageContent2Mutation } from "./__generated__/ReviewPageContent2Mutation.graphql";
import { graphql, useFragment, useMutation } from "react-relay";
import {
  ReviewPageContent2$data,
  ReviewPageContent2$key,
} from "./__generated__/ReviewPageContent2.graphql";

export type ReviewFlashcard =
  ReviewPageContent2$data["reviewCards"]["edges"][number]["node"];
type Props = {
  reviewData: ReviewPageContent2$key;
};
const ReviewPageContent2 = (props: Props): JSX.Element => {
  const { reviewData } = props;

  const reviewFlashcards = useFragment(
    graphql`
      fragment ReviewPageContent2 on User
      @argumentDefinitions(availableBefore: { type: "String!" }) {
        reviewCards(first: 100, availableBefore: $availableBefore) {
          edges {
            node {
              id
              flashcardText
              hint
              level
              flashcardAnswers(first: 10) {
                edges {
                  node {
                    id
                    lastUsedAt
                    answer
                  }
                }
              }
            }
          }
          totalCount
        }
      }
    `,
    reviewData,
  );
  if (!reviewFlashcards?.reviewCards) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col space-y-6">
      <pre>{JSON.stringify(reviewFlashcards, null, 2)}</pre>
    </div>
  );

  // const [remainingFlashcards, setRemainingFlashcards] = useState<
  //   ReviewFlashcard[]
  // >([]);
  // const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  // const [inErrorFlashcards, setInErrorFlashcards] = useState<
  //   ReviewedFlashcard[]
  // >([]);
  // const [doneFlashcards, setDoneFlashcards] = useState<ReviewedFlashcard[]>([]);
  // const [flashcardIndex, setFlashcardIndex] = useState(0);

  //   useEffect(() => {
  //   const flashcards = reviewFlashcards.reviewCards.edges.map(
  //     (edge) => edge!.node
  //   );
  //   setRemainingFlashcards(flashcards);
  //     // setFlashcardIndex(0);
  //         console.log("Use effect called with flashcards", flashcards);

  // }, [reviewFlashcards?.reviewCards?.edges]);

  // const [commitMutation, isMutationInFlight] =
  //   useMutation<ReviewPageContent2Mutation>(graphql`
  //     mutation ReviewPageContent2Mutation($input: SendReviewInput!) {
  //       sendReview(input: $input) {
  //         user {
  //           ...ReviewPageContent2 @arguments(availableBefore: "2024-12-26")
  //         }
  //       }
  //     }
  //   `);

  // const submitReview = async () => {
  //   commitMutation({
  //     variables: {
  //       input: { reviewedFlashcards: doneFlashcards },
  //     },
  //     onCompleted: (response) => {
  //       console.dir({ response }, { depth: null });

  //       if (response.sendReview) {
  //                   console.log("No response");

  //         return;
  //       }
  //         setDoneFlashcards([]);
  //         //@ts-ignore This exists
  //         const remainingCards = response?.sendReview?.user?.reviewCards ?? [];
  //         setInErrorFlashcards([]);
  //         setRemainingFlashcards(
  //           remainingCards.edges.map(
  //             (edge: { node: ReviewFlashcard }) => edge!.node,
  //           ),
  //         );
  //         setFlashcardIndex(
  //           getRandomArrayIndex(remainingCards?.edges.length ?? 0),
  //         );

  //     },
  //   });
  // };

  // if (!reviewFlashcards?.reviewCards) {
  //   return <div>Loading...</div>;
  // }

  // if (flashcardIndex >= remainingFlashcards.length) {
  //   return <div>No flashcards available</div>;
  // }
  // const flashcard = remainingFlashcards[flashcardIndex];
  // const onSubmit = (formData: FormData) => {
  //   if (isAnswerVisible) {
  //     setIsAnswerVisible(false);
  //     setFlashcardIndex(getRandomArrayIndex(remainingFlashcards.length));
  //     return;
  //   }
  //   const givenAnswer = getComparableString(formData.get("answer")?.toString());
  //   if (!givenAnswer || givenAnswer.length === 0) {
  //     return;
  //   }
  //   const possibleAnswers = flashcard.flashcardAnswers.edges.map((edge) =>
  //     getComparableString(edge!.node.answer),
  //   );
  //   console.dir({ givenAnswer, possibleAnswers }, { depth: null });
  //   if (possibleAnswers.includes(givenAnswer)) {
  //     console.log("Correct answer");
  //     const inErrorFlashcard = inErrorFlashcards.find(
  //       (f) => f.id === flashcard.id,
  //     );
  //     const errorCount = inErrorFlashcard?.errorCount ?? 0;
  //     setDoneFlashcards([
  //       ...doneFlashcards,
  //       {
  //         id: flashcard.id,
  //         givenAnswer,
  //         errorCount,
  //         nextLevel: getNextLevel(flashcard.level, errorCount === 0),
  //       },
  //     ]);
  //     const newRemainingFlashcards = remainingFlashcards.filter(
  //       (f) => f.id !== flashcard.id,
  //     );
  //     setRemainingFlashcards(newRemainingFlashcards);
  //     setFlashcardIndex(getRandomArrayIndex(newRemainingFlashcards.length));
  //   } else {
  //     const errorCount =
  //       inErrorFlashcards.find((f) => f.id === flashcard.id)?.errorCount ??
  //       0 + 1;
  //     console.log("Incorrect answer");
  //     setIsAnswerVisible(true);
  //     setInErrorFlashcards([
  //       ...inErrorFlashcards,
  //       {
  //         ...flashcard,
  //         errorCount,
  //         givenAnswer,
  //         nextLevel: getNextLevel(flashcard.level, false),
  //       },
  //     ]);
  //   }
  // };
  // console.dir({ inErrorFlashcards, doneFlashcards }, { depth: null });
  // if (isMutationInFlight) {
  //   return <div>Sending review...</div>;
  // }
  // return (
  //   <>
  //     <div className="flex justify-between space-x-2">
  //       <Button onClick={submitReview}>Submit Review</Button>
  //       <div className="flex justify-center space-x-5">
  //         <div>📥: {remainingFlashcards.length}</div>
  //         <div>✅: {doneFlashcards.length}</div>
  //         <div>❌: {inErrorFlashcards.length}</div>
  //       </div>
  //     </div>
  //     <ReviewHeader flashcard={flashcard} />
  //     <form
  //       action={onSubmit}
  //       className="flex w-full items-center space-x-2 px-5"
  //     >
  //       <Input
  //         type="text"
  //         name="answer"
  //         lang="ja"
  //         placeholder="Answer"
  //         autoComplete="off"
  //         autoFocus
  //         className=" w-full border-solid	border-2 border-gray-400"
  //       />
  //       <Button type="submit">Submit</Button>
  //     </form>
  //     <ReviewAnswer flashcard={flashcard} isAnswerVisible={isAnswerVisible} />
  //   </>
  // );
};

export default ReviewPageContent2;
