import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(relativeTime);

export const TimeSince = (ts) => {
    var timeUtc = dayjs.utc(ts)
    return timeUtc.from(dayjs.utc())
}

export const TimeUntil = (ts) => {
    var timeUtc = dayjs.utc(ts)
    return timeUtc.to(dayjs.utc())
}