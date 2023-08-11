const axios = require("axios");
const github = require("../../functions/github");
const helpers = require("../../functions/helpers");
const webhook_helper = require("../../functions/discord");
const middleware = require('./middleware')
const forceAuth = middleware.forceAuth;
const endSession = middleware.endSession;
const db = require('../../db/connect')

const express = require("express");
const router = express.Router();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;



router.get("/github", (req, res) => {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo_hook%20repo`
    );
});

router.get("/github-oath-callback", async (req, res) => {
    const body = {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: req.query.code,
    };

    const options = {
        headers: {
            accept: "application/json"
        },
        withCredentials: true,
    };

    axios
        .post("https://github.com/login/oauth/access_token", body, options)
        .then((res) => res.data["access_token"])
        .then((_token) => {
            // Use the access token for authentication in future requests
            req.session.token = _token;
            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Error saving session"
                    });
                }
                res.redirect("/auth/github-select-repo");
            });
        })
        .catch(async (err) => {
            if (err.response && err.response.status === 401) {
                return res.redirect("/auth/github");
            } else {
                await webhook_helper.sendErrorReport("creating webhook", err)
                return res.status(500).json({
                    message: err.message
                });
            }
        });
});

router.get("/github-select-repo", forceAuth, async (req, res) => {
    var token = req.session.token;

    var result = await axios.get(
        "https://api.github.com/user/repos?type=owner&sort=created&direction=desc", {
        headers: {
            Authorization: `token ${token}`
        }
    });

    var repoList = [];
    result.data.forEach((repo) => {
        repoList.push(repo)
    });

    res.render("repoSelect", {
        title: "Select Repository",
        repoList: repoList
    });
});

router.post("/github-submit-repo", forceAuth, async (req, res, next) => {
    var token = req.session.token;
    var discordId = req.session.discordId
    var hostname = helpers.getBaseUrl(req)

    const repoData = JSON.parse(req.body.repoData)

    const repoName = repoData.url.replace("https://github.com/", "");

    // should check if this exists before we create
    var userExists = await db.DoesUserExist(discordId);

    //TODO: make it so users can only have 1 webhook. Needs to be changable or removable
    // need to check if the webhook still exists, if it does not, add new one.
    if (!userExists) {
        var githubWebhook;
        try {
            githubWebhook = await github.CreateWebook(token, hostname, repoName, discordId);
        } catch (err) {
            console.error("Error creating webhook:", err);
            return res.status(500).send("Error creating webhook");
        }
        const user = await db.User.create({
            _id: discordId,
            discordUsername: req.session.discordUsername,
            discordAvatar: req.session.discordAvatar,
            timezone: repoData.timezone,
            repoName: repoName.split("/")[1],
            githubName: repoName.split("/")[0],
            webhookId: githubWebhook.id
        })
        await webhook_helper.sendWebhook("Welcome!", { "Discord": `<@${discordId}>` })
    }

    res.redirect(`/auth/complete/${discordId}`);
});

router.get('/complete/:discordId', forceAuth, endSession, async (req, res) => {
    var user = { discordUsername: "-", githubName: "-", repoName: "-", timezone: "-" };
    try {
        user = await db.User.findById(req.params.discordId)
    } catch (err) {
        await webhook_helper.sendErrorReport("finalising", err)
    }
    res.render('authFinal', { title: 'happy coding!', user: user })
})

module.exports = router;