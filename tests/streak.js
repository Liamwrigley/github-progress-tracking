const { expect } = require('chai');
const sinon = require('sinon');
const { User } = require('../db/connect');
const moment = require('moment-timezone');



describe('UpdateFromPush', () => {
    describe('should correctly update streak and timestamps', () => {

        it('begin streak', () => {
            // Create a new user instance
            const testTime = moment("2023-08-11T02:45:10+10:00");  // This will represent the mock time of the push event

            const user = new User({
                _id: 'testId',
                discordUsername: 'testName',
                discordAvatar: 'testAvatar',
                timezone: 'UTC',
                repoName: 'testRepo',
                githubName: 'testGithub',
                nextStreakAt_UTC: moment(testTime).subtract(1, 'hours').utc().toDate() // setting this to ensure the logic inside the method triggers
            });

            expect(user.totalPushes).to.equal(0);
            expect(user.currentStreak).to.equal(0);
            expect(user.bestStreak).to.equal(0);
            expect(user.hasCurrentStreak).to.be.false;

            user.UpdateFromPush(testTime);

            expect(user.totalPushes).to.equal(1);
            expect(user.currentStreak).to.equal(1);
            expect(user.bestStreak).to.equal(1);
            expect(user.hasCurrentStreak).to.be.true;
            expect(user.lastPush_UTC.toISOString()).to.equal(moment.utc(testTime).toISOString());
            expect(user.nextStreakAt_UTC.toISOString()).to.equal(moment(testTime).add(1, 'day').startOf('day').utc().toISOString());
            expect(user.endStreakAt_UTC.toISOString()).to.equal(moment(testTime).add(2, 'day').startOf('day').utc().toISOString());
        });

        it('update streak', () => {
            // Create a new user instance
            const testTime = moment("2023-08-11T02:45:10+10:00");  // This will represent the mock time of the push event

            const user = new User({
                _id: 'testId',
                discordUsername: 'testName',
                discordAvatar: 'testAvatar',
                timezone: 'UTC',
                repoName: 'testRepo',
                githubName: 'testGithub',
                totalPushes: 1,
                currentStreak: 1,
                bestStreak: 1,
                hasCurrentStreak: true,
                nextStreakAt_UTC: moment(testTime).subtract(1, 'hours').utc().toDate() // setting this to ensure the logic inside the method triggers
            });

            expect(user.totalPushes).to.equal(1);
            expect(user.currentStreak).to.equal(1);
            expect(user.bestStreak).to.equal(1);
            expect(user.hasCurrentStreak).to.be.true;


            user.UpdateFromPush(testTime);

            expect(user.totalPushes).to.equal(2);
            expect(user.currentStreak).to.equal(2);
            expect(user.bestStreak).to.equal(2);
            expect(user.hasCurrentStreak).to.be.true;
            expect(user.lastPush_UTC.toISOString()).to.equal(moment.utc(testTime).toISOString());
            expect(user.nextStreakAt_UTC.toISOString()).to.equal(moment(testTime).add(1, 'day').startOf('day').utc().toISOString());
            expect(user.endStreakAt_UTC.toISOString()).to.equal(moment(testTime).add(2, 'day').startOf('day').utc().toISOString());
        });

        it('early push does not update streak', () => {
            // Create a new user instance
            const testTime = moment("2023-08-11T02:45:10+10:00");  // This will represent the mock time of the push event
            const user = new User({
                _id: 'testId',
                discordUsername: 'testName',
                discordAvatar: 'testAvatar',
                timezone: 'UTC',
                repoName: 'testRepo',
                githubName: 'testGithub',
                totalPushes: 1,
                currentStreak: 1,
                bestStreak: 1,
                hasCurrentStreak: true,
                nextStreakAt_UTC: moment(testTime).add(1, 'day').startOf('day').utc(),
                endStreakAt_UTC: moment(testTime).add(2, 'day').startOf('day').utc()
            });

            expect(user.totalPushes).to.equal(1);
            expect(user.currentStreak).to.equal(1);
            expect(user.bestStreak).to.equal(1);
            expect(user.hasCurrentStreak).to.be.true;


            user.UpdateFromPush(testTime);

            expect(user.totalPushes).to.equal(2);
            expect(user.currentStreak).to.equal(1);
            expect(user.bestStreak).to.equal(1);
            expect(user.hasCurrentStreak).to.be.true;
            expect(user.lastPush_UTC.toISOString()).to.equal(moment.utc(testTime).toISOString());
            expect(user.nextStreakAt_UTC.toISOString()).to.equal(moment(testTime).add(1, 'day').startOf('day').utc().toISOString());
            expect(user.endStreakAt_UTC.toISOString()).to.equal(moment(testTime).add(2, 'day').startOf('day').utc().toISOString());
        });

        it('streak update does not update best streak', () => {
            // Create a new user instance
            const testTime = moment("2023-08-11T02:45:10+10:00");  // This will represent the mock time of the push event

            const user = new User({
                _id: 'testId',
                discordUsername: 'testName',
                discordAvatar: 'testAvatar',
                timezone: 'UTC',
                repoName: 'testRepo',
                githubName: 'testGithub',
                totalPushes: 1,
                currentStreak: 1,
                bestStreak: 10,
                hasCurrentStreak: true,
                nextStreakAt_UTC: moment(testTime).subtract(1, 'hours').utc().toDate() // setting this to ensure the logic inside the method triggers
            });

            expect(user.totalPushes).to.equal(1);
            expect(user.currentStreak).to.equal(1);
            expect(user.bestStreak).to.equal(10);
            expect(user.hasCurrentStreak).to.be.true;


            user.UpdateFromPush(testTime);

            expect(user.totalPushes).to.equal(2);
            expect(user.currentStreak).to.equal(2);
            expect(user.bestStreak).to.equal(10);
            expect(user.hasCurrentStreak).to.be.true;
            expect(user.lastPush_UTC.toISOString()).to.equal(moment.utc(testTime).toISOString());
            expect(user.nextStreakAt_UTC.toISOString()).to.equal(moment(testTime).add(1, 'day').startOf('day').utc().toISOString());
            expect(user.endStreakAt_UTC.toISOString()).to.equal(moment(testTime).add(2, 'day').startOf('day').utc().toISOString());
        });
    });
});