module.exports = (io) => {
    const webhook_helper = require('../functions/discord')
    const express = require('express');
    const router = express.Router();
    const db = require('../db/connect')


    router.post('/push/:discordId', async (req, res) => {
        var event = req.body
        var user = null;
        try {
            user = await db.User.findById(req.params.discordId)
            if (user) {
                await db.Event.create({
                    user: user._id
                })
                user.UpdateFromPush(event.head_commit.timestamp)
                await user.save();

                // io.emit('/realtime', { user: `<${user.discordUsername} has pushed`, discordAvatar: `https://cdn.discordapp.com/avatars/${user._id}/${user.discordAvatar}.png` });
                io.emit('/realtime',
                    {
                        username: user.discordUsername,
                        discordAvatar: `https://cdn.discordapp.com/avatars/${user._id}/${user.discordAvatar}.png`,
                        currentStreak: user.currentStreak,
                        ts: user.lastPush_UTC
                    });
            }


            res.status(200).send("Successfully processed.");
        } catch (err) {
            await webhook_helper.sendErrorReport("handling incoming event", err)
            res.status(500).send("Error updating user on push event")
        }
    })

    return router;
}