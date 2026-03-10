const express = require('express');
const { auth } = require('../middleware/auth');
const Investment = require('../models/Investment');
const User = require('../models/User');
const router = express.Router();

const PLANS = [
    { amount: 999, daily: 100, name: 'Plan 999' },
    { amount: 2500, daily: 300, name: 'Plan 2500' },
    { amount: 5000, daily: 800, name: 'Plan 5000' },
    { amount: 8000, daily: 2000, name: 'Plan 8000' },
    { amount: 12000, daily: 3600, name: 'Plan 12000' },
    { amount: 20000, daily: 8000, name: 'Plan 20000' },
    { amount: 30000, daily: 15000, name: 'Plan 30000' },
    { amount: 50000, daily: 35000, name: 'Plan 50000' },
];

// Get Plans
router.get('/plans', (req, res) => {
    res.json(PLANS);
});

// Purchase Plan
router.post('/purchase', auth, async (req, res) => {
    try {
        const { planIndex } = req.body;
        const plan = PLANS[planIndex];
        if (!plan) return res.status(400).json({ message: 'Invalid plan selected' });

        const user = await User.findById(req.user.id);
        if (user.walletBalance < plan.amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        const investment = new Investment({
            userId: req.user.id,
            planName: plan.name,
            amountInvested: plan.amount,
            dailyReturn: plan.daily,
            daysRemaining: 99,
            status: 'active'
        });

        user.walletBalance -= plan.amount;
        await user.save();
        await investment.save();

        res.json({ message: 'Investment successful', investment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// My Investments
router.get('/my-investments', auth, async (req, res) => {
    try {
        const investments = await Investment.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(investments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
