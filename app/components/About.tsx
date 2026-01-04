'use client';

import { useEffect, useState, useRef } from 'react';
import { HiTrendingUp, HiUserGroup, HiCurrencyDollar, HiStar } from 'react-icons/hi';

const stats = [
    {
        icon: HiTrendingUp,
        value: "15+",
        label: "Years of Excellence",
        description: "Industry leadership"
    },
    {
        icon: HiUserGroup,
        value: "200+",
        label: "Global Clients",
        description: "Worldwide reach"
    },
    {
        icon: HiCurrencyDollar,
        value: "$2B+",
        label: "Assets Managed",
        description: "Financial expertise"
    },
    {
        icon: HiStar,
        value: "98%",
        label: "Client Satisfaction",
        description: "Proven results"
    }
];

export default function About() {
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
            id="about"
            className="relative w-full bg-black px-6 pb-20"
        >
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className={`mb-20 text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 backdrop-blur-sm">
                        <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        <span className="text-xs font-medium tracking-widest text-cyan-400">ABOUT BARRWIT</span>
                    </div>
                    <h2 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                        Pioneering the future of{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">business excellence</span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-xl text-gray-400 leading-relaxed">
                        Barrwit International stands at the intersection of innovation and expertise. We don't just provide services—we forge partnerships that transform visions into reality.
                    </p>
                </div>

                {/* Content Grid */}
                <div className={`mb-20 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-10 backdrop-blur-sm lg:p-16">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

                            {/* Left - Story */}
                            <div>
                                <h3 className="mb-6 text-3xl font-bold text-white">Our Story</h3>
                                <div className="space-y-4 text-lg leading-relaxed text-gray-300">
                                    <p>
                                        Founded over 15 years ago, Barrwit International has grown from a boutique consultancy to a global powerhouse in software development, investment management, and business development.
                                    </p>
                                    <p>
                                        Our journey has been defined by one constant: an unwavering commitment to delivering exceptional value to our clients. We combine deep industry expertise with cutting-edge innovation to solve the most complex business challenges.
                                    </p>
                                    <p>
                                        Today, we serve over 200 clients worldwide, managing billions in assets and driving transformative growth across industries.
                                    </p>
                                </div>
                            </div>

                            {/* Right - Mission & Vision */}
                            <div className="space-y-8">
                                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6 backdrop-blur-sm">
                                    <h4 className="mb-3 text-xl font-bold text-cyan-400">Our Mission</h4>
                                    <p className="text-gray-300 leading-relaxed">
                                        To empower organizations and individuals to achieve extraordinary growth through innovative solutions, strategic partnerships, and unwavering commitment to excellence.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                                    <h4 className="mb-3 text-xl font-bold text-white">Our Vision</h4>
                                    <p className="text-gray-300 leading-relaxed">
                                        To be the world's most trusted partner for businesses seeking transformative growth in the digital age, setting new standards for innovation and impact.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-4 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,255,0.15)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-cyan-400/0 opacity-0 transition-opacity duration-500 group-hover:from-cyan-400/10 group-hover:to-transparent group-hover:opacity-100"></div>

                                <div className="relative">
                                    <IconComponent className="mb-4 text-4xl text-cyan-400 transition-transform duration-500 group-hover:scale-110" />
                                    <div className="mb-2 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-cyan-400">
                                        {stat.value}
                                    </div>
                                    <div className="mb-1 text-sm font-semibold tracking-wide text-white">
                                        {stat.label}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {stat.description}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
