const express = require('express');
const { auth } = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const router = express.Router();

// Recharge Request
router.post('/recharge', auth, async (req, res) => {
    try {
        const { amount, utr } = req.body;
        if (amount < 300) return res.status(400).json({ message: 'Minimum recharge is 300 INR' });

        const recharge = new Transaction({
            userId: req.user.id,
            amount,
            utr,
            type: 'recharge',
            status: 'pending'
        });

        await recharge.save();
        res.json({ message: 'Recharge request submitted, waiting for admin approval' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Withdrawal Request
router.post('/withdraw', auth, async (req, res) => {
    try {
        const { amount } = req.body;
        if (amount < 300) return res.status(400).json({ message: 'Minimum withdrawal is 300 INR' });

        const user = await User.findById(req.user.id);
        if (user.walletBalance < amount) return res.status(400).json({ message: 'Insufficient balance' });

        if (!user.bankDetails?.accountNumber) {
            return res.status(400).json({ message: 'Please add bank details first' });
        }

        const withdrawal = new Transaction({
            userId: req.user.id,
            amount,
            type: 'withdrawal',
            status: 'pending'
        });

        // Deduct balance immediately
        user.walletBalance -= amount;
        await user.save();
        await withdrawal.save();

        res.json({ message: 'Withdrawal request submitted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Transaction History
router.get('/history', auth, async (req, res) => {
    try {
        const history = await Transaction.find({ userId: req.user.id }).sort({ timestamp: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
