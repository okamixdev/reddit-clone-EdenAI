// ----------------------------------------------------------------------------------
// Dependencies

// Imports the models
const Follow = require("../models/Follow");
const Comunity = require("../models/Community");
const User = require("../models/User");

// ----------------------------------------------------------------------------------
// Methods

// ----------------------------------------------------------------------------------
// addComunity and store it in the DB.
const addComunity = async (req, res) => {
  // Get the name
  const { name } = await req.body;

  // Create a new comunity object.
  const comunity = new Comunity({
    name: name,
  });

  // Save the follow object to the DB.
  try {
    // Check if the user is already following the user.
    const isRepeated = await Comunity.findOne({
      name: name,
    });

    if (isRepeated) {
      // If the user is already following the user, return an error.
      return res.status(400).json({
        status: "ERROR",
        message: "Duplicate Comunity",
      });
    }

    // Save the comunity object to the DB.
    await comunity.save();

    return res.status(200).json({
      status: "SUCCESS",
      message: "Comunity created successfully.",
      comunity,
    });
  } catch (err) {
    // If there is an error, return it.
    return res.status(500).json({
      status: "ERROR",
      message: "Something went wrong while saving the comunity to the DB.",
      error: err,
    });
  }
};

// ----------------------------------------------------------------------------------
// addComunity and store it in the DB.
const followComunity = async (req, res) => {
  // Get the name
  const { id, user } = await req.body;

  // Save the follow object to the DB.
  try {
    // Create a new comunity object.
    const validator = await Comunity.findOne({
      _id: id,
      followers: user,
    });

    if (validator) {
      // If the user is already following the user, return an error.
      return res.status(400).json({
        status: "ERROR",
        message: "Already Follow",
      });
    }

    const saveFollowComunity = await Comunity.findOneAndUpdate(
      { _id: id },
      { $push: { followers: user } }
    );

    const saveFollowUser = await User.findOneAndUpdate(
      { _id: user },
      { $push: { communities: id } }
    );

    return res.status(200).json({
      status: "SUCCESS",
      message: "Comunity created successfully.",
      saveFollowComunity,
      saveFollowUser,
    });
  } catch (err) {
    // If there is an error, return it.
    return res.status(500).json({
      status: "ERROR",
      message: "Something went wrong while saving the comunity to the DB.",
      error: err,
    });
  }
};

// ----------------------------------------------------------------------------------
// addComunity and store it in the DB.
const removeFollow = async (req, res) => {
  // Get the name
  const { id, user } = await req.body;

  // Save the follow object to the DB.
  try {
    // Create a new comunity object.
    const validator = await Comunity.findOne({
      _id: id,
      followers: user,
    });

    if (!validator) {
      // If the user is already following the user, return an error.
      return res.status(400).json({
        status: "ERROR",
        message: "You dont follow tho",
      });
    }

    const saveFollowComunity = await Comunity.findOneAndUpdate(
      { _id: id },
      { $pull: { followers: user } }
    );

    const saveFollowUser = await User.findOneAndUpdate(
      { _id: user },
      { $pull: { communities: id } }
    );

    return res.status(200).json({
      status: "SUCCESS",
      message: "Comunity removed successfully.",
      saveFollowComunity,
      saveFollowUser,
    });
  } catch (err) {
    // If there is an error, return it.
    return res.status(500).json({
      status: "ERROR",
      message: "Something went wrong while saving the comunity to the DB.",
      error: err,
    });
  }
};

// ----------------------------------------------------------------------------------
// addComunity and store it in the DB.
const getCommunities = async (req, res) => {
  // Get the user ID.
  //const { id } = await req.body;

  try {
    // Find the user in the DB and then display all the posts organized.
    const communityInfo = await Comunity.find({}).populate("posts").exec();

    // If there is no posts on the user then returns error.
    if (communityInfo.lenght <= 0) {
      // Returns an error.
      return res.status(404).send({
        status: "ERROR",
        message: "No Posts to display at the moment",
      });
    }

    // Calculates the total of posts in the user model.
    let total = await Comunity.find().count();

    // Return a success and the post information.
    return res.status(200).send({
      status: "SUCESS",
      message: "Community Information Below:",
      communityInfo,
      total,
    });
  } catch (err) {
    // Returns an error if any.
    return res.status(404).send({
      status: "ERROR",
      message: "Error at retrieving the community to the DB",
    });
  }
};

// ----------------------------------------------------------------------------------
// addComunity and store it in the DB.
const getCommunity = async (req, res) => {
  // Get the user ID.
  const { id } = await req.params;

  try {
    // Find the user in the DB and then display all the posts organized.
    const communityInfo = await Comunity.find({ _id: id })
      .populate("posts")
      .populate({ path: "posts", populate: { path: "user", model: "User" } });

    // If there is no posts on the user then returns error.
    if (communityInfo.lenght <= 0) {
      // Returns an error.
      return res.status(404).send({
        status: "ERROR",
        message: "No Posts to display at the moment",
      });
    }

    // Calculates the total of posts in the user model.
    let total = await Comunity.find().count();

    // Return a success and the post information.
    return res.status(200).send({
      status: "SUCESS",
      message: "Community Information Below:",
      communityInfo,
      total,
    });
  } catch (err) {
    // Returns an error if any.
    return res.status(404).send({
      status: "ERROR",
      message: "Error at retrieving the community to the DB",
    });
  }
};

// ----------------------------------------------------------------------------------
// Export the methods
module.exports = {
  addComunity,
  followComunity,
  getCommunities,
  getCommunity,
  removeFollow,
};
