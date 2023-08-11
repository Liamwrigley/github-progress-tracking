const axios = require('axios');
const webhook_helper = require('./discord')

exports.CreateWebook = async (token, hostUrl, repo, discordId) => {
    const webhookConfig = {
        name: 'web',
        active: true,
        config: {
            url: `${hostUrl}/event/push/${discordId}`,
            content_type: 'json',
            secret: 'YOUR_SECRET', // Optional
            events: ['push'], // Customize as needed
        }
    }

    const headers = {
        headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
        }
    }

    var result;

    try {
        result = await axios.post(`https://api.github.com/repos/${repo}/hooks`, webhookConfig, headers);
        console.log('created github webhook', result.data)
        return result.data
    }
    catch (err) {
        await webhook_helper.sendErrorReport("creating webhook", err)
        console.error("we had an error\n", err)
    }
    return result
}

const getAndCalculateStreak = async (repo, token) => {
    var result = await axios.get(repo.events_url, {
        headers: {
            Authorization: `token ${token}`
        }
    });

    var pushEvents = result.data.filter(event => event.type === 'PushEvent' && event.actor.login === repo.owner.login);
    pushEvents.sort((a, b) => new Date(b.date) - new Date(a.Date))

    console.log("pushevents", pushEvents.length)
    let streak = 0;

    return streak;
}

exports.CalculateCurrentStreak = async (data, token) => {
    let streak = 0;

    const threeDaysAgo = new Date(Date.now() - (3 * 24 * 60 * 60 * 1000));

    const recentRepos = data.filter(r => new Date(r.updated_at) > threeDaysAgo)
        .map(async r => {
            const streak = getAndCalculateStreak(repo, token)
            return {
                ...r,
                streak: streak
            }
        });

    var outcome = await Promise.all(recentRepos)

    console.log('recentRepos', outcome)



    return data;
}