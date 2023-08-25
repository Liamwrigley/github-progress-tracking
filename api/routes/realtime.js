const express = require("express");
const router = express.Router();
const db = require('../db/connect')

router.get('/', async (req, res) => {
    var events = [];
    try {
        const recentEvents = await db.Event.find()
            .sort({ ts: -1 })
            .limit(50)
            .populate('user', '_id discordUsername currentStreak githubUsername repoName discordAvatar githubAvatar lastPush_UTC')
            .exec();

        recentEvents.forEach(e => {
            events.push({
                username: e.user.discordUsername,
                discordAvatar: e.user.discordAvatar,
                githubName: e.user.githubUsername,
                githubAvatar: e.user.githubAvatar,
                repoName: e.user.repoName,
                currentStreak: e.currentStreak,
                totalPushes: e.currentPushes,
                ts: e.ts
            })
        })
    } catch (err) {
        console.error("Error fetching latest events:", err);
    }
    res.send(events)
    // res.render('realtime', { title: "Realtime Events", data: events })
})

module.exports = router;
