const axios = require("axios");

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_URL = "https://api.github.com/user";
const GITHUB_REPO_URL = "https://api.github.com/user/repos?type=owner&sort=created&direction=desc";
const GITHUB_CREATE_WEBHOOK_URL = (repoName) => `https://api.github.com/repos/${repoName}/hooks`;

exports.getGithubAccessToken = async (code) => {
    try {
        const response = await axios.post(GITHUB_TOKEN_URL, {
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code: code,
        }, {
            headers: {
                accept: "application/json"
            },
            withCredentials: true,
        });

        return response.data.access_token;
    } catch (error) {
        console.error("Error getting Discord access token:", error);
        throw error;
    }
}

exports.getGithubUserDetails = async (accessToken) => {
    try {
        const response = await axios.get(GITHUB_USER_URL, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching Github user details:", error);
        throw error;
    }
}

exports.getGithubRepoDetails = async (accessToken) => {
    try {
        const response = await axios.get(GITHUB_REPO_URL, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching Github repo details:", error);
        throw error;
    }
}

exports.postGithubCreateWebhook = async (accessToken, repo, webhookUrl) => {
    try {
        const response = await axios.post(GITHUB_CREATE_WEBHOOK_URL(repo.name), {
            name: 'web',
            active: true,
            config: {
                url: webhookUrl,//`${hostUrl}/event/push/${discordId}`,
                content_type: 'json',
                secret: process.env.DEPLOY_SECRET,
                events: ['push'], // Customize as needed
            }
        }, {
            headers: {
                Authorization: `token ${accessToken}`,
                Accept: 'application/vnd.github.v3+json',
            },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error("Error creating webhook:", error);
        throw error;
    }
}