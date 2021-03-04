const apiKey = 'B7vQThLCaJ3KROTD7Dgf6JgRqIMVn9Gj';

const badScore = 'Damn';
const goodScore = 'Well Done';

const scoreResponse = (score) => {
  if (score < 50) {
    return badScore;
  } else {
    return goodScore;
  }
};

export const fetchGif = async (score) => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${scoreResponse(
      score
    )}&limit=25&offset=0&rating=g&lang=en`
  ).then((response) => response.json());
  return response.data[0].images.downsized.url;
};
