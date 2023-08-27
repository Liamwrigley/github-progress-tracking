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


//#region Events
const eventSchema = new mongoose.Schema({
    ts: { type: Date, required: true, default: () => moment().utc() },
    user: {
        type: String,
        ref: 'User',
        required: true
    },
    currentPushes: { type: Number, required: true },
    currentStreak: { type: Number, required: true },
    repositoryName: { type: String, required: true },
    commitMessage: { type: String }
}, {
    timestamps: true
});
eventSchema.index({ ts: -1 })

const Event = mongoose.model('Event', eventSchema);

//#endregion

//#region User

const userSchema = new mongoose.Schema({
    _id: { type: String }, // this is discord id
    discordId: { type: String, required: true },
    discordUsername: { type: String, required: true },
    discordAvatar: { type: String, required: true },
    timezone: { type: String },
    repoName: { type: String },
    githubUsername: { type: String },
    githubId: { type: String },
    githubAvatar: { type: String },
    webhookId: { type: String },
    totalPushes: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },
    hasCurrentStreak: { type: Boolean, default: false },
    setupComplete: { type: Boolean, default: false },
    lastPush_UTC: { type: Date },
    endStreakAt_UTC: { type: Date },
    nextStreakAt_UTC: { type: Date, default: () => moment().utc() },
}, {
    timestamps: true
});
userSchema.index({ githubId: 1 });
userSchema.index({ endStreakAt_UTC: 1, hasCurrentStreak: 1 });
userSchema.index({ currentStreak: -1 });


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

        // Parse the _userTime with its timezone
        const userTimeWithZone = moment.parseZone(_userTime);
        console.log("Parsed _userTime with timezone:", userTimeWithZone.format());

        // Calculate next streak and end streak in the user's timezone, then set to midnight
        const nextStreakUserZone = userTimeWithZone.clone().add(1, 'day').startOf('day');
        const endStreakUserZone = userTimeWithZone.clone().add(2, 'day').startOf('day');
        console.log("Next streak in user's timezone:", nextStreakUserZone.format());
        console.log("End streak in user's timezone:", endStreakUserZone.format());

        // Convert the times to UTC
        this.nextStreakAt_UTC = nextStreakUserZone.toISOString();
        this.endStreakAt_UTC = endStreakUserZone.toISOString();
        console.log("Next streak in UTC:", this.nextStreakAt_UTC);
        console.log("End streak in UTC:", this.endStreakAt_UTC);
    }
}



const User = mongoose.model('User', userSchema);
User.syncIndexes()
    .then(() => {
        console.log('Indexes synced');
    })
    .catch((error) => {
        console.error('Error syncing indexes:', error);
    });

const DoesUserExist = async (_discordId) => {
    var user = await User.exists({ _id: _discordId })
    return user != null
}

//#endregion

module.exports = {
    connection: mongoose.connection,
    User: User,
    Event: Event,
    DoesUserExist: DoesUserExist,
}