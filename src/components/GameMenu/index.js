import React, { useState } from 'react';
import { Form, StartGameBtn, Select, Label, Title } from './style';
import { Container } from '../Container';

export const GameMenu = ({ startGame }) => {
  const [settings, setSettings] = useState({
    numberOfQuestions: 10,
    difficulty: '',
    category: 0,
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    startGame(settings);
  };
  // const onSelectNumberOfQuestions = (e) => {
  //   setSettings({ ...settings, numberOfQuestions: e.target.value });
  // };
  const onChangeCategory = (e) => {
    setSettings({ ...settings, category: e.target.value });
  };
  const onSelectDifficulty = (e) => {
    console.log(e.target.value);
    setSettings({ ...settings, difficulty: e.target.value });
  };
  return (
    <Container>
      <Title>Settings</Title>
      <Form onSubmit={onFormSubmit}>
        {/* <Label>Number of Questions</Label>
        <Select value={settings.numberOfQuestions} onChange={onSelectNumberOfQuestions}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </Select> */}

        <Label>Select Category</Label>
        <Select value={settings.category} onChange={onChangeCategory}>
          <option value={0}>Any Category</option>
          <option value={9}>General Knowledge</option>
          <option value={10}>Entertainment: Books</option>
          <option value={11}>Entertainment: Film</option>
          <option value={12}>Entertainment: Music</option>
          <option value={13}>Entertainment: Musicals & Theatres</option>
          <option value={14}>Entertainment: Television</option>
          <option value={15}>Entertainment: Video Games</option>
          <option value={16}>Entertainment: Board Games</option>
          <option value={29}>Entertainment: Comics</option>
          <option value={31}>Entertainment: Japanese Anime & Manga</option>
          <option value={32}>Entertainment: Cartoon & Aminations</option>
          <option value={17}>Science & Nature</option>
          <option value={18}>Science: Computers</option>
          <option value={19}>Science: Mathematics</option>
          <option value={30}>Science: Gadgets</option>
          <option value={20}>Mythology</option>
          <option value={21}>Sports</option>
          <option value={22}>Geography</option>
          <option value={23}>History</option>
          <option value={24}>Politics</option>
          <option value={25}>Art</option>
          <option value={26}>Celebrities</option>
          <option value={27}>Animals</option>
          <option value={28}>Vehicles</option>
        </Select>

        <Label>Select Difficulty</Label>
        <Select value={settings.difficulty} onChange={onSelectDifficulty}>
          <option value={''}>Any Difficulty</option>
          <option value={'easy'}>Easy</option>
          <option value={'medium'}>Medium</option>
          <option value={'hard'}>Hard</option>
        </Select>

        <StartGameBtn type="submit">Start Game</StartGameBtn>
      </Form>
    </Container>
  );
};
