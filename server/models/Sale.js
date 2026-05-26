const mongoose = require('mongoose');

const saleItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    priceAtSale: {
        type: Number,
        required: true,
    }
}, {_id: false });

const saleschema = new mongoose.Schema({
    items: [saleItemSchema],
    subtotal: {
        type:Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    cashier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }   

}, { timestamps: true });

module.exports = mongoose.model('Sale', saleschema);