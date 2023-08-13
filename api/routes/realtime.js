const express = require("express");
const router = express.Router();
const db = require('../db/connect')

router.get('/', async (req, res) => {
    var events = [];
    try {
        const recentEvents = await db.Event.find()
            .sort({ ts: -1 })
            .limit(50)
            .populate('user', '_id discordUsername discordAvatar lastPush_UTC')
            .exec();

        events = recentEvents.map(e => ({
            username: e.user.discordUsername,
            discordAvatar: `https://cdn.discordapp.com/avatars/${e.user._id}/${e.user.discordAvatar}.png`,
            currentStreak: e.currentStreak,
            totalPushes: e.currentPushes,
            ts: e.ts
        }))
    } catch (err) {
        console.error("Error fetching latest events:", err);
    }

    res.render('realtime', { title: "Realtime Events", data: events })
})

module.exports = router;
