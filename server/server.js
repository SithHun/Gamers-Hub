const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  await server.start();

  const app = express();
  server.applyMiddleware({ app, path: '/graphql' });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  db.once('open', () => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`API server running on port ${process.env.PORT || 3001}!`);
      console.log(`Use GraphQL at http://localhost:${process.env.PORT || 3001}${server.graphqlPath}`);
    });
  });
};

startServer();