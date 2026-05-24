const bcrypt = require("bcryptjs");

const User = require("../models/User");

const generateToken = require("../utils/generateToken");


// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
      _id: user._id,
      userName: user.userName,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};