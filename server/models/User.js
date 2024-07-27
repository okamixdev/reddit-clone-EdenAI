// --------------------------------------------------------
// Import Schema and model from mongoose.
const { Schema, model } = require("mongoose");

// Create the User Schema.
const UserSchema = new Schema(
  {
    first: {
      type: String,
      // unique: true,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "USER",
    },
    img: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    communities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Community",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// --------------------------------------------------------------------
// Virtual <-> Methods

// Method to get the user's full name
UserSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});

// When we query a user, we'll also get another field called `posts` with the number of posts we have.
UserSchema.virtual("postsCount").get(function () {
  return this.posts.length;
});

// Exports the User model.          // Saves on DB as 'users'
module.exports = model("User", UserSchema, "users");
