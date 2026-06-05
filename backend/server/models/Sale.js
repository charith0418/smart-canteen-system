const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    items: [
      {
        item: String,
        quantity: Number,
        priceAtSale: Number,
      },
    ],
    subtotal: Number,
    total: Number,
    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);