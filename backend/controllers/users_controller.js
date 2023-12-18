const User = require("../models/user");
const OU = require("../models/ou");
const division = require("../models/division");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().exec();
  return res.json(users);
};

exports.getUser = async (req, res) => {
  const userID = req.params.userId;
  const user = await User.findOne({_id: userID}).exec();
  return res.json(user);
};


exports.getAllOUs = async (req, res) => {
  const ous = await OU.find().populate({ path: "divisions" }).exec();
  return res.json(ous);
};

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
