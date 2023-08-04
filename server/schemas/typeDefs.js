const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Discussion {
  _id: ID
  userId: ID
  body: String
  date: String
  gameId: String
}

type Discussion2 {
  _id: ID
  userId: User
  body: String
  date: String
  gameId: String
}

  type Game {
    description: String!
    gameId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID
    username: String!
    email: String!
    savedGames: [Game]
    gameCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  input GameInput {
    description: String
    gameId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    games(username: String): [Game]
    discussions(gameId: ID!): [Discussion2]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveGame(gameData: GameInput!): User
    removeGame(gameId: ID!): User
    addDiscussion(gameId: ID!, userId: ID!, body: String!): Discussion
  }

  extend type Query {
    searchRAWGGames(query: String!): [Game]
  }
`;

module.exports = typeDefs;