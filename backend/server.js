const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const initCron = require('./utils/cron');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/wallet', require('./routes/walletRoutes'));
app.use('/api/invest', require('./routes/investRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
// Profile routes will be added later

// Admin check - bootstrap admin if none exists (optional, for dev)
const bootstrapAdmin = async () => {
    const User = require('./models/User');
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
        const admin = new User({
            name: 'Admin',
            mobile: '0000000000',
            password: 'adminpassword',
            role: 'admin',
            referralCode: 'ADMIN123'
        });
        await admin.save();
        console.log('Admin user bootstrapped');
    }
};

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected');
        bootstrapAdmin();
        initCron(); // Initialize ROI Cron
    })
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
