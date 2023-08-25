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
    var timeUtc = dayjs.utc(ts)

    console.log('incoming ts', ts)
    console.log('dayjs utc', dayjs().utc().format())
    console.log('time until ts: ', dayjs.utc().to(timeUtc))

    return dayjs.utc().to(timeUtc)
}