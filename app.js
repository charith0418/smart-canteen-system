const express = require('express');
const core = require('core');
const itemRoutes = require('./routes/itemRoutes');
const saleRoutes = require('./routes/saleRoutes');

const app = express();

app.use(core());
app.use(express.json());

app.use('/api/items', itemRoutes);
app.use('/api/sales', saleRoutes);

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.messaage,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

module.exports = app;