
require('dotenv').config();
const config = require('./config.json')

const express = require("express")
const app = express();
const authRoutes = require("./auth/auth")

//routes
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.send("Hi");
})

app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`)
})