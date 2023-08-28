const helpers = require("../../functions/helpers")
const db = require('../../db/connect')
const discord = require('./discord')
const github = require('./github')

const express = require("express");
const router = express.Router();

const UI_URL = process.env.PRODUCTION === "true" ? "https://github-tracker.rowrisoft.xyz" : "http://localhost:4002"

const setSession = (req, user, id, source) => {
    return req.session.user = {
        source: source,
        id: id,
        setupComplete: user.setupComplete,
        discord: {
            id: user.discordId,
            name: user.discordUsername,
            avatar: user.discordAvatar
        },
        github: {
            id: user.githubId,
            name: user.githubUsername,
            avatar: user.githubAvatar,
            repo: user.repoName
        }
    }
}

const sessionPrinter = (req, res, next) => {
    console.log('Requesting URL:', req.originalUrl);
    console.log('Cookie Header:', req.headers.cookie);
    console.log("Session ID:", req.session.id,);
    // console.log(req.get("host"), "Session ID:", req.session.id, "Session Data:", req.session);
    next()
}

router.get('/status', sessionPrinter, (req, res) => {
    if (req.session && req.session.user) {
        res.json({
            authenticated: true,
            needsDiscordToken: !req.session?.discordToken,
            needsGithubToken: !req.session?.githubToken,
            user: req.session.user
        });
    } else {
        res.json({ authenticated: false });
    }
});

router.get('/discord-oauth-callback', sessionPrinter, async (req, res) => {
    try {
        const accessToken = await discord.getDiscordAccessToken(
            req.query.code,
            `${helpers.getBaseUrl(req)}/auth/discord-oauth-callback`
        );

        const discordUser = await discord.getDiscordUserDetails(accessToken);

        var user = await db.User.findOne({ discordId: discordUser.id }).exec()

        if (!user) {
            user = await db.User.create({
                _id: discordUser.id,
                discordId: discordUser.id,
                discordUsername: discordUser.username,
                discordAvatar: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`,
            })
        }

        setSession(req, user, user.discordId, 'discord')

        console.log("session within callback", req.session)
        req.session.discordToken = accessToken;

    } catch (error) {
        console.error("Error in Discord callback:", error);
        res.status(500).send("Authentication error");
    }

    req.session.save((err) => {
        if (err) {
            return res.status(500).send("Authentication error");
        }
        if (user.setupComplete) {
            res.redirect(`${UI_URL}/profile/${user.discordId}`)
        } else {
            res.redirect(`${UI_URL}/auth/setup`)
        }
    })
})

const HasDiscordId = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.discord.id) {
        return next()
    } else {
        res.status(401).send("Please start auth process again.")
    }
}

router.get('/github-oauth-callback', sessionPrinter, HasDiscordId, async (req, res) => {
    console.log('github callback')
    var userSession = req.session.user
    try {
        const accessToken = await github.getGithubAccessToken(req.query.code);

        const githubUser = await github.getGithubUserDetails(accessToken);

        const user = await db.User.findOne({ discordId: userSession.discord.id }).exec()

        if (user) {
            user.githubId = githubUser.id;
            user.githubUsername = githubUser.login;
            user.githubAvatar = githubUser.avatar_url;
            await user.save();
        } else {
            res.status(401).send("Please start auth process again.")
        }

        setSession(req, user, user.githubId, 'github')
        req.session.githubToken = accessToken;


    } catch (error) {
        console.error("Error in Github callback:", error);
        res.status(500).send("Authentication error");
    }

    req.session.save((err) => {
        if (err) {
            return res.status(500).send("Authentication error");
        }
        if (user.setupComplete) {
            res.redirect(`${UI_URL}/profile/${user.discordId}`)
        } else {
            res.redirect(`${UI_URL}/auth/setup`)
        }
    })
})

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    console.log('isAuthenticated')
    res.status(401).send('Not Authenticated');
}
const hasGithubToken = (req, res, next) => {
    if (req.session && req.session.githubToken) {
        return next()
    }
    console.log('hasGithubToken')
    res.status(401).send('Not Authenticated');
}

router.get('/github-repos', sessionPrinter, hasGithubToken, async (req, res) => {
    var token = req.session.githubToken
    try {
        var repos = await github.getGithubRepoDetails(token)
        res.send(repos)
    } catch (error) {
        console.error("Error in repo get:", error);
        res.status(500).send("Cant get repositories");
    }
})

router.post('/repo-select', sessionPrinter, hasGithubToken, isAuthenticated, async (req, res) => {
    var token = req.session.githubToken
    var userSession = req.session.user
    try {
        var hostname = helpers.getBaseUrl(req)
        const repoInfo = JSON.parse(req.body.data.repoInfo)

        const user = await db.User.findOne({ discordId: userSession.discord.id }).exec()
        var webhookUrl = `${hostname}/event/push/${userSession.discord.id}`
        var webhook = await github.postGithubCreateWebhook(token, repoInfo, webhookUrl)

        if (user) {
            user.webhookId = webhook.id;
            user.repoName = repoInfo.name
            user.setupComplete = true
            await user.save()
        } else {
            console.error("Error in webhook creation:", error);
            res.status(500).send("Authentication error");
        }

        setSession(req, user, user.githubId, 'github')

        // maybe send back to '/'?
        res.send(user)

    } catch (error) {
        console.error("Error in webhook setup:", error);
        res.status(500).send("Cant setup webhook");
    }
})


router.get('/logout', sessionPrinter, (req, res) => {
    req.session.destroy();
    console.log('session ended, returning to', UI_URL)
    res.status(200).send()
    // res.redirect(`${UI_URL}/`)
});

module.exports = router;