const axios = require('axios');
const webhook_helper = require('./discord')
const moment = require('moment-timezone');

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
    console.log('getting data #2')
    var result = await axios.get(repo.events_url, {
        headers: {
            Authorization: `token ${token}`
        }
    });

    var pushEvents = result.data.filter(event => event.type === 'PushEvent' && event.actor.login === repo.owner.login);
    pushEvents.sort((a, b) => new Date(b.date) - new Date(a.Date))

    console.log("pushevents", pushEvents.length)
    let streak = 0;

    // streak logic goes here
    return streak;
}

exports.CalculateCurrentStreak = async (data, token) => {
    const threeDaysAgo = moment().subtract(3, 'd').startOf('day');
    console.log(threeDaysAgo.format())
    data.forEach(r => console.log(moment(r.updated_at).format()));

    const recentRepos = await data.filter(r => moment(r.updated_at) > threeDaysAgo);

    const reposWithStreaks = await Promise.all(
        recentRepos.map(async r => {
            const streak = await getAndCalculateStreak(r, token)
            return {
                ...r,
                streak: streak
            }
        })
    )

    console.log('recentRepos', reposWithStreaks)



    return data;
}