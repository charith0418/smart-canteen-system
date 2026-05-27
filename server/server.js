const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");//import express app

const connectDb = require("./config/db");//import mongodb connection

connectDb();//run database

const port = process.env.PORT || 5000;//set server port

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});