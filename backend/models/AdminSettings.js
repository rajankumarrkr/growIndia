const mongoose = require('mongoose');

const adminSettingsSchema = new mongoose.Schema({
    upiId: { type: String, default: 'admin@upi' },
    qrCode: { type: String, default: '' }, // Base64 string
});

module.exports = mongoose.model('AdminSettings', adminSettingsSchema);
