const User = require('../models/user');

exports.isAdmin = async (req, res, next) => {
  // Extract the username and path from the request object
  const { username } = req.user;
  // Find the user
  const user = await User.findOne({username: req.user.username}).exec();
  console.log(user, req.user);
  // If user does not exist or is not an admin
  if (!user || !user.role != "admin") {
    return res
      .status(403)
      .json({ message: "You are not authorized to access this resource" });
  }
  next();
};
