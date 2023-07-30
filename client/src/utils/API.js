// const RAWG_API_KEY =  process.env.REACT_APP_RAWG_API_KEY;
const RAWG_API_KEY = '2ce1ade5c6ce4ac487c93348d52fab6f';
const RAWG_API_URL = 'https://api.rawg.io/api/games';
// require('dotenv').config();

export const searchRAWGGames = (query) => {
  // Construct the URL for the RAWG API.
  const url = `${RAWG_API_URL}?key=${RAWG_API_KEY}&search=${query}`;

  // Use fetch to get the data from the RAWG API.
  return fetch(url);
};