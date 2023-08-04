const { Schema, model } = require('mongoose');

const DiscussionSchema = new Schema(
    {
  gameId: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}
);

const Discussion = model('Discussion', DiscussionSchema);

module.exports = Discussion;
