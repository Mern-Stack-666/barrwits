'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const clearProps = 'transform,opacity,visibility';

function createScrollReveal(
  element: HTMLElement,
  fromVars: gsap.TweenVars,
  trigger?: Element | string
) {
  gsap.from(element, {
    autoAlpha: 0,
    duration: 0.85,
    ease: 'power3.out',
    clearProps,
    ...fromVars,
    scrollTrigger: {
      trigger: trigger ?? element,
      start: 'top 82%',
      once: true,
    },
  });
}

export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith('/admin')) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const nav = document.querySelector<HTMLElement>('[data-gsap="nav"]');
      if (nav) {
        gsap.from(nav, {
          autoAlpha: 0,
          y: -28,
          duration: 0.7,
          ease: 'power3.out',
          clearProps,
        });
      }

      const heroBlocks = gsap.utils.toArray<HTMLElement>('[data-gsap="hero"]');
      heroBlocks.forEach((hero) => {
        const items = hero.querySelectorAll<HTMLElement>('[data-gsap-item]');
        if (!items.length) {
          return;
        }

        gsap.from(items, {
          autoAlpha: 0,
          y: 26,
          duration: 0.82,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps,
        });
      });

      const revealMap: Record<string, gsap.TweenVars> = {
        heading: { y: 42 },
        copy: { y: 28 },
        visual: { y: 24, x: 18, scale: 0.985, duration: 0.95 },
        cta: { y: 22, scale: 0.98 },
        footer: { y: 34 },
        'fade-up': { y: 26 },
      };

      Object.entries(revealMap).forEach(([selector, vars]) => {
        const elements = gsap.utils.toArray<HTMLElement>(`[data-gsap="${selector}"]`);
        elements.forEach((element) => createScrollReveal(element, vars));
      });

      const grids = gsap.utils.toArray<HTMLElement>('[data-gsap="grid"]');
      grids.forEach((grid) => {
        const items = grid.querySelectorAll<HTMLElement>('[data-gsap-item]');
        if (!items.length) {
          return;
        }

        gsap.from(items, {
          autoAlpha: 0,
          y: 36,
          scale: 0.985,
          duration: 0.82,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps,
          scrollTrigger: {
            trigger: grid,
            start: 'top 82%',
            once: true,
          },
        });
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, document.body);

    return () => {
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
