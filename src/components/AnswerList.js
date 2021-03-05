import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  padding-left: 0;
  margin-bottom: 2em;
`;
const ListItem = styled.li`
  list-style-type: none;
`;

export const AnswerList = ({
  question,
  setSelectedAnswer,
  selectedAnswer,
  QuestionBtn,
  selectAnswer,
}) => {
  function renderAnswers() {
    return question.allAnswers.map((answer, index) => {
      return (
        <ListItem key={index}>
          <QuestionBtn
            selected={selectedAnswer === answer ? true : false}
            onClick={() => selectAnswer(answer)}
          >
            {answer}
          </QuestionBtn>
        </ListItem>
      );
    });
  }
  return <List>{renderAnswers()}</List>;
};
