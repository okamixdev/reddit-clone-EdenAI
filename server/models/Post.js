// -------------------------------------------------------------------------
// Dependencies

const { Schema, model } = require("mongoose");

// Post Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  community: {
    type: Schema.Types.ObjectId,
    ref: "Comunity",
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  file: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// --------------------------------------------------------------------
// Virtuals

// Gets the comments count for the desired post
PostSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// Gets the like count for the desired post
PostSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

// Exports the Post model.
module.exports = model("Post", PostSchema, "posts");
