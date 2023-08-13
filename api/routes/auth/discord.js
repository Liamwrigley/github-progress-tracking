const axios = require("axios");
const middleware = require('../../functions/middleware')
const helpers = require("../../functions/helpers")
const webhook_helper = require("../../functions/discord")
const forceAuth = middleware.forceAuth;

const express = require("express");
const router = express.Router();

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;


const getCallbackUrl = (req) => `${helpers.getBaseUrl(req)}/auth/discord-oauth-callback`

router.get('/discord', (req, res) => {
    console.log("callback", getCallbackUrl(req))
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    var url = `https://discord.com/oauth2/authorize?response_type=code&client_id=${DISCORD_CLIENT_ID}&scope=identify%20guilds&redirect_uri=${getCallbackUrl(req)}&prompt=none`
    res.redirect(url)
})

router.get("/discord-oauth-callback", async (req, res) => {
    const body = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: getCallbackUrl(req),
        code: req.query.code,
    });

    const options = {
        headers: {
            accept: "application/x-www-form-urlencoded"
        },
        withCredentials: true,
    };

    axios.post("https://discord.com/api/oauth2/token", body, options)
        .then((res) => res.data["access_token"])
        .then(_token => {
            console.log('TOKEN GET')
            // Use the access token for authentication in future requests
            req.session.token = _token;
            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Error saving session"
                    });
                }
                console.log('REDIRECT TO DISCORD-SAVE')
                res.redirect("/auth/discord-save");
            });
        })
        .catch(async (err) => {
            if (err.response && err.response.status === 401) {
                return res.redirect("/auth/discord");
            } else {
                await webhook_helper.sendErrorReport("discord auth", err)
                return res.status(500).json({
                    message: err.message
                });
            }
        });
})

router.get('/discord-save', forceAuth, async (req, res) => {
    var token = req.session.token;

    const user = await axios.get('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    req.session.discordId = user.data.id;
    req.session.discordUsername = user.data.username;
    req.session.discordAvatar = user.data.avatar;
    req.session.token = null

    req.session.save((err) => {
        if (err) {
            return res.status(500).json({
                message: "Error saving session"
            });
        }
        res.redirect('http://localhost:4002/auth')
        // res.status(200).send(req.session)
        // res.redirect("/auth/github");
    });
})

router.get("/testing", (req, res) => {
    console.log(req.session)
    res.status(200).send({ testing: "nice" })
})








module.exports = router;