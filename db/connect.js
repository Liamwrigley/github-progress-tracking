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
    totalPushes: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },
    hasCurrentStreak: { type: Boolean, default: false },
    lastPush_UTC: { type: Date },
    endStreakAt_UTC: { type: Date },
    nextStreakAt_UTC: { type: Date },
}, {
    timestamps: true
});
const User = mongoose.model('User', userSchema);


userSchema.methods.UpdateFromPush = function (_userTime) {
    this.totalPushes++;
    this.hasCurrentStreak = true;
    this.lastPush_UTC = moment.parseZone(_userTime).utc();

    if (this.lastPush_UTC >= this.nextStreakAt_UTC) {

        this.currentStreak++;
        if (this.currentStreak > this.bestStreak) {
            this.bestStreak = this.currentStreak;
        }

        //handle time conversions
        /*
        - lastPush_UTC is just the timestamp from github converted to UTC
        - nextStreakAt_UTC is the github timestamp add 1 day, strip time back to 12:00am and convert to UTC
        - endStreakAt_UTC is the github timestamp add 2 days, strip time back to 12:00am and convert to UTC
        */
        this.nextStreakAt_UTC = moment(_userTime).add(1, 'day').startOf('day').utc();
        this.endStreakAt_UTC = moment(_userTime).add(2, 'day').startOf('day').utc();
    }
}



const DoesUserExist = async (_discordId) => {
    var user = await User.exists({ _id: _discordId })
    return user != null
}


module.exports = {
    connection: mongoose.connection,
    User: User,
    DoesUserExist: DoesUserExist,
}