'use client';

import { useEffect, useState, useRef } from 'react';
import { HiCode, HiTrendingUp, HiLightningBolt } from 'react-icons/hi';
import { FaRocket } from 'react-icons/fa';

const services = [
    {
        number: "01",
        title: "Software Development",
        description: "Transform your vision into reality with cutting-edge software solutions. We build scalable, secure, and innovative applications that drive business growth and operational excellence.",
        icon: HiCode,
        features: ["Custom Applications", "Cloud Solutions", "API Integration", "Mobile Development"]
    },
    {
        number: "02",
        title: "Investment Management",
        description: "Strategic portfolio management and financial advisory services designed to maximize returns while minimizing risk through data-driven insights and market expertise.",
        icon: HiTrendingUp,
        features: ["Portfolio Strategy", "Risk Analysis", "Asset Allocation", "Market Research"]
    },
    {
        number: "03",
        title: "Business Development",
        description: "Accelerate your growth with comprehensive BD strategies. We identify opportunities, forge partnerships, and expand your market presence for sustainable success.",
        icon: FaRocket,
        features: ["Market Expansion", "Partnership Development", "Revenue Optimization", "Strategic Planning"]
    },
    {
        number: "04",
        title: "Digital Transformation",
        description: "End-to-end digital solutions to modernize your enterprise infrastructure. We help you leverage technology to stay competitive in the digital age.",
        icon: HiLightningBolt,
        features: ["Process Automation", "Digital Strategy", "Change Management", "Technology Integration"]
    }
];

export default function Services() {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
            id="services"
            className="relative w-full bg-gradient-to-b from-black via-zinc-950 to-black px-6 pb-20"
        >
            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <div className={`mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 backdrop-blur-sm">
                        <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        <span className="text-xs font-medium tracking-widest text-cyan-400">OUR EXPERTISE</span>
                    </div>
                    <h2 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                        Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">Services</span>
                    </h2>
                    <p className="max-w-3xl text-xl text-gray-400 leading-relaxed">
                        Delivering world-class solutions across software, investment, and business development with unmatched expertise and innovation.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid gap-8 lg:grid-cols-2">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <div
                                key={index}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`group relative overflow-hidden rounded-3xl border transition-all duration-700 ${hoveredIndex === index
                                    ? 'border-cyan-400/50 bg-gradient-to-br from-cyan-400/10 via-transparent to-transparent shadow-[0_0_60px_rgba(0,255,255,0.25)]'
                                    : 'border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-cyan-400/30'
                                    } ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="p-10 lg:p-12">

                                    {/* Top - Number & Icon */}
                                    <div className="mb-8 flex items-start justify-between">
                                        <div className={`text-7xl font-bold transition-all duration-500 lg:text-8xl ${hoveredIndex === index
                                            ? 'text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-white'
                                            : 'text-white/10'
                                            }`}>
                                            {service.number}
                                        </div>
                                        <IconComponent className={`text-5xl text-cyan-400 transition-transform duration-500 ${hoveredIndex === index ? 'scale-110' : 'scale-100'
                                            }`} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="mb-8 text-lg leading-relaxed text-gray-300">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <div className="mb-8 grid grid-cols-2 gap-3">
                                        {service.features.map((feature, fIndex) => (
                                            <div
                                                key={fIndex}
                                                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10"
                                            >
                                                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400"></div>
                                                <span className="text-sm font-medium text-gray-300">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <button className="group/btn flex items-center gap-2 text-sm font-semibold tracking-wider text-cyan-400 transition-all duration-300 hover:gap-4">
                                        <span>Explore Service</span>
                                        <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </button>

                                </div>

                                {/* Animated glow border */}
                                <div className={`absolute inset-0 rounded-3xl transition-opacity duration-700 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 via-transparent to-cyan-400/20 blur-2xl"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
