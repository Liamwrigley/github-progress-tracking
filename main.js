
require('dotenv').config();
const config = require('./config.json')
const crypto = require('crypto');
const cors = require('cors');



const express = require("express")
const session = require('express-session');
const app = express();
const authGithubRoutes = require("./auth/github")
const authDiscordRoutes = require("./auth/discord")
const authHelperRoutes = require("./auth/helpers")
const eventRoutes = require("./webhook/event")

app.use(cors({
  origin: ['http://localhost:4001', 'https://github-tracker.rowrisoft.xyz/'],  // or wherever your client is running
  credentials: true,  // this allows cookies to be sent with requests
}));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// app.use(session({secret: 'testing'}))
app.use(session({
  secret: "secretKey",//crypto.randomBytes(256).toString('hex'),
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 10 * 60 * 1000,  // 10 minutes
//     secure: process.env.PRODUCTION == "true", // Set to true if using HTTPS
//     httpOnly: true,
//     sameSite: 'strict'
//   }
}))

//routes
app.use('/auth', authGithubRoutes)
app.use('/auth', authDiscordRoutes)
app.use('/auth', authHelperRoutes)
app.use('/event', eventRoutes)

app.get('/', (req, res) => {
    var hostname = req.get("host");
    console.log("hostname", hostname);
    let timeInfo = Intl.DateTimeFormat().resolvedOptions();
    let timeZone = timeInfo.timeZone;
    console.log(timeZone)
    res.render('index', {title: "test title", message: "message goes here"})
})

app.get('/ping', (req, res) => {
    res.status(200).send();
})

app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`)
})