const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

console.log('Attempting to connect to:', process.env.MONGODB_URI.replace(/:([^@]+)@/, ':****@'));

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 10s
})
.then(() => {
    console.log('Successfully connected to MongoDB');
    process.exit(0);
})
.catch(err => {
    console.error('Connection error:', err.message);
    console.error('Full error:', err);
    process.exit(1);
});
