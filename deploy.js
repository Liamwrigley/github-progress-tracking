const { exec } = require('child_process');
const express = require("express");
const router = express.Router();
const webhook_helper = require('./functions/discord')

router.post("/deploy", async (req, res) => {
    const secret = process.env.DEPLOY_SECRET
    await webhook_helper.sendInfoReport("incomming deploy event")

    var event = req.body
    if (secret == event.hook.config.secret) {
        exec('', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });

        res.sendStatus(200);
    } else {
        console.error("secret did not match for deploy")
        res.status(401).send("Secret did not match")
    }
})

module.exports = router;

//test changes