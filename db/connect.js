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
    _id: { type: String },
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

/*
Remember that the pre('save') middleware will only run for document.save().
If you use update methods like Model.updateOne(), Model.findByIdAndUpdate(), etc.,
you might want to consider using pre('update') and pre('findOneAndUpdate') middleware as well.
*/
userSchema.methods.UpdateFromPush = (_userTime) => {
    this.totalPushes++;
    this.currentStreak++;
    if (this.currentStreak > this.bestStreak) {
        this.bestStreak = this.currentStreak;
    }

    //handle time conversions
    /*
    1. add 2 days to userTime and remove time component (day 1 action means they have until 12:00am day 3)
    2. convert into UTC and store as endStreakAt
    */
    let userTime = moment.parseZone(_userTime);
    this.lastPush_UTC = userTime.utc();

    userTime.Add(2, 'day').startOf('day');

    this.endStreakAt_UTC = userTime.utc();


}


userSchema.pre('save', function (next) {
    if (this.isModified('lastPush_UTC')) {
        //convert 
    }
})

const User = mongoose.model('User', userSchema);







module.exports = {
    connection: mongoose.connection,
    User: User
}