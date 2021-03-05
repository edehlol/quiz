import styled from 'styled-components';

export const Button = styled.button`
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
  &:hover {
    cursor: pointer;
  }
`;
