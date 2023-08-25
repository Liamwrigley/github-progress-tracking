const prod = process.env.PRODUCTION == "true"

exports.getBaseUrl = (req) => `${prod ? "https" : "http"}://${req.get("host")}`


exports.getCurrentTimeInZone = (tz) => {
    const date = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    };

    return new Intl.DateTimeFormat('en-AU', { ...options, tz }).format(date);
}