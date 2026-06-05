const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Upgraded to case-insensitive check to maintain parity with login
    const existingUser = await User.findOne({ 
      userName: { $regex: new RegExp("^" + userName.trim() + "$", "i") } 
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName: userName.trim(),
      password: hashedPassword,
    });

    return res.status(201).json({
      _id: user._id,
      userName: user.userName,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Dynamic case-insensitive regular expression parsing lookup
    const user = await User.findOne({ 
      userName: { $regex: new RegExp("^" + userName.trim() + "$", "i") } 
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    return res.status(200).json({
      _id: user._id,
      userName: user.userName,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { userName, securityAnswer, newPassword } = req.body;

    // Upgraded to case-insensitive matching to ensure safety checks clear smoothly
    const user = await User.findOne({ 
      userName: { $regex: new RegExp("^" + userName.trim() + "$", "i") } 
    });
    
    if (!user) {
      return res.status(404).json({ message: "Identity handle not found." });
    }

    // Validate Security Keyword (Case-insensitive match check against DB value)
    if (String(securityAnswer).trim().toLowerCase() !== String(user.secretAnswer || "admin").trim().toLowerCase()) {
      return res.status(401).json({ message: "Security validation key phrase is incorrect." });
    }

    // Always securely encrypt the new pass block using your bcrypt handler instance
    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();
    return res.status(200).json({ success: true, message: "Secret key phrase changed successfully!" });

  } catch (err) {
    return res.status(500).json({ message: "Reset error: " + err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  resetPassword,
};