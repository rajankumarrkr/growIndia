const cron = require('node-cron');
const Investment = require('../models/Investment');
const User = require('../models/User');

const initCron = () => {
    // Run every day at 12:00 AM
    cron.schedule('0 0 * * *', async () => {
        console.log('Running Daily ROI Credit Job...');
        try {
            const activeInvestments = await Investment.find({ status: 'active', daysRemaining: { $gt: 0 } });

            for (const inv of activeInvestments) {
                // Credit ROI to user wallet
                await User.findByIdAndUpdate(inv.userId, {
                    $inc: { walletBalance: inv.dailyReturn }
                });

                // Update Investment record
                inv.daysRemaining -= 1;
                inv.lastRoiCredit = new Date();
                if (inv.daysRemaining === 0) {
                    inv.status = 'completed';
                }
                await inv.save();
            }
            console.log(`ROI credited for ${activeInvestments.length} investments.`);
        } catch (err) {
            console.error('Error in Cron Job:', err);
        }
    });
};

module.exports = initCron;
