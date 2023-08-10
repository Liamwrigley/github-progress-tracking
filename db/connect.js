const mongoose = require('mongoose');
const moment = require('moment-timezone');


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
    _id: { type: String }, // this is discord id
    discordUsername: { type: String, required: true },
    timezone: { type: String, required: true },
    repoName: { type: String, required: true },
    githubName: { type: String, required: true },
    githubId: { type: String, required: true },
    totalPushes: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },
    lastPush_UTC: { type: Date },
    endStreakAt_UTC: { type: Date },
}, {
    timestamps: true
});


userSchema.methods.UpdateFromPush = (_userTime) => {
    this.totalPushes++;
    this.currentStreak++;
    if (this.currentStreak > this.bestStreak) {
        this.bestStreak = this.currentStreak;
    }

    //handle time conversions
    /*
     - lastPush_UTC is just the timestamp from github converted to UTC
     - endStreakAt_UTC is the github timestamp add 2 days, strip time back to 12:00am and convert to UTC
    */
    this.lastPush_UTC = moment.parseZone(_userTime).utc();
    this.endStreakAt_UTC = moment(_userTime).add(2, 'day').startOf('day').utc();
}


const User = mongoose.model('User', userSchema);




module.exports = {
    connection: mongoose.connection,
    User: User
}