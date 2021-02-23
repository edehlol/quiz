import React, { useState } from 'react';
import { decode } from 'html-entities';

export const Question = ({ question, nextQuestion, submitAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  function onNextQuestionClick() {
    submitAnswer(selectedAnswer);
    setSelectedAnswer(null);
    nextQuestion();
  }
  function onClickAnswer(e) {
    setSelectedAnswer(e.target.defaultValue);
  }

  function renderAnswers() {
    return question.allAnswers.map((answer, index) => {
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
          <label htmlFor={index}>{decode(answer)}</label>
        </div>
      );
    });
  }
  return (
    <div>
      <h4>{decode(question.question)}</h4>
      <form>{renderAnswers()}</form>
      <button onClick={onNextQuestionClick}>Next</button>
    </div>
  );
};
