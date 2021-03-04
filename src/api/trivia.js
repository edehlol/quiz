import { decode } from 'html-entities';

async function fetchQuestions() {
  const response = await fetch('https://opentdb.com/api.php?amount=10').then((response) =>
    response.json()
  );
  return response.results;
}

function combineAnswers(correct, incorrect) {
  return incorrect.concat(correct).sort(() => Math.random() - 0.5);
}

function formatQuestions(fetchedQuestions) {
  return fetchedQuestions.map((question) => {
    const correct_answer = decode(question.correct_answer);
    const incorrect_answers = question.incorrect_answers.map((answer) => decode(answer));
    return {
      question: decode(question.question),
      category: question.category,
      incorrect_answers: incorrect_answers,
      correct_answer: correct_answer,
      allAnswers: combineAnswers(correct_answer, incorrect_answers),
      guessedAnswer: '',
    };
  });
}

async function getQuestions() {
  const questions = await fetchQuestions().then((response) => formatQuestions(response));
  return formatQuestions(questions);
}

export default getQuestions;
