import { useEffect, useState } from 'react';

export const CountDown = ({ end }) => {
  const calculateTimeLeft = () => {
    const difference = end - +new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  // const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, i) => {
    timerComponents.push(
      <div key={i} style={{ display: 'flex', flexDirection: 'column', fontWeight: '600' }}>
        <span>{timeLeft[interval]}</span>
        <span style={{ fontSize: '0.7em', color: '#888888' }}>{interval}</span>
      </div>
    );
  });
  return (
    <div
      style={{ width: '100%', display: 'flex', justifyContent: 'space-around', fontWeight: '600' }}
    >
      {timerComponents.length ? (
        timerComponents
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', fontWeight: '600' }}>
          <span>Time's up!</span>
          <span style={{ fontSize: '0.7em', opacity: '0' }}> 0 </span>
        </div>
      )}
    </div>
  );
};
