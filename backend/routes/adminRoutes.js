const express = require('express');
const { auth, admin } = require('../middleware/auth');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Get Admin Stats
router.get('/stats', auth, admin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalDeposits = await Transaction.aggregate([
            { $match: { type: 'recharge', status: 'approved' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalWithdrawals = await Transaction.aggregate([
            { $match: { type: 'withdrawal', status: 'approved' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        res.json({
            totalUsers,
            totalDeposits: totalDeposits[0]?.total || 0,
            totalWithdrawals: totalWithdrawals[0]?.total || 0,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Manage Users
router.get('/users', auth, admin, async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Approve Recharge & Referral Commission
router.patch('/recharge/:id', auth, admin, async (req, res) => {
    try {
        const { status } = req.body; // 'approved' or 'rejected'
        const recharge = await Transaction.findById(req.id || req.params.id);
        if (!recharge || recharge.status !== 'pending') return res.status(400).json({ message: 'Invalid recharge' });

        recharge.status = status;
        await recharge.save();

        if (status === 'approved') {
            const user = await User.findById(recharge.userId);
            user.walletBalance += recharge.amount;
            await user.save();

            // Referral Commission Logic (10%)
            if (user.referredBy) {
                const referrer = await User.findOne({ referralCode: user.referredBy });
                if (referrer) {
                    referrer.walletBalance += (recharge.amount * 0.10);
                    await referrer.save();
                }
            }
        }

        res.json({ message: `Recharge ${status}` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Approve Withdrawal
router.patch('/withdraw/:id', auth, admin, async (req, res) => {
    try {
        const { status } = req.body; // 'approved' or 'rejected'
        const withdrawal = await Transaction.findById(req.id || req.params.id);
        if (!withdrawal || withdrawal.status !== 'pending') return res.status(400).json({ message: 'Invalid withdrawal' });

        withdrawal.status = status;
        await withdrawal.save();

        if (status === 'rejected') {
            // Refund balance if rejected
            const user = await User.findById(withdrawal.userId);
            user.walletBalance += withdrawal.amount;
            await user.save();
        }

        res.json({ message: `Withdrawal ${status}` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Manually update user balance
router.patch('/user/:id/balance', auth, admin, async (req, res) => {
    try {
        const { amount, action } = req.body; // action: 'add' or 'subtract'
        const user = await User.findById(req.params.id);
        if (action === 'add') user.walletBalance += amount;
        else user.walletBalance -= amount;
        await user.save();
        res.json({ message: 'Balance updated' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
