import React, { useEffect, useState } from 'react';
import { Question } from './Question';
import { Results } from './Results';
import { decode } from 'html-entities';

const App = () => {
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(null);

  async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=2').then((response) =>
      response.json()
    );
    function createAnswers(correct, incorrect) {
      return incorrect.concat(correct).sort(() => Math.random() - 0.5);
    }

    const createQuestions = (fetchedQuestions) => {
      return fetchedQuestions.map((question) => {
        return {
          question: decode(question.question),
          incorrect_answers: question.incorrect_answers.map((answer) => decode(answer)),
          correct_answer: decode(question.correct_answer),
          allAnswers: createAnswers(question.correct_answer, question.incorrect_answers),
          guessedAnswer: '',
        };
      });
    };
    setQuestions(createQuestions(response.results));
  }

  function nextQuestion() {
    if (questions.findIndex((question) => question === currentQuestion) === questions.length - 1) {
      setGameCompleted(true);
      getScore();
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
  function getScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].guessedAnswer === questions[i].correct_answer) {
        score++;
      }
    }
    setScore(score);
  }
  function newGame() {
    fetchQuestions();
    setGameCompleted(false);
  }

  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    if (questions) {
      if (questions[0].guessedAnswer === '') setCurrentQuestion(questions[0]);
    }
  }, [questions]);

  if (gameCompleted) {
    return <Results newGame={newGame} questions={questions} score={score} />;
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
