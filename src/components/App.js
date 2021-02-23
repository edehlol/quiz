import React, { useEffect, useState } from 'react';
import { Question } from './Question';
import { Results } from './Results';
import { decode } from 'html-entities';

const App = () => {
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);

  async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=2').then((response) =>
      response.json()
    );
    setQuestions(createQuestions(response.results));
  }
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
    setSubmittedAnswers((submittedAnswers) => [...submittedAnswers, answer]);
  }
  function newGame() {
    fetchQuestions();
    setSubmittedAnswers([]);
    setGameCompleted(false);
  }

  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    if (questions) {
      setCurrentQuestion(questions[0]);
    }
  }, [questions]);

  if (gameCompleted) {
    return (
      <Results
        newGame={newGame}
        questions={questions}
        submittedAnswers={submittedAnswers}
        answerHistory={answerHistory}
      />
    );
  } else {
    return (
      <div>
        {currentQuestion && (
          <Question
            question={currentQuestion}
            nextQuestion={nextQuestion}
            submitAnswer={submitAnswer}
            setAnswerHistory={setAnswerHistory}
          />
        )}
      </div>
    );
  }
};

export default App;
