const { exec } = require('child_process');
const express = require("express");
const router = express.Router();
const webhook_helper = require('./functions/discord')
const middleware = require('./functions/middleware')
const verifyGitHubPayload = middleware.verifyGitHubPayload;

router.post("/deploy", verifyGitHubPayload, async (req, res) => {
    await webhook_helper.sendInfoReport("incomming deploy event")

    exec('sudo /root/github-progress-tracking/api/deploy.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error Code: ${error.code}`);
            console.error(`Signal: ${error.signal}`);
            console.error(`Exec error: ${error.message}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });

    res.sendStatus(200);
})

module.exports = router;
