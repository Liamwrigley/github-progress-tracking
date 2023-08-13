const express = require("express");

const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', { title: "Github Progress Tracker", message: "message goes here" })
})

router.get('/ping', (req, res) => {
    res.status(200).send();
})


module.exports = router;
