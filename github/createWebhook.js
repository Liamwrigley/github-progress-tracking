const axios = require('axios');

const userToken = 'USER_OAUTH2_TOKEN';
const repo = 'username/repo';
const url = `https://api.github.com/repos/${repo}/hooks`;

const webhookConfig = {
  url: 'https://yourserver.com/github-webhook',
  content_type: 'json',
  secret: 'YOUR_SECRET', // Optional
  events: ['push'], // Customize as needed
};

axios.post(url, {
  name: 'web',
  active: true,
  config: webhookConfig,
}, {
  headers: {
    Authorization: `token ${userToken}`,
    Accept: 'application/vnd.github.v3+json',
  },
});

exports.CreateWebhook = async (userToken, repo) => {

}
