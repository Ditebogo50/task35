// Import the necessary models
const User = require("../models/user");
const OU = require("../models/ou");

// Get all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().exec();
  return res.json(users);
};

// Get a specific user by ID
exports.getUser = async (req, res) => {
  const userID = req.params.userId;
  const user = await User.findOne({ _id: userID }).exec();
  return res.json(user);
};

// Get all OUs with their divisions
exports.getAllOUs = async (req, res) => {
  const ous = await OU.find().populate({ path: "divisions" }).exec();
  return res.json(ous);
};

// Change the role of a user
exports.changeRole = async (req, res) => {
  const userID = req.params.userId;
  const { newRole } = req.body;
  const user = await User.findOneAndUpdate(
    {
      _id: userID,
    },
    {
      role: newRole,
    }
  ).exec();
  return res.json(user);
};

// Assign an OU to a user
exports.assignOU = async (req, res) => {
  const userID = req.params.userId;
  const ouID = req.body.ouID;
  const user = await User.findOneAndUpdate(
    {
      _id: userID,
    },
    {
      $push: { oUs: ouID },
    }
  ).exec();
  return res.json(user);
};

// Assign a division to a user
exports.assignDivision = async (req, res) => {
  const userID = req.params.userId;
  const divisionID = req.body.divisionID;
  const user = await User.findOneAndUpdate(
    {
      _id: userID,
    },
    {
      $push: { divisions: divisionID },
    }
  ).exec();
  return res.json(user);
};

// Remove an OU from a user
exports.designOU = async (req, res) => {
  const userID = req.params.userId;
  const ouID = req.body.ouID;
  const user = await User.findOneAndUpdate(
    {
      _id: userID,
    },
    {
      $pull: { oUs: ouID },
    }
  ).exec();
  return res.json(user);
};

// Remove a division from a user
exports.designDivision = async (req, res) => {
  const userID = req.params.userId;
  const divisionID = req.body.divisionID;

  const user = await User.findOneAndUpdate(
    {
      _id: userID,
    },
    {
      $pull: { divisions: divisionID },
    }
  ).exec();
  return res.json(user);
};
