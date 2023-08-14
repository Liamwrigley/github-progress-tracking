import React from "react";
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(relativeTime);

export const TimeUntilOrSince = (ts, since = true) => {
    var timeUtc = dayjs.utc(ts)
    if (since) {
        return timeUtc.from(dayjs.utc())
    } else {
        return timeUtc.to(dayjs.utc())
    }
}