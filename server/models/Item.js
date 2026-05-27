const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    
    category: {
        type: String,
        default: 'General'
    },
    imageUrl: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    }
},{ timestamps: true });

module.exports = mongoose.model('Item',itemSchema);