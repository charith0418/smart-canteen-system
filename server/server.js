const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");//import express app

const connectDb = require("./config/db");//import mongodb connection

connectDb();//run database

const port = process.env.PORT || 5000;//set server port

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});