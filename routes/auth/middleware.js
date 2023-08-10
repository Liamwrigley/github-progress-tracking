
exports.forceAuth = (req, res, next) => {
    var token = req.session?.token;
    console.log("forced Auth:", req.session);

    if (!token) {
        return res.redirect("/");
    }
    next();
};





// exports.forceAuth = (req, res, next) => {
//     var githubToken = req.session?.github_token;
//     var discordToken = req.session?.discord_token;
//     console.log("forced Auth:", req.session);

//     if (!githubToken || !discordToken) {
//         return res.redirect("/");
//     }
//     next();
// };