import { gql } from '@apollo/client';

// Get logged in user's info
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedGames {
        gameId
        description
        title
        image
        link
      }
    }
  }
`;

export const SEARCH_RAWG_GAMES = gql`
  query searchRawgGames($query: String!) {
    searchRAWGGames(query: $query) {
      gameId
      description
      title
      image
      link
    }
  }
`;