// components/simulation/CountdownClock.tsx
import React, { useEffect, useState } from 'react';

interface CountdownClockProps {
  minutes: number;
}

const CountdownClock: React.FC<CountdownClockProps> = ({ minutes }) => {
  const totalSeconds = minutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  useEffect(() => {
    if (isNaN(totalSeconds) || totalSeconds <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [totalSeconds]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <span className="px-5 py-2 rounded-xl bg-yellow-200 text-yellow-900 text-3xl font-extrabold tracking-widest shadow-sm border border-yellow-300 uppercase">
      {formatTime(secondsLeft)}
    </span>

  );
};

export default CountdownClock;
