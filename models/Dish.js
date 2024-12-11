const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    //image: { type: String },
    description: { type: String },
    isHidden: { type: Boolean, default: false },
});

module.exports = mongoose.model('Dish', dishSchema);
