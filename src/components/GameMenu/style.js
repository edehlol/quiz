import styled from 'styled-components';
import { Button } from '../Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Title = styled.h2`
  margin-top: 0;
`;

export const Form = styled.form`
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  margin-bottom: 0.5em;
  font-weight: 600;
`;

export const Select = styled.select`
  width: 100%;
  height: 3em;
  padding-left: 0.5em;
  padding-right: 1em;
  border-radius: 4px;
  margin-bottom: 2em;
`;

export const StartGameBtn = styled(Button)`
  margin-top: 2em;
  background: #2f80ed;
  color: white;
  font-weight: 600;
`;
