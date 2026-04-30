"use client";
import { useEffect, useState } from 'react';

export default function PixelStars() {
  const [stars, setStars] = useState<{ id: number; top: number; left: number; size: number; delay: number; color: string; duration: number }[]>([]);

  useEffect(() => {
    // Generate stars only on the client to avoid hydration mismatch
    const generateStars = () => {
      const newStars = [];
      // Warm yellow/orange, magenta, white, subtle white
      const colors = ['bg-accent', 'bg-primary', 'bg-white', 'bg-white/50']; 
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          size: Math.random() > 0.8 ? 3 : Math.random() > 0.5 ? 2 : 1, // 1px, 2px, or 3px squares
          delay: Math.random() * 5,
          duration: 3 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute ${star.color} animate-pulse`}
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            opacity: Math.random() * 0.5 + 0.3,
          }}
        />
      ))}
      {/* Overlay to fade out stars towards the bottom if needed, or just let them be */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80" />
    </div>
  );
}
