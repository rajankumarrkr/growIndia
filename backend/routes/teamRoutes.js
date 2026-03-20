const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

router.get('/data', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).lean();

        // Find all users referred by current user
        const teamMembers = await User.find({ referredBy: user.referralCode })
            .select('name mobile status createdAt')
            .lean();

        const teamSize = teamMembers.length;

        // For each member, check if they have at least one approved recharge
        const memberList = await Promise.all(teamMembers.map(async (m) => {
            const approvedRecharge = await Transaction.findOne({
                userId: m._id,
                type: 'recharge',
                status: 'approved'
            }).select('amount').lean();

            return {
                id: m._id,
                name: m.name,
                mobile: m.mobile,         // Full number
                hasRecharged: !!approvedRecharge, // true = active
                createdAt: m.createdAt
            };
        }));

        // Total referral income = 10% of all approved recharges of referred users
        // i.e. sum all approved recharges of team members * 0.10
        const memberIds = teamMembers.map(m => m._id);
        const rechargeAgg = await Transaction.aggregate([
            {
                $match: {
                    userId: { $in: memberIds },
                    type: 'recharge',
                    status: 'approved'
                }
            },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalReferralIncome = Math.round((rechargeAgg[0]?.total || 0) * 0.10);

        res.json({
            teamSize,
            commission: totalReferralIncome,
            members: memberList
        });
    } catch (err) {
        console.error('Error fetching team data:', err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
