const axios = require("axios");
const github = require("../../functions/github");
const helpers = require("../../functions/helpers");
const middleware = require('./middleware')
const forceAuth = middleware.forceAuth;
const endSession = middleware.endSession;
const db = require('../../db/connect')

const express = require("express");
const router = express.Router();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;



router.get("/github", (req, res) => {
    // console.log("entry");
    // console.log("/github session:", req.session);

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
            // console.log(_token);
            req.session.token = _token;
            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Error saving session"
                    });
                }
                // console.log("Session saved:", req.session);
                res.redirect("/auth/github-select-repo");
            });
        })
        .catch((err) => {
            if (err.response && err.response.status === 401) {
                console.log("error");
                return res.redirect("/auth/github");
            } else {
                return res.status(500).json({
                    message: err.message
                });
            }
        });
});

router.get("/github-select-repo", forceAuth, async (req, res) => {
    var token = req.session.token;

    axios
        .get(
            "https://api.github.com/user/repos?type=owner&sort=created&direction=desc", {
            headers: {
                Authorization: `token ${token}`
            }
        }
        )
        .then((resp) => {
            var repoList = [];
            const repos = resp.data;
            repos.forEach((repo) => {
                repoList.push(repo);
            });
            res.render("repoSelect", {
                title: "Select Repository",
                repoList: repoList
            });
        });
});

router.post("/github-submit-repo", forceAuth, async (req, res, next) => {
    var token = req.session.token;
    var discordId = req.session.discordId
    var discordUsername = req.session.discordUsername
    var hostname = helpers.getBaseUrl(req)
    console.log("hostname", hostname);

    const repoData = JSON.parse(req.body.repoData)

    const repoName = repoData.url.replace("https://github.com/", "");

    // should have error handling
    try {
        await github.CreateWebook(token, hostname, repoName, discordId);
    } catch (err) {
        console.error("Error creating webhook:", error);
        return res.status(500).send("Error creating webhook");
    }


    // should check if this exists before we create
    var userExists = await db.DoesUserExist(discordId);
    if (!userExists) {

        const user = await db.User.create({
            _id: discordId,
            discordUsername: discordUsername,
            timezone: repoData.timezone,
            repoName: repoName.split("/")[1],
            githubName: repoName.split("/")[0]
        })
        console.log('user done')
    }

    res.redirect("/auth/testing");
});

router.get('/', endSession, (req, res) => {
    res.render('index', { title: 'happy coding!' })
})

module.exports = router;