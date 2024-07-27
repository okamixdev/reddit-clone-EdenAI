// --------------------------------------------------------------------
// Dependencies

const { Schema, model } = require("mongoose");

// --------------------------------------------------------------------
// Comment Schema
const ComunitySchema = new Schema({
  name: {
    type: String,
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

// --------------------------------------------------------------------
// Creates the comunity model using the ComunitySchema
const Comunity = model("Comunity", ComunitySchema);

// --------------------------------------------------------------------
// Export the Comunity model
module.exports = Comunity;
