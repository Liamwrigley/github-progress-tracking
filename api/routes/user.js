const express = require("express");
const router = express.Router();
const db = require('../db/connect')

router.get('/:userId', async (req, res) => {
    try {
        var user = await db.User.findOne({ discordId: req.params.userId })
            .populate('repositories')
            .exec()

        res.send(user)
    } catch (err) {
        res.status(400).send({ error: 'We cant find that user}' })
    }
})

module.exports = router;
