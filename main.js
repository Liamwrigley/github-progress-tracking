
require('dotenv').config();
const config = require('./config.json')
const crypto = require('crypto');


const express = require("express")
const session = require('express-session');
const app = express();
const authRoutes = require("./auth/auth")
const eventRoutes = require("./webhook/event")

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({
  secret: crypto.randomBytes(256).toString('hex'),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 1000,  // 10 minutes
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    sameSite: 'strict'
  }
}))

//routes
app.use('/auth', authRoutes)
app.use('/event', eventRoutes)

app.get('/', (req, res) => {
    res.render('index', {title: "test title", message: "message goes here"})
})

app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`)
})