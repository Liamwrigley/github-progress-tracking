import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale)

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
    // var timeUtc = dayjs.utc(ts)
    // return dayjs.utc().to(timeUtc)

    var timeUtc = dayjs.utc(ts);
    var now = dayjs.utc();

    // Calculate the difference in hours
    var hoursDiff = timeUtc.diff(now, 'hour');
    var minutesDiff = timeUtc.subtract(hoursDiff, 'hour').diff(now, 'minute');

    return hoursDiff + ' hours ' + minutesDiff + ' minutes';
}