import { JSX } from "react";
import { graphql, useFragment } from "react-relay";
import { ReviewAnswer_flashcard$key } from "./__generated__/ReviewAnswer_flashcard.graphql";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewFlashcard } from "../ReviewPageContent";

type Props = {
  flashcard: ReviewFlashcard;
  isAnswerVisible: boolean;
};
const ReviewAnswer = (props: Props): JSX.Element => {
  const { flashcard, isAnswerVisible } = props;

  if (!isAnswerVisible) {
    return <></>;
  }

  return (
    <Card className="w-full border-2 bg-gray-100 text-black py-10 flex flex-col items-center justify-center align-center mx-5">
      <CardContent>
        <ul>
          {(flashcard.flashcardAnswers.edges ?? []).map((edge) => {
            return <li key={edge!.node.id}>{edge!.node.answer}</li>;
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ReviewAnswer;
