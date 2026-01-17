'use client';

import { useEffect, useState, useRef } from 'react';

const offerings = [
    {
        number: "01",
        title: "Software Development",
        description: "Transform your vision into reality with cutting-edge software solutions. We build scalable, secure, and innovative applications that drive business growth.",
        features: ["Custom Applications", "Cloud Solutions", "API Integration", "Mobile Development"]
    },
    {
        number: "02",
        title: "Investment Management",
        description: "Strategic portfolio management and financial advisory services designed to maximize returns while minimizing risk through data-driven insights.",
        features: ["Portfolio Strategy", "Risk Analysis", "Asset Allocation", "Market Research"]
    },
    {
        number: "03",
        title: "Business Development",
        description: "Accelerate your growth with comprehensive BD strategies. We identify opportunities, forge partnerships, and expand your market presence.",
        features: ["Market Expansion", "Partnership Development", "Revenue Optimization", "Strategic Planning"]
    }
];

export default function WhatWeDo() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
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
            id="what-we-do"
            className="relative min-h-screen w-full bg-black px-6 py-20 "
        >
            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <div className={`mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 backdrop-blur-sm">
                        <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        <span className="text-xs font-medium tracking-widest text-cyan-400">WHAT WE DO</span>
                    </div>
                    <h2 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                        Transforming businesses through{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">innovation</span>
                    </h2>
                    <p className="max-w-3xl text-xl text-gray-400 leading-relaxed">
                        We deliver world-class solutions across three core pillars, each designed to propel your organization into the future.
                    </p>
                </div>

                {/* Offerings Grid */}
                <div className="grid gap-8 lg:gap-12">
                    {offerings.map((offering, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`group relative overflow-hidden rounded-2xl border transition-all duration-700 ${activeIndex === index
                                ? 'border-cyan-400/50 bg-gradient-to-br from-cyan-400/10 via-transparent to-transparent shadow-[0_0_50px_rgba(0,255,255,0.2)]'
                                : 'border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-cyan-400/30'
                                } ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <div className="p-8 lg:p-12">
                                <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">

                                    {/* Left - Number & Title */}
                                    <div>
                                        <div className={`mb-4 text-8xl font-bold transition-all duration-500 ${activeIndex === index
                                            ? 'text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-white'
                                            : 'text-white/10'
                                            }`}>
                                            {offering.number}
                                        </div>
                                        <h3 className="text-3xl font-bold text-white lg:text-4xl">
                                            {offering.title}
                                        </h3>
                                    </div>

                                    {/* Right - Description & Features */}
                                    <div>
                                        <p className="mb-8 text-lg leading-relaxed text-gray-300">
                                            {offering.description}
                                        </p>

                                        {/* Features Grid */}
                                        <div className="grid grid-cols-2 gap-4">
                                            {offering.features.map((feature, fIndex) => (
                                                <div
                                                    key={fIndex}
                                                    className="group/feature flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10"
                                                >
                                                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-400"></div>
                                                    <span className="text-sm font-medium text-gray-300 transition-colors duration-300 group-hover/feature:text-white">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <button className="mt-8 group/btn flex items-center gap-2 text-sm font-semibold tracking-wider text-cyan-400 transition-all duration-300 hover:gap-4">
                                            <span>Learn More</span>
                                            <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                            </div>

                            {/* Animated border glow */}
                            <div className={`absolute inset-0 rounded-2xl transition-opacity duration-700 ${activeIndex === index ? 'opacity-100' : 'opacity-0'
                                }`}>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 via-transparent to-cyan-400/20 blur-xl"></div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
