import React, { useEffect, useState } from 'react';
import { Question } from './Question';

const App = () => {
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  async function fetchQuestions() {
    const response = await fetch(
      'https://opentdb.com/api.php?amount=10&category=23&type=multiple'
    ).then((response) => response.json());
    setQuestions(response.results);
  }
  function nextQuestion() {
    if (questions.findIndex((question) => question === currentQuestion) === questions.length - 1) {
      console.log(submittedAnswers);
    } else {
      setCurrentQuestion(
        questions[questions.findIndex((question) => question === currentQuestion) + 1]
      );
    }
  }
  function submitAnswer(answer) {
    setSubmittedAnswers((submittedAnswers) => [...submittedAnswers, answer]);
  }

  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    if (questions) {
      setCurrentQuestion(questions[0]);
    }
  }, [questions]);
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
};

export default App;
