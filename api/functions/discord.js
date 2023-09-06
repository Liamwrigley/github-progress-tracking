const {
    WebhookClient,
    EmbedBuilder
} = require('discord.js');

const WEBHOOK_URL = process.env.WEBHOOK_URL
const ERROR_WEBHOOK_URL = process.env.ERROR_WEBHOOK_URL

const createWebhookClient = (URL) => {
    return new WebhookClient({
        url: URL
    })
}

const buildEmbed = (color = 0x00FF22, title = null) => {
    return new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setAuthor({ name: "Gitub Progress Tracker" })
        .setURL("https://reporookie.rowrisoft.xyz")
        .setTimestamp()
}



exports.sendWebhook = async (title, data, webhookUrl = WEBHOOK_URL) => {
    const wh = createWebhookClient(webhookUrl);

    var embed = buildEmbed(color = 0x00FFFF, title = title);
    Object.keys(data).forEach((key, i) => {
        embed.addFields({ name: key, value: data[key] })
    });

    await wh.send({ embeds: [embed] })
}


exports.sendErrorReport = async (message, err) => {
    const wh = createWebhookClient(ERROR_WEBHOOK_URL)
    var embed = buildEmbed();
    embed.setColor(0xFF0000)
    embed.addFields({ name: "Location Info", value: message }, { name: "Error", value: JSON.stringify(err).substring(0, 1000) })
    await wh.send({ embeds: [embed] })
}

exports.sendInfoReport = async (message) => {
    const wh = createWebhookClient(ERROR_WEBHOOK_URL)
    var embed = buildEmbed();
    embed.setColor(0x00FFFF)
    embed.addFields({ name: "Info", value: message })
    await wh.send({ embeds: [embed] })
}

/*
potential events to notify on discord
- passed best streak
- milestones (1 week, 1 month etc)
- streak ended
- passed leaderboard position? (this will involve having leaderboard setup)
- challenge started?



*/