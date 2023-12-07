const User = require("../models/user");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const createJWT = ({ username, role, oUs, divisions }) =>
  jwt.sign({ username, role, oUs, divisions }, jwtSecretKey);

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  try {
    const newUser = await user.save();
    const token = createJWT(newUser);
    res.status(201).json({ message: "Registration successful", token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Validate password
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT
    const token = createJWT(user);

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
