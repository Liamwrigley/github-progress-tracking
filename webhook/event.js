const axios = require('axios');
const {
    WebhookClient,
    AttachmentBuilder
} = require('discord.js');

const express = require('express');
const router = express.Router();


router.post('/push', async (req, res) => {
    const webhook = new WebhookClient({
        url: process.env.WEBHOOK_URL
    })

    await webhook.send({content: 'user has pushed'})
    
    res.status(200).send("Successfully processed.");
})



module.exports = router;