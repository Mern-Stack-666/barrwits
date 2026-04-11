'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface CustomCursorProps {
  variant?: 'default' | 'hover' | 'click';
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const isClickingRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const tailGroupRef = useRef<HTMLDivElement>(null);
  const dot1Ref = useRef<HTMLDivElement>(null);
  const dot2Ref = useRef<HTMLDivElement>(null);
  const dot3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device supports hover (not touch device)
    const mediaQuery = window.matchMedia('(hover: hover)');
    if (!mediaQuery.matches) return; // Don't show on touch devices

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      
      // Direct GSAP animation for smooth following (no state updates)
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out',
        });
      }
      
      if (trailRef.current) {
        gsap.to(trailRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      // Tail group follows cursor with offset (always visible below cursor)
      if (tailGroupRef.current) {
        gsap.to(tailGroupRef.current, {
          x: e.clientX,
          y: e.clientY + 35, // 35px below cursor
          duration: 0.2,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseDown = () => {
      isClickingRef.current = true;
      setShowRipple(true);
      
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { 
          scale: 0.8, 
          duration: 0.2, 
          ease: 'power2.out' 
        });
      }
      if (trailRef.current) {
        gsap.to(trailRef.current, { 
          scale: 0.8, 
          opacity: 0.3, 
          duration: 0.2, 
          ease: 'power2.out' 
        });
      }
    };
    
    const handleMouseUp = () => {
      isClickingRef.current = false;
      setShowRipple(false);
      
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { 
          scale: isHoveringRef.current ? 1.5 : 1, 
          duration: 0.3, 
          ease: 'power2.out' 
        });
      }
      if (trailRef.current) {
        gsap.to(trailRef.current, { 
          scale: isHoveringRef.current ? 2 : 1,
          opacity: isHoveringRef.current ? 0.15 : 0.08,
          duration: 0.3, 
          ease: 'power2.out' 
        });
      }
    };

    // Hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-cursor-hover]') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea');

      if (isInteractive) {
        isHoveringRef.current = true;
        if (cursorRef.current) {
          gsap.to(cursorRef.current, { 
            scale: 1.5, 
            duration: 0.3, 
            ease: 'power2.out' 
          });
        }
        if (trailRef.current) {
          gsap.to(trailRef.current, { 
            scale: 2, 
            opacity: 0.15, 
            duration: 0.3, 
            ease: 'power2.out' 
          });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-cursor-hover]') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea');

      if (isInteractive) {
        isHoveringRef.current = false;
        if (cursorRef.current) {
          gsap.to(cursorRef.current, { 
            scale: 1, 
            duration: 0.3, 
            ease: 'power2.out' 
          });
        }
        if (trailRef.current) {
          gsap.to(trailRef.current, { 
            scale: 1, 
            opacity: 0.08, 
            duration: 0.3, 
            ease: 'power2.out' 
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className={`
          relative flex items-center justify-center
          w-12 h-12 md:w-16 md:h-16
        `}>
          {/* Outer Hexagon Border */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 64 64"
            fill="none"
          >
            <polygon
              points="32,4 58,18 58,46 32,60 6,46 6,18"
              stroke="white"
              strokeWidth="2"
              fill="none"
              opacity="0.9"
            />
          </svg>

          {/* Inner Hexagon with B */}
          <div className="absolute inset-1 md:inset-2 flex items-center justify-center">
            <svg
              className="w-full h-full"
              viewBox="0 0 64 64"
              fill="none"
            >
              {/* White Hexagon Background */}
              <polygon
                points="32,4 58,18 58,46 32,60 6,46 6,18"
                fill="white"
                stroke="white"
                strokeWidth="1"
              />
              
              {/* Technical B Letter - Dark color for contrast on white */}
              <g transform="translate(20, 20) scale(1)">
                {/* Main B shape */}
                <path
                  d="M7 4H13C15.2091 4 17 5.79086 17 8C17 9.5 16.2 10.7 15 11.3C16.5 11.8 17.5 13.2 17.5 15C17.5 17.5 15.5 19.5 13 19.5H7V4Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {/* Technical grid lines */}
                <line x1="7" y1="11.5" x2="17" y2="11.5" stroke="black" strokeWidth="0.5" opacity="0.5" />
                <line x1="11" y1="4" x2="11" y2="19.5" stroke="black" strokeWidth="0.5" opacity="0.3" />
                {/* Corner accents */}
                <circle cx="7" cy="4" r="0.5" fill="black" />
                <circle cx="17" cy="8" r="0.5" fill="black" />
                <circle cx="17" cy="15" r="0.5" fill="black" />
                <circle cx="7" cy="19.5" r="0.5" fill="black" />
              </g>
            </svg>
          </div>

          {/* Rotating Hexagon Tech Ring */}
          <div className={`
            absolute inset-0
            ${isHoveringRef.current ? 'animate-spin' : ''}
            transition-all duration-500
          `}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 64 64"
              fill="none"
              className="opacity-50"
            >
              <polygon
                points="32,2 60,17 60,47 32,62 4,47 4,17"
                stroke="white"
                strokeWidth="0.5"
                strokeDasharray="4 6"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Trail Effect - Hexagon Shape */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 64 64"
          className="w-12 h-12 md:w-16 md:h-16"
        >
          <polygon
            points="32,4 58,18 58,46 32,60 6,46 6,18"
            fill="white"
            opacity="0.08"
          />
        </svg>
      </div>

      {/* Single Circle Dot Tail */}
      <div
        ref={tailGroupRef}
        className="fixed top-0 left-0 z-[99996] pointer-events-none mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div
          ref={dot1Ref}
          className="relative"
        >
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white opacity-80" />
        </div>
      </div>

      {/* Click Ripple Effect */}
      {showRipple && (
        <div
          className="fixed z-[99997] pointer-events-none"
          style={{
            left: positionRef.current.x,
            top: positionRef.current.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="animate-ping w-8 h-8 rounded-full bg-white/30" />
        </div>
      )}
    </>
  );
}
