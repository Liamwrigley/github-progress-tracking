import React, { useEffect, useState } from 'react'
import { TimeDuration } from '../utility/timeHelpers';

export const Countdown = ({ target, countToStreakEnd = false }) => {
    const [time, setTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            var duration = TimeDuration(target)

            const days = duration.days();
            const hours = duration.hours();
            const minutes = duration.minutes();
            const seconds = duration.seconds();

            if (duration.asMilliseconds() <= 0) {
                clearInterval(interval);
            } else {
                setTime({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [target]);

    const getColor = () => {
        if (countToStreakEnd) {

            if (time.days === 0 && time.hours < 1) {
                return "text-red-600"
            }
            if (time.days < 1) {
                return "text-orange-600"
            }
        } else {
            if (time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
                return "text-green-600"
            }
        }
    }

    return (
        <div className={`flex flex-row gap-4 justify-center items-center h-full text-center ${getColor()}`}>
            <TimeUnit value={time.days} label="days" />
            <TimeUnit value={time.hours} label="hours" />
            <TimeUnit value={time.minutes} label="min" />
            <TimeUnit value={time.seconds} label="sec" />
        </div>
    );
}

const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col justify-center items-center text-center">
        <span className="countdown font-mono text-2xl">
            <span style={{ "--value": value }}></span>
        </span>
        {label}
    </div>
);