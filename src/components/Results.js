import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Button } from './Button';
import { fetchGif } from '../api/giphy';
import { CheckCircleFill } from '@styled-icons/bootstrap/';
import { CircleWithCross } from '@styled-icons/entypo/';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultMsg = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
`;
const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ListItem = styled.li`
  display: inline-grid;
  width: 15em;
  grid-template-columns: 80% 20%;
  margin: 1em;
  padding: 1em;
  border-radius: 8px;
  background: ${({ correctGuessBg, incorrectGuessBg }) =>
    correctGuessBg ? '#27AE60' : incorrectGuessBg ? '#EB5757' : '#E0E0E0'};
  color: ${({ correctGuessBg, incorrectGuessBg }) =>
    correctGuessBg ? '#F2F2F2' : incorrectGuessBg ? '#F2F2F2' : '#333333'};
`;
const CorrectIcon = styled(CheckCircleFill)`
  height: 1.5em;
  color: white;
`;
const IncorrectIcon = styled(CircleWithCross)`
  height: 1.5em;
  color: white;
`;

export const Results = ({ newGame, questions }) => {
  const [score, setScore] = useState(getScorePercentage(questions));
  const [resultGif, setResultGif] = useState(null);

  function onNewGame() {
    newGame();
  }
  function getScore(questions) {
    if (!questions) {
      return;
    }
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].guessedAnswer === questions[i].correct_answer) {
        score += 1;
      }
    }
    return score;
  }
  function getScorePercentage(questions) {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].guessedAnswer === questions[i].correct_answer) {
        score += 1;
      }
    }
    return Math.round((score / questions.length) * 100);
  }
  const checkGuess = (guess, answer) => {
    if (answer === guess) {
      return true;
    } else {
      return false;
    }
  };
  function renderAnswers(answers, index) {
    return answers.map((answer) => {
      return (
        <ListItem
          key={_.uniqueId()}
          correctGuessBg={
            answer === questions[index].correct_answer && answer === questions[index].guessedAnswer
              ? true
              : false
          }
          incorrectGuessBg={
            answer !== questions[index].correct_answer && answer === questions[index].guessedAnswer
              ? true
              : false
          }
        >
          {answer}
          {answer === questions[index].guessedAnswer ? (
            answer === questions[index].correct_answer ? (
              <CorrectIcon />
            ) : (
              <IncorrectIcon />
            )
          ) : null}
        </ListItem>
      );
    });
  }

  function renderResults() {
    return questions.map((question, index) => {
      return (
        <div key={index}>
          <h4>Q: {question.question}</h4>
          <List>{renderAnswers(question.allAnswers, index)}</List>
        </div>
      );
    });
  }
  return (
    <Container>
      <ResultMsg>Well Done!</ResultMsg>
      <img src={resultGif} />
      <h1>
        Correct: {getScore()}/{questions.length}
      </h1>
      {renderResults()}
      <Button onClick={onNewGame}>New Game</Button>
    </Container>
  );
};
