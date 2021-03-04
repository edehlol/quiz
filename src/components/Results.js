import React from 'react';
import _ from 'lodash';

export const Results = ({ newGame, questions }) => {
  function onNewGame() {
    newGame();
  }
  function getScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].guessedAnswer === questions[i].correct_answer) {
        score += 1;
      }
    }
    return score;
  }

  function renderAnswers(answers, index) {
    return answers.map((answer) => {
      return (
        <li
          key={_.uniqueId()}
          style={{
            color:
              answer === questions[index].correct_answer
                ? 'green'
                : answer === questions[index].guessedAnswer
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
        <div key={index}>
          <h4>{question.question}</h4>
          <ul>{renderAnswers(question.allAnswers, index)}</ul>
        </div>
      );
    });
  }
  return (
    <div>
      <h1>
        Correct: {getScore()}/{questions.length}
      </h1>
      {renderResults()}
      <button onClick={onNewGame}>New Game</button>
    </div>
  );
};
