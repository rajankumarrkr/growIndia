const express = require('express');
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Get profile & stats
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').lean();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Bank Details
router.post('/bank-details', auth, async (req, res) => {
    try {
        const { holderName, accountNumber, ifsc } = req.body;
        const user = await User.findById(req.user.id);
        user.bankDetails = { holderName, accountNumber, ifsc };
        await user.save();
        res.json({ message: 'Bank details updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Change Password
router.post('/change-password', auth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Both old and new passwords are required' });
        }

        const user = await User.findById(req.user.id);
        const isMatch = await user.comparePassword(oldPassword);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect old password' });
        }

        user.password = newPassword;
        await user.save();
        
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
