const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const initCron = require('./utils/cron');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit for Base64 image uploads
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Added urlencoded limit as well

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

// Database Connection and Server Start
const startServer = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error('ERROR: MONGODB_URI is not defined in environment variables');
            process.exit(1);
        }

        console.log('Connecting to MongoDB...');
        // Reduced timeout for faster error feedback in production
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000, 
            connectTimeoutMS: 10000,
        });
        console.log('MongoDB Connected successfully');

        await bootstrapAdmin();
        initCron(); // Initialize ROI Cron

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log('Ready to handle requests');
        });
    } catch (err) {
        console.error('Critical Database Connection Error:');
        console.error(err.message);
        console.error('Check your MONGODB_URI and IP Whitelist settings.');
        process.exit(1);
    }
};

startServer();
