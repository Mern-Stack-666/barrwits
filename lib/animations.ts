'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseGSAPAnimationOptions {
  trigger?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  duration?: number;
  delay?: number;
  ease?: string | gsap.EaseFunction;
  scrollTrigger?: boolean;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

export function useGSAPAnimation(
  targetRef: React.RefObject<HTMLElement>,
  options: UseGSAPAnimationOptions = {}
) {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    ctx.current = gsap.context(() => {
      const {
        from,
        to,
        duration = 1,
        delay = 0,
        ease = 'power2.out',
        scrollTrigger = false,
        start = 'top 80%',
        end = 'bottom 20%',
        scrub = false,
      } = options;

      let tween;

      if (from) {
        tween = gsap.from(targetRef.current, {
          ...from,
          duration,
          delay,
          ease,
        });
      } else if (to) {
        tween = gsap.to(targetRef.current, {
          ...to,
          duration,
          delay,
          ease,
        });
      }

      // Add ScrollTrigger if enabled
      if (scrollTrigger && tween) {
        ScrollTrigger.create({
          trigger: targetRef.current,
          start,
          end,
          scrub,
          animation: tween,
        });
      }
    });

    return () => {
      ctx.current?.revert();
    };
  }, [targetRef, options]);

  return ctx;
}

export function useStaggerAnimation(
  parentRef: React.RefObject<HTMLElement>,
  childSelector: string = '> *',
  options: gsap.TweenVars = {}
) {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (!parentRef.current) return;

    ctx.current = gsap.context(() => {
      const children = parentRef.current?.querySelectorAll(childSelector);
      if (!children || children.length === 0) return;

      gsap.from(children, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        ...options,
      });
    });

    return () => {
      ctx.current?.revert();
    };
  }, [parentRef, childSelector, options]);

  return ctx;
}

export function useTextRevealAnimation(
  targetRef: React.RefObject<HTMLElement>,
  options: gsap.TweenVars = {}
) {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    ctx.current = gsap.context(() => {
      const text = targetRef.current;
      
      gsap.from(text, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        ...options,
      });
    });

    return () => {
      ctx.current?.revert();
    };
  }, [targetRef, options]);

  return ctx;
}
