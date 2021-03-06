import React, { useEffect, useState, useCallback } from 'react';
import { fetchGif } from '../../api/giphy';
import _ from 'lodash';
import {
  ListItem,
  CorrectIcon,
  IncorrectIcon,
  QuestionTitle,
  List,
  ResultMsg,
  NewGameBtn,
  NewGameIcon,
  Gif,
} from './style';
import { Divider } from '../Divider';
import { Container } from '../Container';
export const Results = ({ newGame, questions, setGameStarted }) => {
  const [resultGif, setResultGif] = useState(null);

  const scoreResponse = useCallback((questions) => {
    const badScore = ['Damn', "That's bad", 'Oh no', 'Try again'];
    const goodScore = ['Well Done', "That's amazing!", 'You are great'];
    const score = getScorePercentage(questions);

    if (score < 50) {
      return badScore[Math.floor(Math.random() * badScore.length)];
    } else {
      return goodScore[Math.floor(Math.random() * goodScore.length)];
    }
  }, []);

  useEffect(() => {
    fetchGif(scoreResponse(questions)).then((response) => setResultGif(response));
  }, [questions, scoreResponse]);

  function onNewGame() {
    // newGame();
    setGameStarted(false);
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
      <ResultMsg>{scoreResponse(questions)}</ResultMsg>
      {resultGif && <Gif src={resultGif.images.downsized.url} alt={resultGif.title} />}
      <h1>
        Correct: {getScore(questions)}/{questions.length}
      </h1>
      {renderResults()}
      <Divider />
      <NewGameBtn onClick={onNewGame}>
        New Game
        <NewGameIcon />
      </NewGameBtn>
    </Container>
  );
};
