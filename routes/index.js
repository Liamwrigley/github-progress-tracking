const express = require("express");
const moment = require('moment-timezone');

const router = express.Router();


router.get('/', (req, res) => {
    // var hostname = req.get("host");
    // console.log("hostname", hostname);
    // let timeInfo = Intl.DateTimeFormat().resolvedOptions();
    // let timeZone = timeInfo.timeZone;
    // console.log(timeZone)


    let _userTime = "2023-08-11T00:03:45+10:00"
    console.log('original', moment(_userTime).format())
    let userTime = moment.parseZone(_userTime);
    console.log('lastPush_utc', userTime.utc().format())
    // this.lastPush_UTC = userTime.utc();

    userTime.add(2, 'day').startOf('day');
    console.log('add 2 days and set to start of day', userTime.format())
    // this.endStreakAt_UTC = userTime.utc();
    console.log('end streak at utc', userTime.utc().format())
    res.render('index', { title: "Github Progress Tracker", message: "message goes here" })
})

router.get('/ping', (req, res) => {
    res.status(200).send();
})


module.exports = router;
