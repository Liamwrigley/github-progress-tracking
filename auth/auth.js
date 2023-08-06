const axios = require('axios');

const express = require('express');
const router = express.Router();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;


router.get('/github', (req, res) => {
    // might need to add %20repo to scopes
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo_hook%20repo`);
})

router.get('/github-oath-callback', async (req, res) => {
    var userToken = "";

    const body = {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: req.query.code
    };

    const options = {headers: {accept: 'application/json'}};

    await axios.post('https://github.com/login/oauth/access_token', body, options)
        .then(res => res.data['access_token'])
        .then(_token => {
            // Use the access token for authentication in future requests
            userToken = _token;
            

            return axios.get('https://api.github.com/user/repos', {headers: {'Authorization': `token ${userToken}`}});
        })
        .then(res2 => {
            var repoList = "";
            const repos = res2.data;
            console.log(repos)
            repos.forEach(repo => {
                repoList += `${repo.name}\n`
                console.log(repo.name)
            });
            res.send(repoList)
        })
        .catch(err => res.status(500).json({ message: err.message }));

    // axios.get('https://api.github.com/user/repos', {
    //     headers: {
    //         'Authorization': `token ${userToken}`
    //     }
    // }).then(res => {
    //     const repos = res.data;
    //     repos.array.forEach(repo => {
    //         console.log(repo.name)
    //     });
    // }).catch(error => {
    //     console.error('Error fetching repos:', error);
    // });
})



module.exports = router;