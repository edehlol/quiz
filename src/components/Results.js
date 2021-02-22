import React from 'react';

export const Results = ({ newGame, questions, submittedAnswers }) => {
  function onNewGame() {
    newGame();
  }

  function renderAnswers() {
    console.log(questions[0].question);
    console.log(submittedAnswers);
    // return questions.map((question) => {
    //   return <div>{question === submittedAnswers ? 'correct' : 'false'}</div>;
    // });
  }
  return (
    <div>
      <h4>{questions[0].question}</h4>
      {renderAnswers()}
      <button onClick={onNewGame}>New Game</button>
    </div>
  );
};
