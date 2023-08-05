import { gql } from '@apollo/client';

// Create user
export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        gameCount
        email
        savedGames {
          gameId
          description
          image
          link
          title
        }
        username
      }
    }
  }
`;

// Login user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        gameCount
        email
        savedGames {
          gameId
          description
          image
          link
          title
        }
        username
      }
    }
  }
`;

// Save game for a logged in user
export const SAVE_GAME = gql`
  mutation saveGame($gameData: GameInput!) {
    saveGame(gameData: $gameData) {
      _id
      username
      email
      savedGames {
        gameId
        description
        title
        image
      }
    }
  }
`;

// Remove saved game data for a logged in user
export const REMOVE_GAME = gql`
  mutation removeGame($gameId: ID!) {
    removeGame(gameId: $gameId) {
      _id
      username
      email
      savedGames {
        gameId
        description
        title
        image
      }
    }
  }
`;

export const ADD_DISCUSSION = gql`
mutation AddDiscussion($gameId: ID!, $userId: ID!, $body: String!) {
  addDiscussion(gameId: $gameId, userId: $userId, body: $body) {
    _id
    body
    date
    gameId
    userId
  }
}
`

export const EDIT_DISCUSSION = gql`
mutation EditDiscussion($userId: ID!, $gameId: ID!, $body: String!) {
  editDiscussion(userId: $userId, gameId: $gameId, body: $body) {
    _id
    body
    date
    gameId
    userId
  }
}
`


export const DELETE_DISCUSSION = gql`
mutation DeleteDiscussion($userId: ID!, $gameId: ID!) {
  deleteDiscussion(userId: $userId, gameId: $gameId) {
    _id
    body
    date
    gameId
    userId
  }
}
`