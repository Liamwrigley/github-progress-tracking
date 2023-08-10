module.exports = (io) => {
    const axios = require('axios');
    const {
        WebhookClient,
        AttachmentBuilder
    } = require('discord.js');

    const express = require('express');
    const router = express.Router();
    const db = require('../db/connect')


    router.post('/push/:discordId', async (req, res) => {
        const webhook = new WebhookClient({
            url: process.env.WEBHOOK_URL
        })

        var event = req.body
        var user = null;
        try {

            user = await db.User.findById(req.params.discordId)
            if (user) {
                user.UpdateFromPush(event.head_commit.timestamp)
                await user.save();
            }


            await webhook.send({ content: `<@${req.params.discordId}> has pushed` })

            io.emit('/realtime', { message: `<@${req.params.discordId}> has pushed`, discordAvatar: `https://cdn.discordapp.com/avatars/${user._id}/${user.discordAvatar}.png` });

            res.status(200).send("Successfully processed.");
        } catch (err) {
            res.status(500).send("Error updating user on push event")
            console.log("Error updating user on push event\n", err)
        }
    })

    return router;
}
