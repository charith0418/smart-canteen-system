const mongoose = require("mongoose");

const connectDB = async () => {//when use this asyns JavaScript handles them asynchronously.

    try {

        await mongoose.connect("mongodb://localhost:27017/canteenDB");

        console.log("MongoDB connected");

    } catch (err) {

        console.log(err);

    }git branch

};

module.exports = connectDB;//export this function so other files can use it