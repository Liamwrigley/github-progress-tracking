const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    // var hostname = req.get("host");
    // console.log("hostname", hostname);
    // let timeInfo = Intl.DateTimeFormat().resolvedOptions();
    // let timeZone = timeInfo.timeZone;
    // console.log(timeZone)
    res.render('index', {title: "Github Progress Tracker", message: "message goes here"})
})

router.get('/ping', (req, res) => {
    res.status(200).send();
})


module.exports = router;
