import React, { useEffect, useState } from 'react';
import getQuestions from '../api/trivia';
import { GameMenu } from './GameMenu/';
import { Question } from './Question/';
import { Results } from './Results/';

const App = () => {
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  function setFirstQuestion(questionArray) {
    setCurrentQuestion(questionArray[0]);
  }

  function nextQuestion() {
    if (
      questions.findIndex((question) => question.id === currentQuestion.id) ===
      questions.length - 1
    ) {
      setGameCompleted(true);
    } else {
      setCurrentQuestion(
        questions[questions.findIndex((question) => question.id === currentQuestion.id) + 1]
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

  function newGame(settings) {
    getQuestions(settings).then((response) => {
      setQuestions(response);
      setGameStarted(true);
      setFirstQuestion(response);
    });
    setGameCompleted(false);
  }
  if (!gameStarted) {
    return <GameMenu startGame={newGame} />;
  } else {
    if (gameCompleted) {
      return <Results newGame={newGame} questions={questions} setGameStarted={setGameStarted} />;
    } else {
      return (
        <div>
          {currentQuestion && (
            <Question
              question={currentQuestion}
              amountOfQuestions={questions.length}
              nextQuestion={nextQuestion}
              submitAnswer={submitAnswer}
            />
          )}
        </div>
      );
    }
  }
};

export default App;
