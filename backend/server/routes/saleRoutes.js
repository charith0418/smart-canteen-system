const express = require("express");
const router = express.Router();

const {
  createSale,
  getReports,
} = require("../controllers/saleController");

router.post("/", createSale);

router.get("/reports", getReports);

module.exports = router;