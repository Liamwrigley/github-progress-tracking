const express = require("express");
const router = express.Router();



router.get("/end-session", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send("Error clearing session");
        }
        res.clearCookie("connect.sid");
        res.send("Process completed and session cleared");
    });
});




module.exports = router;
