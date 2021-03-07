import styled from 'styled-components';

import { Button } from '../Button';

export const QuestionBtn = styled(Button)`
  background: #e0e0e0;
  color: black;
  font-weight: 400;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 25%);
  &:hover {
    background: ${(props) => (props.selected ? '#4F4F4F' : '#bdbdbd')};
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 50%);
    font-weight: 600;
  }
  &:active {
    background: #4f4f4f;
    color: #f2f2f2;
    font-weight: 600;
  }
`;
export const Title = styled.h4`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2em;
  text-align: left;
`;
export const Index = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0;
  margin-top: 0;
`;

// AnswerList

export const List = styled.ul`
  padding-left: 0;
  margin-bottom: 2em;
`;
export const ListItem = styled.li`
  list-style-type: none;
`;
