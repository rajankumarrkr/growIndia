const express = require('express');
const { auth } = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const AdminSettings = require('../models/AdminSettings');
const { upload, uploadToCloudinary } = require('../middleware/upload');
const router = express.Router();

// Recharge Request
// Get Deposit Info (Public or Auth, using Auth here since user needs to be logged in to deposit)
router.get('/deposit-info', auth, async (req, res) => {
    try {
        let settings = await AdminSettings.findOne();
        if (!settings) {
            settings = { upiId: 'Not Set', qrCode: '' };
        }
        res.json({ upiId: settings.upiId, qrCode: settings.qrCode });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Recharge Request
router.post('/recharge', auth, upload.single('screenshot'), async (req, res) => {
    try {
        const { amount, utr } = req.body;
        if (amount < 300) return res.status(400).json({ message: 'Minimum recharge is 300 INR' });

        let screenshotUrl = '';
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, 'recharges');
            screenshotUrl = result.secure_url;
        } else if (req.body.screenshot && req.body.screenshot.startsWith('data:image')) {
            // If someone sends base64, we should still handle it but upload to Cloudinary
            const cloudinary = require('../config/cloudinary');
            const result = await cloudinary.uploader.upload(req.body.screenshot, { folder: 'recharges' });
            screenshotUrl = result.secure_url;
        }

        if (!screenshotUrl) return res.status(400).json({ message: 'Please upload payment screenshot' });

        const recharge = new Transaction({
            userId: req.user.id,
            amount,
            utr,
            screenshot: screenshotUrl,
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
        const { amount, method, name, accountNumber, ifsc, upiId } = req.body;
        if (amount < 300) return res.status(400).json({ message: 'Minimum withdrawal is 300 INR' });

        const user = await User.findById(req.user.id);
        if (user.walletBalance < amount) return res.status(400).json({ message: 'Insufficient balance' });

        if (!method) {
            return res.status(400).json({ message: 'Please provide withdrawal method (bank or upi)' });
        }
        if (method === 'bank' && (!accountNumber || !ifsc || !name)) {
            return res.status(400).json({ message: 'Please provide full bank details' });
        }
        if (method === 'upi' && !upiId) {
            return res.status(400).json({ message: 'Please provide UPI ID' });
        }

        const withdrawal = new Transaction({
            userId: req.user.id,
            amount,
            type: 'withdrawal',
            status: 'pending',
            accountDetails: { method, name, accountNumber, ifsc, upiId }
        });

        // Deduct balance immediately (refunded if rejected)
        user.walletBalance -= amount;
        await user.save();
        await withdrawal.save();

        res.json({ message: 'Withdrawal request submitted. Admin will process within 24 hours.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Transaction History
router.get('/history', auth, async (req, res) => {
    try {
        // Exclude the bulky base64 'screenshot' field to avoid massive payloads
        const history = await Transaction.find({ userId: req.user.id })
            .select('-screenshot')
            .sort({ timestamp: -1 })
            .lean();
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
