import { decode } from 'html-entities';

async function fetchQuestions(settings) {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${settings.numberOfQuestions}&difficulty=${settings.difficulty}&category=${settings.category}`
  ).then((response) => response.json());
  console.log(response.results);
  return response.results;
}

function combineAnswers(correct, incorrect) {
  return incorrect.concat(correct).sort(() => Math.random() - 0.5);
}

function formatQuestions(fetchedQuestions) {
  return fetchedQuestions.map((question, index) => {
    const correct_answer = decode(question.correct_answer);
    const incorrect_answers = question.incorrect_answers.map((answer) => decode(answer));
    return {
      id: index,
      question: decode(question.question),
      category: question.category,
      incorrect_answers: incorrect_answers,
      correct_answer: correct_answer,
      allAnswers: combineAnswers(correct_answer, incorrect_answers),
      guessedAnswer: '',
    };
  });
}

async function getQuestions(settings) {
  const questions = await fetchQuestions(settings).then((response) => formatQuestions(response));
  return questions;
}

export default getQuestions;
