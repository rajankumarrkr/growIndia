const Investment = require('../models/Investment');
const User = require('../models/User');

/**
 * Processes daily ROI for all active investments.
 * @returns {Promise<{success: boolean, processedCount: number, error: string|null}>}
 */
const processDailyIncome = async () => {
    console.log('Processing Daily ROI Credit...');
    let processedCount = 0;
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
            processedCount++;
        }
        
        console.log(`ROI credited for ${processedCount} investments.`);
        return { success: true, processedCount, error: null };
    } catch (err) {
        console.error('Error in Daily ROI Processing:', err);
        return { success: false, processedCount, error: err.message };
    }
};

module.exports = { processDailyIncome };
