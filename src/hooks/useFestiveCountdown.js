import { useState, useEffect } from 'react';

/**
 * Calculates countdown timer for genuine limited-time festive offers.
 */
export const useFestiveCountdown = (targetDateString) => {
  const calculate = () => {
    if (!targetDateString) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const targetTime = new Date(targetDateString).getTime();
    if (isNaN(targetTime)) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const difference = targetTime - Date.now();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds, isExpired: false };
  };

  const [timeLeft, setTimeLeft] = useState(calculate);

  useEffect(() => {
    if (!targetDateString) return;

    const interval = setInterval(() => {
      const updated = calculate();
      setTimeLeft(updated);
      if (updated.isExpired) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateString]);

  return timeLeft;
};
