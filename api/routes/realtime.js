const express = require("express");
const router = express.Router();
const db = require('../db/connect')

router.get('/', async (req, res) => {
    var events = [];
    try {
        const recentEvents = await db.Event.find()
            .sort({ ts: -1 })
            .limit(50)
            .populate('user', '_id discordUsername currentStreak githubName repoName discordAvatar githubAvatar lastPush_UTC')
            .exec();

        events = recentEvents.map(e => ({
            username: e.user.discordUsername,
            githubName: e.user.githubName,
            discordAvatar: e.user.discordAvatar,
            repoName: e.user.repoName,
            username: e.user.discordUsername,
            githubAvatar: e.user.githubAvatar,
            currentStreak: e.currentStreak,
            totalPushes: e.currentPushes,
            ts: e.ts
        }))
        res.send(events)
    } catch (err) {
        console.error("Error fetching latest events:", err);
    }
    // res.render('realtime', { title: "Realtime Events", data: events })
})

module.exports = router;
