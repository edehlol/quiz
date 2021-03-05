import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { decode } from 'html-entities';
import { AnswerList } from './AnswerList';
import { NavigateNext } from '@styled-icons/material-outlined/';
import { Button } from './Button';
import { Divider } from './Divider';

const Container = styled.div`
  display: flex;
  padding: 2em;
  flex-direction: column;
  align-items: center;
`;

const shake = keyframes`
    10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;
const NextBtn = styled(Button)`
  background: #2f80ed;
  color: #f2f2f2;
  font-weight: 600;
  display: inline-grid;
  align-items: center;
  justify-items: center;
  padding: 0.75em;
  grid-template-columns: 20% 60% 20%;
  animation: ${(props) =>
    props.shake &&
    css`
      ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both
    `};

  &:hover {
    background: #2159a4;
  }
`;
const NextBtnText = styled.span`
  grid-column: 2;
`;
const NextIcon = styled(NavigateNext)`
  height: 2rem;
  grid-column: 3;
`;

const QuestionBtn = styled(Button)`
  background: #e0e0e0;
  color: black;
  font-weight: 400;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 25%);
  &:hover {
    background: ${(props) => (props.selected ? '#4F4F4F' : '#bdbdbd')};
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 50%);
  }
  &:active {
    background: #4f4f4f;
    color: #f2f2f2;
    font-weight: 600;
  }
`;
const Title = styled.h4`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2em;
  text-align: center;
`;

export const Question = ({ question, nextQuestion, submitAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shake, setShake] = useState(false);

  function shakeButton() {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 1000);
  }
  // NEW
  const onSelectAnswer = (answer) => {
    submitAnswer(answer);
    nextQuestion();
  };
  // OLD
  function onNextQuestionClick() {
    if (selectedAnswer !== null) {
      submitAnswer(selectedAnswer);
      setSelectedAnswer(null);
      nextQuestion();
    } else {
      shakeButton();
    }
  }
  return (
    <Container>
      <Title>{decode(question.question)}</Title>
      <p>Category: {question.category}</p>
      <AnswerList
        question={question}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        selectAnswer={onSelectAnswer}
        QuestionBtn={QuestionBtn}
      />
      <Divider></Divider>
      <NextBtn onClick={onNextQuestionClick} shake={shake}>
        <NextBtnText>Next</NextBtnText>
        <NextIcon />
      </NextBtn>
    </Container>
  );
};
