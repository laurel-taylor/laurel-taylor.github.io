import { useEffect, useState } from 'react';
import './Countdown.css';

function remainingMs(expiresAt, now) {
  if (!expiresAt) return 0;
  return Math.max(0, expiresAt - now);
}

function formatTime(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export default function Countdown({ expiresAt, active }) {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    if (!active || !expiresAt) return undefined;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [active, expiresAt]);

  const ms = active ? remainingMs(expiresAt, now) : 0;
  const urgent = active && ms > 0 && ms <= 10_000;

  return (
    <p
      className={`countdown${urgent ? ' countdown-urgent' : ''}`}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="countdown-label">Time</span>
      <span className="countdown-value">{formatTime(ms)}</span>
    </p>
  );
}
