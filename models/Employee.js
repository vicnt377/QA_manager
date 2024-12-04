const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});

module.exports = mongoose.model('employee', employeeSchema);
