const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    image: { type: String }, // URL to the dish image
    description: { type: String },
});

module.exports = mongoose.model('Dish', dishSchema);