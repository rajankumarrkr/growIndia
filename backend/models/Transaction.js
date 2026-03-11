const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['recharge', 'withdrawal'], required: true },
    utr: { type: String }, // Required for recharges
    screenshot: { type: String }, // Base64 string for deposit proof
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
