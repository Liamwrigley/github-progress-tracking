const axios = require('axios');
const {
    WebhookClient,
    AttachmentBuilder
} = require('discord.js');

const express = require('express');
const router = express.Router();


router.post('/push/:discordId', async (req, res) => {
    const webhook = new WebhookClient({
        url: process.env.WEBHOOK_URL
    })

    // nothing - just testing push
    // const data = JSON.parse(req.body);
    // console.log(data)

    await webhook.send({content: `<@${req.params.discordId}> has pushed`})
    
    res.status(200).send("Successfully processed.");
})



module.exports = router;