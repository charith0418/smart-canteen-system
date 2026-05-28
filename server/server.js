// const dotenv = require('dotenv');

// dotenv.config();
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = require('./app');
const http = require('http');//import express app

const connectDB = require('./config/db');//import mongodb connection

connectDB();//run database

const PORT = process.env.PORT || 5000;//set server port

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});


// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
