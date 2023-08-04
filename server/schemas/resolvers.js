const { User } = require('../models');
const { Discussion } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        // if (context.user) {
          const userData = await User.findOne({ _id: '64cc2ee5e0fb5dc7f8fcfa95' })
            .select('-__v -password')
            .populate('savedGames');
  
          return userData;
        // }
  
        throw new AuthenticationError('Not logged in');
      },
      discussions: async (parent, { gameId }, context) => {
        return await Discussion.find({ gameId: gameId }).populate('userId');
      },

    },

    Mutation: {
      createUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
  
        return { token, user };
      },
  
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
        console.log(user)
  
        const token = signToken(user);
        console.log(token)
        return { token, user };
      },
  
      saveGame: async (parent, { gameData }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $push: { savedGames: gameData } },
            { new: true }
          );
  
          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
  
      removeGame: async (parent, { gameId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedGames: { gameId } } },
            { new: true }
          );
  
          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },

      addDiscussion: async (parent, { gameId, body, userId }, context) => {
        // if (context.user) {
          const newDiscussion = await Discussion.create({
            gameId,
            body,
            userId
          })

          return newDiscussion;
        // }
        throw new AuthenticationError('You need to be logged in to add a discussion!');
      },

    },
  };
  
  module.exports = resolvers;
  