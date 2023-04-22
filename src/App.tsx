import { useState } from 'react';
import QuizCart from './components/QuizCart';
import { Difficulty, QuestionState, fetchQuizQuestions } from './API';
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setIsGameOver(false);

    const quiz = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(quiz);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isGameOver) return;

    const answer = e.currentTarget.value;
    const correct = questions[number].correct_answer === answer;

    if (correct) setScore((prev) => prev + 1);

    const answerObject: AnswerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer,
    };

    setUserAnswers((prev) => [...prev, answerObject]);
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setIsGameOver(true);
    } else {
      setNumber((prev) => prev + 1);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper className='app'>
        <h1>Quiz App</h1>
        {(isGameOver || userAnswers.length === TOTAL_QUESTIONS) && (
          <button className='start' onClick={startQuiz}>
            Start
          </button>
        )}
        {!isGameOver && <p className='score'>Score: {score}</p>}
        {loading && <p>Loading Questions</p>}
        {!loading && !isGameOver && (
          <QuizCart
            questionNum={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            cb={checkAnswer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
          />
        )}
        {!isGameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 && (
            <button className='next' onClick={nextQuestion}>
              Next Question
            </button>
          )}
      </Wrapper>
    </>
  );
};
export default App;
