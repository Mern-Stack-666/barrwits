'use client';

import { useEffect, useState, useRef } from 'react';

export default function CTA() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-black px-6 pb-10"
        >
            <div className="mx-auto max-w-7xl">
                <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent px-8 py-20 text-center backdrop-blur-sm lg:px-16 lg:py-32 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>

                    {/* Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 bg-cyan-400/20 blur-[100px]"></div>

                    <div className="relative z-10">
                        <h2 className="mb-8 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">transform</span> your future?
                        </h2>

                        <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-300">
                            Join the industry leaders who trust Barrwit International to drive their growth and innovation. Let's build something extraordinary together.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                            <a
                                href="mailto:hello@barrwit.com"
                                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 px-10 py-5 text-sm font-bold tracking-widest text-black shadow-lg transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] hover:scale-105"
                            >
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                                <span className="relative z-10 flex items-center gap-2">
                                    START A PROJECT
                                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </a>

                            <a
                                href="#contact"
                                className="group relative overflow-hidden rounded-full border border-white/30 bg-transparent px-10 py-5 text-sm font-bold tracking-widest text-white transition-all duration-500 hover:bg-white/10 hover:border-white/50"
                            >
                                <span className="relative z-10">CONTACT US</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
