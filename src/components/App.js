import React, { useEffect, useState } from 'react';
import getQuestions from '../api/trivia';
import { Question } from './Question/';
import { Results } from './Results';

const App = () => {
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    getQuestions().then((response) => {
      setQuestions(response);
      setFirstQuestion(response);
    });
  }, []);

  function setFirstQuestion(questionArray) {
    setCurrentQuestion(questionArray[0]);
  }

  function nextQuestion() {
    if (questions.findIndex((question) => question === currentQuestion) === questions.length - 1) {
      setGameCompleted(true);
    } else {
      setCurrentQuestion(
        questions[questions.findIndex((question) => question === currentQuestion) + 1]
      );
    }
  }
  function submitAnswer(answer) {
    setQuestions(
      questions.map((question) => {
        return question.allAnswers.includes(answer)
          ? { ...question, guessedAnswer: answer }
          : question;
      })
    );
  }
  function newGame() {
    getQuestions().then((response) => {
      setQuestions(response);
      setFirstQuestion(response);
    });
    setGameCompleted(false);
  }

  if (gameCompleted) {
    return <Results newGame={newGame} questions={questions} />;
  } else {
    return (
      <div>
        {currentQuestion && (
          <Question
            question={currentQuestion}
            nextQuestion={nextQuestion}
            submitAnswer={submitAnswer}
          />
        )}
      </div>
    );
  }
};

export default App;
