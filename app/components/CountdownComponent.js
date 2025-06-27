'use client';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useState } from 'react';


export default function CountdownComponent({ key, isPlaying, time, onComplete, label = 'Countdown' }) {
return (
    <div className="flex flex-col items-center ">
      <div className="text-lg font-semibold mb-2">{label}</div>
      <CountdownCircleTimer
        key={key} // Ensure a new timer is created on each render
        isPlaying={isPlaying}
        duration={time}
        colors="#EF4444" // Tailwind red-500
        size={40}
        strokeWidth={2}
        onComplete={() => {
          if (onComplete) {onComplete()
          
          return { shouldRepeat: false }}; // Don't loop
        }}
      >
        {({ remainingTime }) => (
          <div className="">
            {remainingTime} s
          </div>
        )}
      </CountdownCircleTimer>
    </div>
  );
}
