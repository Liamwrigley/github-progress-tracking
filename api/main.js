
require('dotenv').config();
const config = require('./config.json')
const cors = require('cors');
const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');
const db = require('./db/connect')
const webhook_helper = require('./functions/discord')
var favicon = require('serve-favicon');


const express = require("express")
const cookieParser = require('cookie-parser')
const session = require('express-session');
const app = express();


// layouts
app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use(cookieParser());
app.use(bodyParser.json({
  verify: function (req, res, buf) {
    req.rawBody = buf.toString();
  }
}));

// http
app.use(express.urlencoded({ extended: true }));
app.use(favicon(__dirname + '/favicon.ico'));
app.set('trust proxy', 1);

const IS_PROD = process.env.PRODUCTION === "true"

const allowedOrigins = [
  'http://localhost:4001',
  'http://localhost:4002',
  'https://github-tracker.rowrisoft.xyz',
  'https://api.github-tracker.rowrisoft.xyz'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

app.use(session({
  secret: "secretKey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000,  // 1 hour
    secure: IS_PROD,
    httpOnly: true,
    sameSite: 'lax',
    domain: IS_PROD ? '.rowrisoft.xyz' : 'localhost',
    path: '/'
  }
}))

//socket io
const socketIo = require('socket.io')
let server;
if (IS_PROD) {
  console.log('starting as https')
  const fs = require('fs')
  const http = require('https');

  // SSL/TLS options
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/github-tracker.rowrisoft.xyz/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/github-tracker.rowrisoft.xyz/fullchain.pem')
  };
  server = http.createServer(options, app);
} else {
  console.log('starting as http')
  const http = require('http');
  server = http.createServer(app);
}
const io = socketIo(server, {
  cors: {
    origin: IS_PROD ? "https://github-tracker.rowrisoft.xyz" : "http://localhost:4002",
    // methods: ["GET", "POST"],
    credentials: true
  }
});;

//routes
app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
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

app.use('/auth_old', [authGithubRoutes, authDiscordRoutes, authHelperRoutes])
app.use('/event', eventRoutes(io))
app.use('/', [indexRoute, leaderboardRoute])
app.use('/realtime', realtimeRoute)
app.use('/admin', deployRoute)

const auth2 = require('./routes/new_auth/auth')
app.use('/auth', auth2)


//DB
db.connection.on('connected', () => {
  console.log('Confirmed connection from main file.');
});

// streak control
const streakEnder = require('./functions/streak');



server.listen(config.PORT, async () => {
  console.log(`Server started on port ${config.PORT}`)
  await webhook_helper.sendInfoReport(`<@181435740264202240> - Server has started (${IS_PROD ? "PROD" : "DEV"}):${config.PORT}`)
})