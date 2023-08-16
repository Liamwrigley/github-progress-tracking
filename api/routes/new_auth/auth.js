const middleware = require('../../functions/middleware')
const helpers = require("../../functions/helpers")
const db = require('../../db/connect')
const discord = require('./discord')
const github = require('./github')

const express = require("express");
const router = express.Router();

const setSession = (req, user, id, source) => {
    return req.session.user = {
        source: source,
        id: id,
        discord: {
            id: user.discordId,
            name: user.discordUsername,
            avatar: user.discordAvatar
        },
        github: {
            id: user.githubId,
            name: user.githubUsername,
            avatar: user.githubAvatar
        }
    }
}

const sessionPrinter = (req, res, next) => {
    console.log(req.get("host"), req.session)
    next()
}

const getCallbackUrl = (req) => `${helpers.getBaseUrl(req)}/auth/discord-oauth-callback`

router.get('/status', sessionPrinter, (req, res) => {
    debugger;
    if (req.session && req.session.user) {
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.json({ authenticated: false });
    }
});

router.get('/discord-oauth-callback', sessionPrinter, async (req, res) => {
    try {
        const accessToken = await discord.getDiscordAccessToken(
            req.query.code,
            getCallbackUrl(req)
        );

        const discordUser = await discord.getDiscordUserDetails(accessToken);

        const user = await db.User.findOne({ discordId: discordUser.id }).exec()

        if (!user) {
            user = await db.User.create({
                _id: discordUser.id,
                discordId: discordUser.id,
                discordUsername: discordUser.username,
                discordAvatar: discordUser.avatar,
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
        res.redirect('http://localhost:4002/auth/discord-complete')
    })
})

const CameFromDiscordAuth = (req, res, next) => {
    console.log(req)
    if (req.session && req.session && req.session.user.id && req.session.user.source == 'discord') {
        next()
    } else {
        res.status(401).send("Please start auth process again.")
    }
}

router.get('/github-oauth-callback', sessionPrinter, CameFromDiscordAuth, async (req, res) => {
    console.log('github callback')
    var userSession = req.session.user
    try {
        const accessToken = await github.getGithubAccessToken(req.query.code);

        const githubUser = await github.getGithubUserDetails(accessToken);

        const user = db.User.findOne({ discordId: userSession.discord.id }).exec()

        if (user) {
            user.githubId = githubUser.id
            user.githubUsername = githubUser.login;
            user.githubAvatar = githubUser.avatar_url
        } else {
            res.status(401).send("Please start auth process again.")
        }

        setSession(req, user, user.githubId, 'github')
        req.session.githubtoken = accessToken;


    } catch (error) {
        console.error("Error in Github callback:", error);
        res.status(500).send("Authentication error");
    }

    req.session.save((err) => {
        if (err) {
            return res.status(500).send("Authentication error");
        }
        res.redirect('http://localhost:4002/auth/github-complete')
    })
})

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    }
    res.status(401).send('Not Authenticated');
}
const hasGithubToken = (req, res, next) => {
    if (req.session && req.session.githubToken) {
        next()
    }
    res.status(401).send('Not Authenticated');
}

router.get('/github-repos', sessionPrinter, hasGithubToken, async (res, req) => {
    var token = req.session.githubToken
    try {
        var repos = await github.getGithubRepoDetails(token)
        res.send(repos)
    } catch (error) {
        console.error("Error in repo get:", error);
        res.status(500).send("Cant get repositories");
    }
})

router.post('repo-select', sessionPrinter, hasGithubToken, isAuthenticated, async (req, res) => {
    var token = req.session.githubToken
    var userSession = req.session.user
    try {
        var hostname = helpers.getBaseUrl(req)
        const repoInfo = JSON.parse(req.body.repoInfo)

        const user = db.User.findOne({ discordId: userSession.discord.id }).exec()
        var webhookUrl = `${hostname}/event/push/${userSession.discord.id}`
        var webhook = github.postGithubCreateWebhook(token, { name: 'test name please change' }, webhookUrl)

        if (user) {
            user.webhookId = webhook.id;
            user.repoName = "test name please change"
            user.setupComplete = true
        } else {
            console.error("Error in webhook creation:", error);
            res.status(500).send("Authentication error");
        }

        // maybe send back to '/'?
        res.send(user)

    } catch (error) {
        console.error("Error in webhook setup:", error);
        res.status(500).send("Cant setup webhook");
    }
})


router.get('/logout', sessionPrinter, (req, res) => {
    req.session.destroy();
    res.redirect('http://localhost:4002/');
});

module.exports = router;