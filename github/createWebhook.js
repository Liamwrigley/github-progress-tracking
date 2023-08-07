const axios = require('axios');

exports.CreateWebook = async (token, repo) => {
    const webhookConfig = { 
        name: 'web', 
        active: true, 
        config: {
            url: 'https://discord.com/api/webhooks/1137714263230791773/4gjImZBaE9K563luQjH6TyW0mMvkSwKbX4xM-FMCegjN0G8X3GfFoh7KbO2zVSJ8iyaZ',
            // url: 'http://localhost:5099/event/push',
            content_type: 'json',
            secret: 'YOUR_SECRET', // Optional
            events: ['push'], // Customize as needed
        }
    }

    const headers = {
        headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
        }}

    return axios.post(`https://api.github.com/repos/${repo}/hooks`, webhookConfig, headers);
}


