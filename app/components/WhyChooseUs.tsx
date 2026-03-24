'use client';

import { useEffect, useState, useRef } from 'react';
import { HiCheckCircle, HiLightningBolt, HiUserGroup, HiGlobeAlt, HiLightBulb, HiClock } from 'react-icons/hi';

const reasons = [
    {
        icon: HiCheckCircle,
        title: "Proven Track Record",
        description: "15+ years of delivering exceptional results across 200+ global clients with a 98% success rate."
    },
    {
        icon: HiLightningBolt,
        title: "Innovation First",
        description: "We leverage cutting-edge technology and methodologies to keep you ahead of the competition."
    },
    {
        icon: HiUserGroup,
        title: "Partnership Approach",
        description: "We don't just provide services—we become your strategic partner in growth and success."
    },
    {
        icon: HiGlobeAlt,
        title: "Global Expertise",
        description: "International presence with deep local market knowledge across multiple industries and regions."
    },
    {
        icon: HiLightBulb,
        title: "Tailored Solutions",
        description: "Every solution is customized to your unique challenges, goals, and business context."
    },
    {
        icon: HiClock,
        title: "Rapid Execution",
        description: "Agile methodologies and experienced teams ensure fast time-to-value without compromising quality."
    }
];

export default function WhyChooseUs() {
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
            id="why-choose-us"
            className="relative min-h-screen w-full bg-linear-to-b from-black via-zinc-950 to-black px-4 sm:px-6 py-8 md:py-12"
        >
            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <div className={`mb-10 md:mb-20 text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-4 py-2 backdrop-blur-sm">
                        <div className="h-2 w-2 rounded-full bg-[#C0C0C0] animate-pulse"></div>
                        <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">WHY CHOOSE US</span>
                    </div>
                    <h2 className="mb-4 md:mb-6 text-3xl sm:text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">Barrwit</span> difference
                    </h2>
                    <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed">
                        We combine deep expertise, innovative thinking, and unwavering commitment to deliver results that exceed expectations.
                    </p>
                </div>

                {/* Reasons Grid */}
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {reasons.map((reason, index) => {
                        const IconComponent = reason.icon;
                        return (
                            <div
                                key={index}
                                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5 sm:p-6 md:p-8 backdrop-blur-sm transition-all duration-500 hover:border-[#C0C0C0]/30 hover:bg-[#C0C0C0]/5 md:hover:scale-105 hover:shadow-[0_0_40px_rgba(192,192,192,0.15)] ${isVisible ? 'animate-scale-in' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#C0C0C0]/0 to-[#C0C0C0]/0 opacity-0 transition-opacity duration-500 group-hover:from-[#C0C0C0]/10 group-hover:to-transparent group-hover:opacity-100"></div>

                                {/* Icon */}
                                <div className="relative mb-6">
                                    <IconComponent className="text-4xl sm:text-5xl md:text-6xl text-[#C0C0C0] transition-transform duration-500 group-hover:scale-110" />
                                </div>

                                {/* Content */}
                                <div className="relative">
                                    <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[#C0C0C0]">
                                        {reason.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
                                        {reason.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
