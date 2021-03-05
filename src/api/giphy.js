import { giphyKey } from '../keys';

const badScore = ['Damn', "That's bad", 'Oh no', 'Try again'];
const goodScore = ['Well Done', "That's amazing!", 'You are great'];

const scoreResponse = (score) => {
  if (score < 50) {
    return badScore[Math.floor(Math.random() * badScore.length)];
  } else {
    return goodScore[Math.floor(Math.random() * goodScore.length)];
  }
};

export const fetchGif = async (score) => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=${scoreResponse(
      score
    )}&limit=1&offset=0&rating=g&lang=en`
  ).then((response) => response.json());
  console.log(response.data[0]);
  return response.data[0];
};
