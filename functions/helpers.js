const prod = process.env.PRODUCTION == "true"

exports.getBaseUrl = (req) => `${prod ? "https" : "http"}://${req.get("host")}`