const { exec } = require('child_process');
const express = require("express");
const router = express.Router();
const webhook_helper = require('./functions/discord')
const middleware = require('./functions/middleware')
const verifyGitHubPayload = middleware.verifyGitHubPayload;

router.post("/deploy", verifyGitHubPayload, async (req, res) => {
    await webhook_helper.sendInfoReport("incomming deploy event")

    exec('./deploy.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });

    res.sendStatus(200);
})

module.exports = router;
