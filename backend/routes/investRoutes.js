const express = require('express');
const { auth } = require('../middleware/auth');
const Investment = require('../models/Investment');
const Plan = require('../models/Plan');
const User = require('../models/User');
const router = express.Router();

// Seed default plans if none exist
const seedDefaultPlans = async () => {
    const count = await Plan.countDocuments();
    if (count === 0) {
        await Plan.insertMany([
            { name: 'Plan 999', amount: 999, daily: 100, tier: 'standard' },
            { name: 'Plan 2500', amount: 2500, daily: 300, tier: 'standard' },
            { name: 'Plan 5000', amount: 5000, daily: 800, tier: 'standard' },
            { name: 'Plan 8000', amount: 8000, daily: 2000, tier: 'standard' },
            { name: 'Plan 12000', amount: 12000, daily: 3600, tier: 'vip' },
            { name: 'Plan 20000', amount: 20000, daily: 8000, tier: 'vip' },
            { name: 'Plan 30000', amount: 30000, daily: 15000, tier: 'vip' },
            { name: 'Plan 50000', amount: 50000, daily: 35000, tier: 'vip' },
        ]);
        console.log('Default plans seeded.');
    }
};
seedDefaultPlans();

// Get Plans (returns standard first, then vip — so frontend index-based split still works)
router.get('/plans', async (req, res) => {
    try {
        const plans = await Plan.find({ isActive: true }).sort({ tier: 1, amount: 1 }).lean();
        res.json(plans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Purchase Plan
router.post('/purchase', auth, async (req, res) => {
    try {
        const { planIndex, planId } = req.body;

        let plan;
        if (planId) {
            plan = await Plan.findById(planId);
        } else {
            // Legacy support: index-based
            const plans = await Plan.find({ isActive: true }).sort({ tier: 1, amount: 1 });
            plan = plans[planIndex];
        }

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
        const investments = await Investment.find({ userId: req.user.id }).sort({ createdAt: -1 }).lean();
        res.json(investments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
