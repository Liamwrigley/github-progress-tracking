const axios = require('axios');
const {
    WebhookClient,
    AttachmentBuilder
} = require('discord.js');

const express = require('express');
const router = express.Router();


router.post('/push', async (req, res) => {
    const webhook = new WebhookClient({
        url: 'https://discord.com/api/webhooks/1137714263230791773/4gjImZBaE9K563luQjH6TyW0mMvkSwKbX4xM-FMCegjN0G8X3GfFoh7KbO2zVSJ8iyaZ'
    })

    await webhook.send({content: 'user has pushed'})
    
    res.status(200).send("Successfully processed.");
})



module.exports = router;