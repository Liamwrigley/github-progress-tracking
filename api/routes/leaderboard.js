const webhook_helper = require('../functions/discord')
const db = require('../db/connect')

const express = require("express");
const router = express.Router();

router.get('/leaderboard', async (req, res) => {
    let users = [];
    try {
        var usersFromDb = await db.User.find({ hasCurrentStreak: true })
            .sort({ currentStreak: -1 })
            .limit(50)
            .exec()

        usersFromDb.forEach(u =>
            u.discordAvatar = `https://cdn.discordapp.com/avatars/${u._id}/${u.discordAvatar}.png`,
        )
        users = usersFromDb

    } catch (err) {
        console.error("Error: ", err)
        await webhook_helper.sendErrorReport("loading leaderboard", err)
    }

    res.render('leaderboard',
        {
            title: "Leaderboard!",
            users: users
        }
    )
})

module.exports = router;