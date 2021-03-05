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
  padding: 2em;
`;
const QuestionTitle = styled.h4`
  color: ${({ correctGuess }) => (correctGuess ? '#27AE60' : '#EB5757')};
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
  width: 16em;
  grid-template-columns: 80% 20%;
  margin: 1em;
  padding: 1em;
  border-radius: 8px;
  background: ${({ correctGuessBg, incorrectGuessBg }) =>
    correctGuessBg ? '#27AE60' : incorrectGuessBg ? '#EB5757' : '#E0E0E0'};
  color: ${({ correctGuessBg, incorrectGuessBg, correctAnswer }) =>
    correctGuessBg || incorrectGuessBg ? '#FFFFFF' : correctAnswer ? '#27AE60' : '#000000'};
  font-weight: ${({ correctGuessBg, incorrectGuessBg, correctAnswer }) =>
    correctGuessBg || incorrectGuessBg || correctAnswer ? '600' : '400'};
  box-sizing: border-box;
  border: ${({ correctAnswer }) => (correctAnswer ? '2px solid #27AE60' : 'none')};
`;
const CorrectIcon = styled(CheckCircleFill)`
  height: 1.5em;
  color: white;
`;
const IncorrectIcon = styled(CircleWithCross)`
  height: 1.5em;
  color: white;
`;
const NewGameBtn = styled(Button)`
  width: 16em;
  background: #2f80ed;
  color: white;
  font-weight: 600;
`;

export const Results = ({ newGame, questions }) => {
  // const [score, setScore] = useState(getScorePercentage(questions));
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
          correctAnswer={
            answer === questions[index].correct_answer && answer !== questions[index].guessedAnswer
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
          <QuestionTitle correctGuess={question.correct_answer === question.guessedAnswer}>
            Q: {question.question}
          </QuestionTitle>
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
        Correct: {getScore(questions)}/{questions.length}
      </h1>
      {renderResults()}
      <NewGameBtn onClick={onNewGame}>New Game</NewGameBtn>
    </Container>
  );
};
