import React, { useEffect, useState } from 'react';
import { decode } from 'html-entities';

export const Question = ({ question, nextQuestion, submitAnswer, setAnswerHistory }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    function createAnswers() {
      return question.incorrect_answers
        .concat(question.correct_answer)
        .sort(() => Math.random() - 0.5);
    }
    setAnswers(createAnswers());
  }, [question]);

  useEffect(() => {
    if (answers) {
      setAnswerHistory((answerHistory) => [...answerHistory, answers]);
    }
  }, [answers, setAnswerHistory]);

  function onNextQuestionClick() {
    submitAnswer(selectedAnswer);
    setSelectedAnswer(null);
    nextQuestion();
  }
  function onClickAnswer(e) {
    setSelectedAnswer(e.target.defaultValue);
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
          <label htmlFor={index}>{decode(answer)}</label>
        </div>
      );
    });
  }
  if (answers) {
    return (
      <div>
        <h4>{decode(question.question)}</h4>
        <form>{renderAnswers()}</form>
        <button onClick={onNextQuestionClick}>Next</button>
      </div>
    );
  } else {
    return <div></div>;
  }
};
