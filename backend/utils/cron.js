const cron = require('node-cron');
const { processDailyIncome } = require('./incomeLogic');

const initCron = () => {
    // Run every day at 12:00 AM
    cron.schedule('0 0 * * *', async () => {
        await processDailyIncome();
    });
};

module.exports = initCron;
