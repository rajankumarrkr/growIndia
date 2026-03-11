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

// Admin check - bootstrap admin if none exists (Svcet Access)
const bootstrapAdmin = async () => {
    const User = require('./models/User');
    const adminExists = await User.findOne({ mobile: 'svcet' });
    if (!adminExists) {
        const admin = new User({
            name: 'Administrative Controller',
            mobile: 'svcet',
            password: 'svcet@123',
            role: 'admin',
            referralCode: 'SVCET_ROOT'
        });
        await admin.save();
        console.log('Administrative node "svcet" bootstrapped successfully');
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
