const axios = require('axios');

exports.CreateWebook = async (token, hostUrl, repo) => {
    const webhookConfig = { 
        name: 'web', 
        active: true, 
        config: {
            url: `${hostUrl}/event/push`,
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

    var result;

    try {
        result = await axios.post(`https://api.github.com/repos/${repo}/hooks`, webhookConfig, headers);
    }
    catch (err) {
        console.log("we had an error\n", err)
    }
    return result
}


