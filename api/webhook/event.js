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
        var repo = null;

        try {
            user = await db.User.findById(req.params.discordId)
            repo = await db.Repo.findById(incomingEvent.repository.id)
            if (user) {
                user.UpdateFromPush(incomingEvent.head_commit.timestamp)
                event = await db.Event.create({
                    user: user._id,
                    repo: incomingEvent.repository.id,
                    currentPushes: user.totalPushes,
                    currentStreak: user.currentStreak,
                    repositoryName: incomingEvent.repository.name,
                    commitMessage: incomingEvent.head_commit.message
                })

                user.events.push(event)
                await user.save();

                repo.description = incomingEvent.repository.description
                repo.name = incomingEvent.repository.name
                repo.totalPushes++;
                repo.totalCommits += incomingEvent.commits.length
                await repo.save()

                io.emit('realtime',
                    {
                        username: user.discordUsername,
                        discordAvatar: user.discordAvatar,
                        githubName: user.githubUsername,
                        githubAvatar: user.githubAvatar,
                        repoName: event.repositoryName,
                        commitMessage: event.commitMessage,
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

    return router;
}