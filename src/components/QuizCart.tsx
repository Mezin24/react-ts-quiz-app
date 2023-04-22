type Props = {
  question: string;
  answer: string;
  answers: string[];
  cb: any;
  userAnswer: any;
  questionNum: number;
  totalQustions: number;
};

const QuizCart = ({
  answer,
  answers,
  cb,
  question,
  questionNum,
  totalQustions,
  userAnswer,
}: Props) => {
  return <div>QuizCart</div>;
};
export default QuizCart;
