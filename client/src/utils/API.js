const RAWG_API_KEY =  process.env.REACT_APP_RAWGAPIKEY;
// const RAWG_API_KEY = '';
const RAWG_API_URL = 'https://api.rawg.io/api/games';
// require('dotenv').config();

export const searchRAWGGames = (query) => {
  // Construct the URL for the RAWG API.
  const url = `${RAWG_API_URL}?key=${RAWG_API_KEY}&search=${query}`;

  // Use fetch to get the data from the RAWG API.
  return fetch(url);
};