import { JSX, useState } from "react";
import { ReviewFlashcard } from "../ReviewPageContent";

type Props = {
  flashcard: ReviewFlashcard;
};
const ReviewHeader = (props: Props): JSX.Element => {
  const { flashcard } = props;
  const [isHintVisible, setIsHintVisible] = useState(false);

  return (
    <div className="bg-gray-100 text-black py-10 flex flex-col items-center justify-center align-center">
      <h1 onClick={() => setIsHintVisible(true)}>{flashcard.flashcardText}</h1>
      {isHintVisible ? <h3 className="italic">{flashcard.hint}</h3> : null}
    </div>
  );
};

export default ReviewHeader;
