const schedule = require('node-schedule');
const moment = require('moment-timezone');
const db = require('../db/connect')
const webhook_helper = require('./discord')



const rule = new schedule.RecurrenceRule();
rule.minute = new schedule.Range(0, 59, 2); // every 2 minutes
rule.tz = 'Etc/UTC';

exports.streakCheck = schedule.scheduleJob(rule, async function () {
    console.log('slappin\' cheeks and endin\' streaks')
    var result;
    try {

        var currentTime = moment().utc().toDate();
        result = await db.User.updateMany(
            {
                endStreakAt_UTC: { $lte: currentTime },
                hasCurrentStreak: true
            },
            {
                $set: {
                    currentStreak: 0,
                    hasCurrentStreak: false
                }
            }
        )

        if (result.modifiedCount > 0) {
            await webhook_helper.sendWebhook("Streaks Ended", { "Count": result.modifiedCount })
        }
        console.log(`Ended ${result.modifiedCount} streaks :(`)

        // might want to send this as an event
    } catch (err) {
        await webhook_helper.sendErrorReport("ending streaks", err)
        console.error('Error ending streaks:', err)
    }
});