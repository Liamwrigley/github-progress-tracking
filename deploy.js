const { exec } = require('child_process');
const express = require("express");
const crypto = require('crypto');
const router = express.Router();
const webhook_helper = require('./functions/discord')

const verifyGitHubPayload = (req, res, next) => {
    const payload = JSON.stringify(req.body);
    if (!payload) {
        return res.status(400).send('Request body empty');
    }

    const sig = req.get('X-Hub-Signature-256');
    if (!sig) {
        return res.status(401).send('Missing X-Hub-Signature-256');
    }

    const hmac = crypto.createHmac('sha256', process.env.DEPLOY_SECRET);
    const digest = 'sha256=' + hmac.update(payload).digest('hex');

    if (sig !== digest) {
        return res.status(401).send('Mismatched X-Hub-Signature-256');
    }

    return next();
}

router.post("/deploy", verifyGitHubPayload, async (req, res) => {
    await webhook_helper.sendInfoReport("incomming deploy event")

    exec('', (error, stdout, stderr) => {
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

//fix hook
