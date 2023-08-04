const { Schema } = require('mongoose');

const gameSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  gameId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  released: {
    type: String,
  },
  genres: {
    type: String,
  }
});

module.exports = gameSchema;
