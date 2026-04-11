'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface GSAPShowcaseProps {
  cards?: AnimatedCard[];
}

export default function GSAPShowcase({ cards = [] }: GSAPShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      // Animate cards with stagger
      if (cardsRef.current) {
        const cardElements = cardsRef.current.querySelectorAll('.card');
        gsap.from(cardElements, {
          opacity: 0,
          y: 100,
          rotationX: -15,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Parallax effect on scroll
      gsap.to('.parallax-bg', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const defaultCards: AnimatedCard[] = [
    {
      title: 'Smooth Animations',
      description: 'GSAP provides buttery smooth animations with precise control over timing and easing.',
      icon: '🎬',
    },
    {
      title: 'Scroll Triggers',
      description: 'Create stunning scroll-based animations that respond to user interaction.',
      icon: '📜',
    },
    {
      title: 'Timeline Control',
      description: 'Sequence complex animations with GSAP\'s powerful timeline feature.',
      icon: '⏱️',
    },
  ];

  const displayCards = cards.length > 0 ? cards : defaultCards;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-black py-20 px-4"
    >
      {/* Parallax Background */}
      <div className="parallax-bg absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-purple-900/20" />
        <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="mb-16 text-center text-4xl font-bold text-white md:text-6xl"
        >
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            GSAP Animations
          </span>
        </h2>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {displayCards.map((card, index) => (
            <div
              key={index}
              className="card group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="mb-6 text-5xl">{card.icon}</div>

              {/* Title */}
              <h3 className="mb-4 text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed">
                {card.description}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
            </div>
          ))}
        </div>

        {/* Interactive Button */}
        <div className="mt-16 text-center">
          <button
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] hover:scale-105"
            onClick={() => {
              // Example GSAP animation on click
              gsap.to('.card', {
                rotation: 360,
                duration: 1,
                stagger: 0.1,
                ease: 'back.out(1.7)',
              });
            }}
          >
            <span className="relative z-10">Animate Cards</span>
          </button>
        </div>
      </div>
    </section>
  );
}
