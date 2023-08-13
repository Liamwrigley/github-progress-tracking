
require('dotenv').config();
const config = require('./config.json')
const crypto = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');
const db = require('./db/connect')
const webhook_helper = require('./functions/discord')
var favicon = require('serve-favicon');


const express = require("express")
const session = require('express-session');
const app = express();


// layouts
app.set('view engine', 'ejs');
app.use(ejsLayouts);


app.use(bodyParser.json({
  verify: function (req, res, buf) {
    req.rawBody = buf.toString();
  }
}));

// http
app.use(express.urlencoded({ extended: true }));
app.use(favicon(__dirname + '/favicon.ico'));

const origins = ['http://localhost:4001/', 'http://localhost:4002/', 'https://github-tracker.rowrisoft.xyz/', 'https://api.github-tracker.rowrisoft.xyz/']
app.use(cors({
  origin: origins,
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  preflightContinue: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));
app.options('*', cors());

app.use(session({
  secret: "secretKey",//crypto.randomBytes(256).toString('hex'),
  // resave: false,
  // saveUninitialized: true,
  // cookie: {
  //   maxAge: 10 * 60 * 1000,  // 10 minutes
  //   secure: process.env.PRODUCTION == "true", // Set to true if using HTTPS
  //   httpOnly: true,
  //   sameSite: 'strict'
  // }
}))

//socket io
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

//routes
app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  res.header("Access-Control-Allow-Origin", origins.join(", "));
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

const authGithubRoutes = require("./routes/auth/github")
const authDiscordRoutes = require("./routes/auth/discord")
const authHelperRoutes = require("./routes/auth/helpers")
const leaderboardRoute = require('./routes/leaderboard');
const eventRoutes = require("./webhook/event")
const indexRoute = require('./routes/index');
const realtimeRoute = require('./routes/realtime');
const deployRoute = require('./deploy');
app.use('/auth', [authGithubRoutes, authDiscordRoutes, authHelperRoutes])
app.use('/event', eventRoutes(io))
app.use('/', [indexRoute, leaderboardRoute])
app.use('/realtime', realtimeRoute)
app.use('/admin', deployRoute)


//DB
db.connection.on('connected', () => {
  console.log('Confirmed connection from main file.');
});

// streak control
const streakEnder = require('./functions/streak');



server.listen(config.PORT, async () => {
  console.log(`Server started on port ${config.PORT}`)
  await webhook_helper.sendInfoReport(`<@181435740264202240> - Server has started (${process.env.PRODUCTION === "true" ? "PROD" : "DEV"}):${config.PORT}`)
})