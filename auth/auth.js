const axios = require('axios');
const github = require('../Github/createWebhook')

const express = require('express');
const router = express.Router();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const forceAuth = (req, res, next) => {
    var token = req.session?.token
    console.log("forced Auth:", req.session);

    if (!token) {
        return res.redirect('/auth/github')
    }
    next();
}


router.get('/github', (req, res) => {
    console.log('entry')
    console.log("/github session:", req.session);

    res.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo_hook%20repo`);
})

router.get('/github-oath-callback', async (req, res) => {

    const body = {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: req.query.code
    };
    
    const options = {headers: {accept: 'application/json'}};
    
    axios.post('https://github.com/login/oauth/access_token', body, options)
        .then(res => res.data['access_token'])
        .then(_token => {
        // Use the access token for authentication in future requests
            console.log(_token)
            req.session.token = _token;
            req.session.save(err => {
                if (err) {
                    return res.status(500).json({ message: 'Error saving session' });
                }
                console.log("Session saved:", req.session);
                res.redirect('/auth/github-select-repo');
            });
    })
    .catch(err => {
        if (err.response && err.response.status === 401) {
            console.log('error')
            return res.redirect('/auth/github');
        } else {
            return res.status(500).json({ message: err.message });
        }
    });
})

router.get('/github-select-repo', forceAuth, async (req, res) => {
    var token = req.session.token

    axios.get('https://api.github.com/user/repos?type=owner&sort=created&direction=desc', {headers: {'Authorization': `token ${token}`}})
        .then(resp => {
            var repoList = [];
            const repos = resp.data;
            repos.forEach(repo => {
                repoList.push(repo);
            });
            res.render('repoSelect', {repoList: repoList})
        })
})

router.post('/github-submit-repo', forceAuth, async (req, res) => {
    var token = req.session.token

    const repoData = JSON.parse(req.body.repoData);

    const repoName = repoData.url.replace("https://github.com/","");

    await github.CreateWebook(token, repoName);

    console.log('post webhook create attempt')
    res.redirect('/auth/end-session')
})

router.get('/end-session', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error clearing session');
    }
    res.clearCookie('connect.sid'); 
    res.send('Process completed and session cleared');
  });
});



module.exports = router;