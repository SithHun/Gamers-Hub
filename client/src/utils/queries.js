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

// export const QUERY_DISCUSSIONS = gql`
//   query discussions($gameId: ID!) {
//     discussions(gameId: $gameId) {
//       _id
//       userId {
//         _id
//         username
//       }
//       body
//       date
//       gameId
//     }
//   }
// `;

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

export const QUERY_DISCUSSIONS = gql`
query Discussions($gameId: ID!) {
  discussions(gameId: $gameId) {
    _id
    body
    date
    gameId
    userId {
      _id
      email
      gameCount
      username
      savedGames {
        description
        gameId
        image
        link
        title
      }
    }
  }
}
`