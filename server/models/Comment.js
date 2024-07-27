// --------------------------------------------------------------------
// Dependencies

const { Schema, model } = require("mongoose");

// --------------------------------------------------------------------
// Comment Schema
const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  likes: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// --------------------------------------------------------------------
// Creates the comment model using the commentSchema
const Comment = model("Comment", CommentSchema);

// --------------------------------------------------------------------
// Export the User model
module.exports = Comment;
