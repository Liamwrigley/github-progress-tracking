import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale)
dayjs.extend(duration)

// dayjs.updateLocale('en', {
//     relativeTime: {
//         future: "in %s",
//         past: "%s ago",
//         s: 'a few seconds',
//         m: "a minute",
//         mm: "%d minutes",
//         h: "an hour",
//         hh: "%d hours",
//         d: "%d hours",
//         dd: "%d days",
//         M: "a month",
//         MM: "%d months",
//         y: "a year",
//         yy: "%d years"
//     }
// })


export const TimeSince = (ts) => {
    var timeUtc = dayjs.utc(ts)
    return timeUtc.from(dayjs.utc())
}

export const TimeUntil = (ts) => {
    var timeUtc = dayjs.utc(ts);
    var now = dayjs.utc();

    // Calculate the difference in hours
    var hoursDiff = timeUtc.diff(now, 'hour');
    var minutesDiff = timeUtc.subtract(hoursDiff, 'hour').diff(now, 'minute');
    if (hoursDiff > 1) {
        return `in ${hoursDiff} hours`
    } else if (hoursDiff > 0) {
        return `in ${minutesDiff} minutes!`
    } else {
        return `00:00:00`
    }
}

export const TimeDuration = (ts) => {
    const now = dayjs.utc();
    const target = dayjs.utc(ts);
    const duration = dayjs.duration(target.diff(now));

    return duration;
}