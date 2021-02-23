import React from 'react';

export const Results = ({ newGame, questions, submittedAnswers, answerHistory }) => {
  function onNewGame() {
    newGame();
  }

  function renderAnswers(answers, index) {
    return answers.map((answer) => {
      return (
        <li
          style={{
            color:
              answer === questions[index].correct_answer
                ? 'green'
                : answer === submittedAnswers[index]
                ? 'red'
                : 'black',
          }}
        >
          {answer}
        </li>
      );
    });
  }

  function renderResults() {
    return questions.map((question, index) => {
      return (
        <div>
          <h4>{question.question}</h4>
          <ul>{renderAnswers(answerHistory[index], index)}</ul>
        </div>
      );
    });
  }
  return (
    <div>
      <h1>Correct: {}</h1>
      {renderResults()}
      <button onClick={onNewGame}>New Game</button>
    </div>
  );
};
