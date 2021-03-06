import React from 'react';
import { Title, QuestionBtn } from './style';
import { Container } from '../Container';
import { decode } from 'html-entities';
import { AnswerList } from './AnswerList';

export const Question = ({ question, nextQuestion, submitAnswer }) => {
  const onSelectAnswer = (answer) => {
    submitAnswer(answer);
    nextQuestion();
  };
  return (
    <Container>
      <Title>{decode(question.question)}</Title>
      <p>Category: {question.category}</p>
      <AnswerList question={question} selectAnswer={onSelectAnswer} QuestionBtn={QuestionBtn} />
    </Container>
  );
};