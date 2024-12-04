const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    tableNumber: { type: String, required: true },
    items: [
        {
            dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
            quantity: { type: Number, default: 1 },
        },
    ],
    totalAmount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bill', billSchema);
