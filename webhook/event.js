module.exports = (io) => {
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

        //commit 1
        //commit 2
        // console.log(JSON.parse)
    
        await webhook.send({content: `<@${req.params.discordId}> has pushed`})
    
        io.emit('/realtime', { message: `<@${req.params.discordId}> has pushed` });
        
        res.status(200).send("Successfully processed.");
    })
    
    return router;
}
