module.exports = (io) => {
    const webhook_helper = require('../functions/discord')
    const express = require('express');
    const router = express.Router();
    const db = require('../db/connect')
    const middleware = require('../functions/middleware')
    const verifyGitHubPayload = middleware.verifyGitHubPayload;

    router.post('/push/:discordId', verifyGitHubPayload, async (req, res) => {
        var incomingEvent = req.body
        var user = null;
        var event = null;
        try {
            user = await db.User.findById(req.params.discordId)
            if (user) {
                user.UpdateFromPush(incomingEvent.head_commit.timestamp)
                await user.save();
                event = await db.Event.create({
                    user: user._id,
                    currentPushes: user.totalPushes,
                    currentStreak: user.currentStreak,
                    repositoryName: incomingEvent.repository.name
                })

                io.emit('realtime',
                    {
                        username: user.discordUsername,
                        discordAvatar: user.discordAvatar,
                        githubName: user.githubUsername,
                        githubAvatar: user.githubAvatar,
                        repoName: event.repositoryName,
                        currentStreak: user.currentStreak,
                        totalPushes: user.totalPushes,
                        ts: user.lastPush_UTC
                    });
            }


            res.status(200).send("Successfully processed.");
        } catch (err) {
            await webhook_helper.sendErrorReport("handling incoming event", err)
            res.status(500).send("Error updating user on push event")
        }
    })


    router.get('/test-ws-push', async (req, res) => {
        console.log('incoming test')
        io.emit('realtime',
            {
                username: "user.discordUsername",
                discordAvatar: "user.discordAvatar",
                githubName: "user.githubUsername",
                githubAvatar: "user.githubAvatar",
                repoName: "user.repoName",
                currentStreak: "user.currentStreak",
                totalPushes: "user.totalPushes",
                ts: "user.lastPush_UTC"
            });
        res.status(200).send()
    })

    return router;
}