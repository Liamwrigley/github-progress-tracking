

module.exports = (io) => {
    const express = require("express");
    const router = express.Router();
}
router.get('/', (req, res) => {
    // var hostname = req.get("host");
    // console.log("hostname", hostname);
    // let timeInfo = Intl.DateTimeFormat().resolvedOptions();
    // let timeZone = timeInfo.timeZone;
    // console.log(timeZone)
    res.render('realtime', {title: "realtime", message: "message goes here"})
})

// module.exports = router;
