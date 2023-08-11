
require('dotenv').config();
const config = require('./config.json')
const crypto = require('crypto');
const cors = require('cors');
const ejsLayouts = require('express-ejs-layouts');
const db = require('./db/connect')
const webhook_helper = require('./functions/discord')

const express = require("express")
const session = require('express-session');
const app = express();


// layouts
app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use(express.json());

// http
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['http://localhost:4001', 'https://github-tracker.rowrisoft.xyz/'],  // or wherever your client is running
  credentials: true,  // this allows cookies to be sent with requests
}));

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
const authGithubRoutes = require("./routes/auth/github")
const authDiscordRoutes = require("./routes/auth/discord")
const authHelperRoutes = require("./routes/auth/helpers")
const eventRoutes = require("./webhook/event")
const indexRoute = require('./routes/index');
const realtimeRoute = require('./routes/realtime');
app.use('/auth', authGithubRoutes)
app.use('/auth', authDiscordRoutes)
app.use('/auth', authHelperRoutes)
app.use('/event', eventRoutes(io))
app.use('/', indexRoute)
app.use('/realtime', realtimeRoute)


//DB
db.connection.on('connected', () => {
  console.log('Confirmed connection from main file.');
});


const streakEnder = require('./functions/streak');



server.listen(config.PORT, async () => {
  console.log(`Server started on port ${config.PORT}`)
  await webhook_helper.sendInfoReport(`<@181435740264202240> - Server has started on port: ${config.PORT}`)
})