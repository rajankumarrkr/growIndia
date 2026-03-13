const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const connectDB = require('./config/db');
const initCron = require('./utils/cron');

dotenv.config();

const app = express();

// Security and Performance Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Lightweight Health Check Endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/wallet', require('./routes/walletRoutes'));
app.use('/api/invest', require('./routes/investRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));

// Admin check - bootstrap admin if none exists (Svcet Access)
const bootstrapAdmin = async () => {
    try {
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
    } catch (err) {
        console.error('Error bootstrapping admin:', err.message);
    }
};

// Start Server
const startServer = async () => {
    try {
        await connectDB();
        await bootstrapAdmin();
        initCron();

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err.message);
        process.exit(1);
    }
};

startServer();
