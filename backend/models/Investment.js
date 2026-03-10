const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planName: { type: String, required: true },
    amountInvested: { type: Number, required: true },
    dailyReturn: { type: Number, required: true },
    totalDays: { type: Number, default: 99 },
    daysRemaining: { type: Number, default: 99 },
    lastRoiCredit: { type: Date },
    status: { type: String, enum: ['active', 'completed'], default: 'active' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Investment', investmentSchema);
