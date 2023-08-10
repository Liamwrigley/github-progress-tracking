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

        console.log("event")

        if (typeof req.body === 'object') {
            console.log('Body is already an object', req.body);
        } else {
            console.log('Trying to parse body', req.body);
            const parsedBody = JSON.parse(req.body);
        }
        // var event = JSON.parse(req.body)
        // console.log(event.head_commit.timestamp)
        // db.User.findById(req.params.discordId)
        // if (user) {
        //     user.UpdateFromPush()
        // }

        // console.log(JSON.parse)
        // test event

        await webhook.send({ content: `<@${req.params.discordId}> has pushed` })

        io.emit('/realtime', { message: `<@${req.params.discordId}> has pushed` });

        res.status(200).send("Successfully processed.");
    })

    return router;
}
