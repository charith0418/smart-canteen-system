const mongoose = require("mongoose");

const connectDB = async () => {//when use this asyns JavaScript handles them asynchronously.

    try {

        await mongoose.connect(process.env.MONGO_URI );

        console.log("MongoDB connected");

    } catch (err) {

        console.log(err);

    }

};

module.exports = connectDB;//export this function so other files can use it helllo