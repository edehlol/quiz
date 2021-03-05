import React from 'react';
import { List, ListItem } from './style';

export const AnswerList = ({ question, QuestionBtn, selectAnswer }) => {
  function renderAnswers() {
    return question.allAnswers.map((answer, index) => {
      return (
        <ListItem key={index}>
          <QuestionBtn onClick={() => selectAnswer(answer)}>{answer}</QuestionBtn>
        </ListItem>
      );
    });
  }
  return <List>{renderAnswers()}</List>;
};
