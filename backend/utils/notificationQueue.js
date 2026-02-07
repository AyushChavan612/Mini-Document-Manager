const Queue = require('better-queue');

const notificationQueue = new Queue(async (task, cb) => {
    console.log(`[Background Job] Processing file: ${task.filename}...`);

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log(`[Background Job] SUCCESS: ${task.filename}`);
        cb(null, { result: 'sent' });
    } catch (err) {
        console.error('[Background Job] FAILED');
        cb(err);
    }
});

module.exports = notificationQueue;