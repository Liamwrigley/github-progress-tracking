const crypto = require('crypto');

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

exports.verifyGitHubPayload = (req, res, next) => {
    const payload = req.rawBody;
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