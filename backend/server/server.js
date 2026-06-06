const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const http = require('http');
const express = require('express');

// --- PATH-TO-REGEXP V8 COMPLIANCE PATCH ---
// This automatically catches and patches old '*' paths in Express before they crash your app!
const router = require('express/lib/router/layer');
const originalNew = router.prototype.constructor;
router.prototype.constructor = function (path, options, fn) {
  if (path === '*') path = '/*';
  return originalNew.apply(this, [path, options, fn]);
};
// ------------------------------------------

const app = require('./app');
const connectDB = require('./config/db');

// Connect to MongoDB Database
connectDB();

// Serve static images folder publicly
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Configure port deployment values
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Start the live server listener
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});