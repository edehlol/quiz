import React, { useEffect, useState } from 'react';

export const Question = ({ question, nextQuestion, submitAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState(createAnswers());

  useEffect(() => {
    setAnswers(createAnswers());
  }, [question]);

  function onNextQuestionClick() {
    submitAnswer(selectedAnswer);
    setSelectedAnswer(null);
    nextQuestion();
  }
  function onClickAnswer(e) {
    setSelectedAnswer(e.target.defaultValue);
  }
  function createAnswers() {
    return question.incorrect_answers
      .concat(question.correct_answer)
      .sort(() => Math.random() - 0.5);
  }
  function renderAnswers() {
    return answers.map((answer, index) => {
      return (
        <div key={index}>
          <input
            type="radio"
            id={index}
            value={answer}
            name="quiz"
            defaultChecked={false}
            onChange={onClickAnswer}
          />
          <label htmlFor={index}>{answer}</label>
        </div>
      );
    });
  }
  return (
    <div>
      <h4>{question.question}</h4>
      <form>{renderAnswers()}</form>
      <button onClick={onNextQuestionClick}>Next</button>
    </div>
  );
};
