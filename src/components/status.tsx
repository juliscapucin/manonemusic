'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type StatusProps = {
    location: string;
};

type Day = {
    dayOfWeek: string;
    dayOfMonth: string;
    month: string;
};

const timezone = { timeZone: 'Europe/London' };

function Status({ location }: StatusProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [time, setTime] = useState<string | null>(null);
    const [day, setDay] = useState<Day | null>(null);
    const statusWrapperRef = useRef<HTMLDivElement>(null);

    // 1s interval to update the time
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // Update every second

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    // Animate the lines
    useGSAP(() => {
        if (!statusWrapperRef.current) return;

        gsap.fromTo(
            '.gsap-line',
            {
                xPercent: -100,
            },
            {
                xPercent: 0,
                duration: 0.3,
                ease: 'expo4.inOut',
                stagger: 0.25,
            }
        );
    }, [statusWrapperRef.current]);

    useEffect(() => {
        const date = {
            dayOfWeek: currentDate.toLocaleDateString('en-GB', {
                weekday: 'long',
                ...timezone,
            }),
            dayOfMonth: currentDate.toLocaleDateString('en-GB', {
                day: 'numeric',
                ...timezone,
            }),
            month: currentDate.toLocaleDateString('en-GB', {
                month: 'long',
                ...timezone,
            }),
        };

        setDay(date);

        setTime(
            currentDate.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: timezone.timeZone,
            })
        );
    }, [currentDate]);

    return (
        <div
            ref={statusWrapperRef}
            className={`absolute right-0 flex w-1/2 flex-col overflow-clip uppercase *:text-body-medium lg:*:text-body-large`}
        >
            <h2 className='gsap-line'>{location}</h2>
            <span className='gsap-line'>
                {day?.dayOfWeek} | {day?.dayOfMonth} {day?.month}
            </span>
            <span className='gsap-line block'>{time}</span>
        </div>
    );
}

export default Status;
