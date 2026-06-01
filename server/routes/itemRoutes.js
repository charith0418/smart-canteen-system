const express = require('express');
const router = express.Router();
const { getItems, createItem } = require('../controllers/itemController');

const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getItems)
    .post(upload.single('image'), createItem);


module.exports = router;