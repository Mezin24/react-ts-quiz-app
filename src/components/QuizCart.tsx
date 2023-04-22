import { AnswerObject } from '../App';
import { Wrapper } from './QuizCard.styles';
import { ButtonWrapper } from './QuizCard.styles';

type Props = {
  question: string;
  answers: string[];
  cb(e: React.MouseEvent<HTMLButtonElement>): void;
  userAnswer: AnswerObject | undefined;
  questionNum: number;
  totalQuestions: number;
};

const QuizCart = ({
  answers,
  cb,
  question,
  questionNum,
  totalQuestions,
  userAnswer,
}: Props) => {
  return (
    <Wrapper>
      <p className='number'>
        Question: {questionNum} / {totalQuestions}
      </p>
      <p>{question}</p>
      {answers.map((q) => (
        <ButtonWrapper
          correct={userAnswer?.correctAnswer === q}
          userClicked={userAnswer?.answer === q}
          key={q}
        >
          <button onClick={cb} disabled={Boolean(userAnswer)} value={q}>
            <span>{q}</span>
          </button>
        </ButtonWrapper>
      ))}
    </Wrapper>
  );
};
export default QuizCart;
