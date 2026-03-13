const mongoose = require('mongoose');

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        });

        console.log('MongoDB Connected successfully');
    } catch (err) {
        console.error('Critical Database Connection Error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
