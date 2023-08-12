const axios = require('axios');
const webhook_helper = require('./discord')
const moment = require('moment-timezone');

exports.CreateWebook = async (token, hostUrl, repo, discordId) => {
    const webhookConfig = {
        name: 'web',
        active: true,
        config: {
            url: `${hostUrl}/event/push/${discordId}`,
            content_type: 'json',
            secret: process.env.DEPLOY_SECRET,
            events: ['push'], // Customize as needed
        }
    }

    const headers = {
        headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
        }
    }

    var result;

    try {
        result = await axios.post(`https://api.github.com/repos/${repo}/hooks`, webhookConfig, headers);
        console.log('created github webhook', result.data)
        return result.data
    }
    catch (err) {
        await webhook_helper.sendErrorReport("creating webhook", err)
        console.error("we had an error\n", err)
    }
    return result
}