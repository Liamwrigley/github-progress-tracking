import React, { useEffect, useState } from 'react'
import { TimeDuration } from '../utility/timeHelpers';

export const Countdown = ({ title, icon, target }) => {
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

    return (
        <div className='min-h-[80px] flex flex-col gap-4 bg-black shadow-sm bg-opacity-20 duration-100 w-full p-4 relative hover:scale-105 hover:shadow-lg'>
            {title && <p className=' absolute left-2 top-1 text-xs tracking-widest uppercase'><i className={icon}></i> {title}</p>}
            <div className="flex flex-row gap-4 justify-center items-center h-full text-center">
                <TimeUnit value={time.days} label="days" />
                <TimeUnit value={time.hours} label="hours" />
                <TimeUnit value={time.minutes} label="min" />
                <TimeUnit value={time.seconds} label="sec" />
            </div>
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