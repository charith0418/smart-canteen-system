const express = require('express');
    const router = express.Router();
    const { createSale, getReports } = require('../controllers/saleController');


    router.route('/').post(createSale);

    router.route('/reports').get(getReports);

    module.exports = router;
    