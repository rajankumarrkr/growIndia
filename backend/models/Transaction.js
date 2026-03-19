const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['recharge', 'withdrawal', 'roi'], required: true },
    utr: { type: String }, // Required for recharges
    screenshot: { type: String }, // Base64 string for deposit proof
    accountDetails: {
        method: { type: String }, // 'bank' or 'upi'
        name: { type: String },
        accountNumber: { type: String },
        ifsc: { type: String },
        upiId: { type: String },
    },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    timestamp: { type: Date, default: Date.now }
});

transactionSchema.index({ userId: 1 });
transactionSchema.index({ type: 1 });
transactionSchema.index({ timestamp: -1 });
transactionSchema.index({ type: 1, status: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);

