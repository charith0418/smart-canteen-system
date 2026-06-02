const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    items: [
      {
        item: {
          type: String, // Changed to String to dynamically accept both numeric IDs and ObjectIds
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically saves the timestamp of the purchase
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", SaleSchema);