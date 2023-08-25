const axios = require("axios");
const express = require("express");

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

const DISCORD_TOKEN_URL = "https://discord.com/api/oauth2/token";
const DISCORD_USER_URL = "https://discord.com/api/users/@me";

exports.getDiscordAccessToken = async (code, redirectUrl) => {

    try {
        const response = await axios.post(DISCORD_TOKEN_URL, new URLSearchParams({
            client_id: DISCORD_CLIENT_ID,
            client_secret: DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUrl
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true,
        });
        return response.data.access_token;
    } catch (error) {
        console.error("Error getting Discord access token:", error);
        throw error;
    }
}

exports.getDiscordUserDetails = async (accessToken) => {
    try {
        const response = await axios.get(DISCORD_USER_URL, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching Discord user details:", error);
        throw error;
    }
}