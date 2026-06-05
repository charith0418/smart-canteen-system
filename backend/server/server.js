const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const http = require('http');
const express = require('express');
const cors = require('cors'); // 🌟 1. Import the cors package
const app = require('./app');
const connectDB = require('./config/db');

connectDB();

// 🌟 2. Enable CORS so your Vercel frontend can access the API
app.use(cors({
  origin: [
    "https://smart-canteen-system.vercel.app", // Your actual live Vercel URL
    "http://localhost:5173"                    // Keeps local development working!
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use('/images', express.static(path.join(__dirname, 'public/images')));

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});