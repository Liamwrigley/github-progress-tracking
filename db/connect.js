const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.error('Lost MongoDB connection...');
    // You can add logic here to try and reconnect if needed.
});


const userSchema = new mongoose.Schema({
    _id: String, // this is the discordId
    discordUsername: String,
    timezone: String,
    repoName: String,
    githubName: String,
    githubId: String,
    totalPushes: Number,
    currentStreak: Number,
    bestStreak: Number,
    lastPush_UTC: Date,
    endStreakAt_UTC: Date,
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);







module.exports = {
    connection: mongoose.connection,
    User: User
}