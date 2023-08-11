const axios = require('axios');
const webhook_helper = require('./discord')

exports.CreateWebook = async (token, hostUrl, repo, discordId) => {
    const webhookConfig = {
        name: 'web',
        active: true,
        config: {
            url: `${hostUrl}/event/push/${discordId}`,
            content_type: 'json',
            secret: 'YOUR_SECRET', // Optional
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
        console.log('created github webhook', result)
    }
    catch (err) {
        await webhook_helper.sendErrorReport("creating webhook", err)
        console.error("we had an error\n", err)
    }
    return result
}


