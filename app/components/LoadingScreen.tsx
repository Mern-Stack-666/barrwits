'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export default function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) {
      // Animate out
      const ctx = gsap.context(() => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            onComplete?.();
          },
        });
      });

      return () => ctx.revert();
    }

    // Animate in
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Fade in container
      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );

      // Animate progress bar
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { width: '0%' },
          {
            width: '100%',
            duration: 2,
            ease: 'power2.inOut',
          }
        );
      }

      // Pulse text
      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 0.5,
          duration: 0.8,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      }
    });

    return () => {
      ctx.revert();
      gsap.killTweensOf(textRef.current);
    };
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      <div className="text-center">
        {/* Logo or Brand */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            BARRWIT
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-6">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
            style={{ width: '0%' }}
          />
        </div>

        {/* Loading Text */}
        <div
          ref={textRef}
          className="text-gray-400 text-sm tracking-widest"
        >
          LOADING EXPERIENCE...
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-cyan-400"
              style={{
                animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 80%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          40% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
