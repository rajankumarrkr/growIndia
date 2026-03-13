const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');

router.get('/data', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        // Find all users who were referred by the current user
        const teamMembers = await User.find({ referredBy: user.referralCode });
        const teamSize = teamMembers.length;
        
        // Return 0 commission for now as it's not implemented yet
        const memberList = teamMembers.map(m => ({
            id: m._id,
            name: m.name,
            mobile: m.mobile,
            status: m.status,
            createdAt: m.createdAt
        }));

        res.json({
            teamSize: teamSize,
            commission: 0,
            members: memberList
        });
    } catch (err) {
        console.error('Error fetching team data:', err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
