const express = require('express');
const { auth, admin } = require('../middleware/auth');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const AdminSettings = require('../models/AdminSettings');
const Plan = require('../models/Plan');
const { processDailyIncome } = require('../utils/incomeLogic');
const cache = require('../utils/cache');
const router = express.Router();

// Get Admin Stats
router.get('/stats', auth, admin, async (req, res) => {
    try {
        if (cache.has('adminStats')) return res.json(cache.get('adminStats'));

        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalDeposits = await Transaction.aggregate([
            { $match: { type: 'recharge', status: 'approved' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalWithdrawals = await Transaction.aggregate([
            { $match: { type: 'withdrawal', status: 'approved' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const stats = {
            totalUsers,
            totalDeposits: totalDeposits[0]?.total || 0,
            totalWithdrawals: totalWithdrawals[0]?.total || 0,
        };
        cache.set('adminStats', stats, 15);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Manage Users
router.get('/users', auth, admin, async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password').lean();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Settings (UPI & QR)
router.get('/settings', auth, admin, async (req, res) => {
    try {
        let settings = await AdminSettings.findOne();
        if (!settings) {
            settings = await AdminSettings.create({});
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/settings', auth, admin, async (req, res) => {
    try {
        const { upiId, qrCode } = req.body;
        let settings = await AdminSettings.findOne();
        if (!settings) {
            settings = new AdminSettings({ upiId, qrCode });
        } else {
            if (upiId !== undefined) settings.upiId = upiId;
            if (qrCode !== undefined) settings.qrCode = qrCode;
        }
        await settings.save();
        res.json({ message: 'Settings updated successfully', settings });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Pending Recharges
router.get('/recharges/pending', auth, admin, async (req, res) => {
    try {
        // Exclude screenshot to prevent 90MB+ payload timeouts
        const recharges = await Transaction.find({ type: 'recharge', status: 'pending' })
            .select('-screenshot')
            .populate('userId', 'name mobile').lean();
        res.json(recharges);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch Single Proof Image
router.get('/recharge/:id/proof', auth, admin, async (req, res) => {
    try {
        const recharge = await Transaction.findById(req.params.id).select('screenshot').lean();
        if (!recharge) return res.status(404).json({ message: 'Not found' });
        res.json({ screenshot: recharge.screenshot });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Approve Recharge & Referral Commission

// Get Pending Withdrawals
router.get('/withdrawals/pending', auth, admin, async (req, res) => {
    try {
        const withdrawals = await Transaction.find({ type: 'withdrawal', status: 'pending' }).populate('userId', 'name mobile').lean();
        res.json(withdrawals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Approve Recharge & Referral Commission
router.patch('/recharge/:id', auth, admin, async (req, res) => {
    try {
        const { status } = req.body; // 'approved' or 'rejected'
        const recharge = await Transaction.findById(req.params.id);
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
        cache.del('adminStats');
        res.json({ message: `Recharge ${status}` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Approve Withdrawal
router.patch('/withdraw/:id', auth, admin, async (req, res) => {
    try {
        const { status } = req.body; // 'approved' or 'rejected'
        const withdrawal = await Transaction.findById(req.params.id);
        if (!withdrawal || withdrawal.status !== 'pending') return res.status(400).json({ message: 'Invalid withdrawal' });

        withdrawal.status = status;
        await withdrawal.save();

        if (status === 'rejected') {
            // Refund balance if rejected
            const user = await User.findById(withdrawal.userId);
            user.walletBalance += withdrawal.amount;
            await user.save();
        }
        cache.del('adminStats');
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

// ─── Plan Management ───────────────────────────────────────────────────────

// Get all plans (admin sees all including inactive)
router.get('/plans', auth, admin, async (req, res) => {
    try {
        if (cache.has('adminPlans')) return res.json(cache.get('adminPlans'));
        const plans = await Plan.find().sort({ tier: 1, amount: 1 }).lean();
        cache.set('adminPlans', plans, 3600);
        res.json(plans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new plan
router.post('/plans', auth, admin, async (req, res) => {
    try {
        const { name, amount, daily, tier, duration } = req.body;
        if (!name || !amount || !daily || !tier) {
            return res.status(400).json({ message: 'All fields required: name, amount, daily, tier' });
        }
        const plan = new Plan({ name, amount, daily, tier, duration, isActive: true });
        await plan.save();
        cache.del(['adminPlans', 'activePlans']);
        res.json({ message: 'Plan created', plan });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update plan
router.patch('/plans/:id', auth, admin, async (req, res) => {
    try {
        const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        cache.del(['adminPlans', 'activePlans']);
        res.json({ message: 'Plan updated', plan });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete plan
router.delete('/plans/:id', auth, admin, async (req, res) => {
    try {
        await Plan.findByIdAndDelete(req.params.id);
        cache.del(['adminPlans', 'activePlans']);
        res.json({ message: 'Plan deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Generate Daily Income Manually
router.post('/generate-income', auth, admin, async (req, res) => {
    try {
        const result = await processDailyIncome();
        if (result.success) {
            res.json({ message: `Successfully processed ROI for ${result.processedCount} investments.`, count: result.processedCount });
        } else {
            res.status(500).json({ message: result.error });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

