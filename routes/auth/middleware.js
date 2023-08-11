
exports.forceAuth = (req, res, next) => {
    var token = req.session?.token;

    if (!token) {
        return res.redirect("/");
    }
    next();
};

exports.endSession = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send("Error clearing session");
        }
        res.clearCookie("connect.sid");
        next()
    });
}