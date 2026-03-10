const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, mobile, password, referralCode } = req.body;

        let user = await User.findOne({ mobile });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({
            name,
            mobile,
            password,
            referralCode: generateReferralCode(),
            referredBy: referralCode || null
        });

        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token, user: { id: user._id, name: user.name, mobile: user.mobile, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { mobile, password } = req.body;
        const user = await User.findOne({ mobile });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token, user: { id: user._id, name: user.name, mobile: user.mobile, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
