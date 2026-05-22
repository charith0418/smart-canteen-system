
const bcrypt = require("bcrypt");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");


// REGISTER ROUTE
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, password: hashedPassword });
        

        res.status(201).json({ message: "Registration successful" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};