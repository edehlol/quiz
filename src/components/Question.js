import React, { useState } from 'react';
import styled from 'styled-components';
import { decode } from 'html-entities';
import { AnswerList } from './AnswerList';
import { NavigateNext } from '@styled-icons/material-outlined/';

const Container = styled.div`
  display: flex;
  padding: 2em;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  background: ${'#e0e0e0'};
  border: none;
  border-radius: 8px;
  padding: 1em;
  margin-bottom: 2em;
  width: 15em;
  font-size: 1rem;
  font-family: 'Source Sans Pro', sans-serif;
  &:focus {
    outline: none;
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
  &:active {
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
const Divider = styled.div`
  height: 2px;
  background: #e0e0e0;
  width: 24em;
  margin-bottom: 2em;
`;

const QuestionBtn = styled(Button)`
  background: ${(props) => (props.selected ? '#4F4F4F' : '#e0e0e0')};
  color: ${(props) => (props.selected ? '#F2F2F2' : 'black')};
  font-weight: ${(props) => (props.selected ? '600' : '400')};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 25%);
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

  function onNextQuestionClick() {
    if (selectedAnswer !== null) {
      submitAnswer(selectedAnswer);
      setSelectedAnswer(null);
      nextQuestion();
    }
  }
  return (
    <Container>
      <Title>{decode(question.question)}</Title>
      {/* <p>Category: {question.category}</p> */}
      <AnswerList
        question={question}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        QuestionBtn={QuestionBtn}
      />
      <Divider></Divider>
      <NextBtn onClick={onNextQuestionClick}>
        <NextBtnText>Next</NextBtnText>
        <NextIcon />
      </NextBtn>
    </Container>
  );
};
