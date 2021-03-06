import styled from 'styled-components';
import { Button } from '../Button';

import { CheckCircleFill } from '@styled-icons/bootstrap/';
import { CircleWithCross } from '@styled-icons/entypo/';
import { CircleWithPlus } from '@styled-icons/entypo/';
import { Divider } from '../Divider';

export const QuestionTitle = styled.h4`
  color: ${({ correctGuess }) => (correctGuess ? '#27AE60' : '#EB5757')};
`;
export const ResultMsg = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
`;
export const Gif = styled.img`
  max-width: 100%;
`;
export const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ListItem = styled.li`
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
export const CorrectIcon = styled(CheckCircleFill)`
  height: 1.5em;
  color: white;
`;
export const IncorrectIcon = styled(CircleWithCross)`
  height: 1.5em;
  color: white;
`;
export const NewGameIcon = styled(CircleWithPlus)`
  height: 1.5em;
  color: white;
`;
export const NewGameBtn = styled(Button)`
  display: inline-grid;
  grid-template-columns: 80% 20%;
  width: 16em;
  background: #2f80ed;
  color: white;
  font-weight: 600;
  &:hover {
    background: #2159a4;
  }
`;
