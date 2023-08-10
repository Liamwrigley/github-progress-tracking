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
        console.log(event.head_commit.timestamp)
        db.User.findById(req.params.discordId)
        if (user) {
            user.UpdateFromPush(event.head_commit.timestamp)
        }


        await webhook.send({ content: `<@${req.params.discordId}> has pushed` })

        io.emit('/realtime', { message: `<@${req.params.discordId}> has pushed` });

        res.status(200).send("Successfully processed.");
    })

    return router;
}
