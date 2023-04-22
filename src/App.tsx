import { useState } from 'react';
import QuizCart from './components/QuizCart';
import { Difficulty, fetchQuizQuestions } from './API';

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(true);

  const startQuiz = async () => {
    const quiz = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM);
    console.log(quiz);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  return (
    <>
      <h1>Quiz App</h1>
      <div className='start'>
        <button onClick={startQuiz}>Start</button>
        <p className='score'>Score:</p>
        <p>Loading Questions</p>
        {/* <QuizCart
          answer={questions[number].answers}
          questionNum={number + 1}
          question={questions[number].question}
          cb={checkAnswer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          totalQustions={TOTAL_QUESTIONS}
        /> */}
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
      </div>
    </>
  );
};
export default App;
