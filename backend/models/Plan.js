const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    daily: { type: Number, required: true },
    tier: { type: String, enum: ['standard', 'vip'], default: 'standard' },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plan', planSchema);
