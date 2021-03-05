import { giphyKey } from '../keys';

export const fetchGif = async (responseText) => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=${responseText}&limit=1&offset=0&rating=g&lang=en`
  ).then((response) => response.json());
  console.log(response.data[0]);
  return response.data[0];
};
