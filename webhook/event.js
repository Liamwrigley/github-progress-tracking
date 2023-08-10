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
        try {

            const user = await db.User.findById(req.params.discordId)
            if (user) {
                user.UpdateFromPush(event.head_commit.timestamp)
                await user.save();
            }
        } catch (err) {
            //test push
            console.log("Error updating user on push event\n", err)
        }


        await webhook.send({ content: `<@${req.params.discordId}> has pushed` })

        io.emit('/realtime', { message: `<@${req.params.discordId}> has pushed` });

        res.status(200).send("Successfully processed.");
    })

    return router;
}
