'use client';

import { useState } from 'react';

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
    },
    {
        number: "04",
        title: "Digital Transformation",
        description: "Modernize your operations with end-to-end digital transformation. We streamline processes, enhance customer experiences, and implement scalable technology foundations.",
        features: ["Process Automation", "Digital Strategy", "Change Management", "Technology Integration"]
    }
];

export default function WhatWeDo() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section
            data-gsap="section"
            id="what-we-do"
            className="relative min-h-screen w-full bg-black px-6 pb-8 md:pb-12  "
        >
            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <div data-gsap="heading" className="mb-8 md:mb-20">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-4 py-2 backdrop-blur-sm">
                        <div className="h-2 w-2 rounded-full bg-[#C0C0C0] animate-pulse"></div>
                        <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">WHAT WE DO</span>
                    </div>
                    <h2 className="mb-4 md:mb-6 text-3xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                        Transforming businesses through{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#C0C0C0] to-white">innovation</span>
                    </h2>
                    <p className="max-w-3xl text-xl text-gray-400 leading-relaxed">
                        We deliver world-class solutions across three core pillars, each designed to propel your organization into the future.
                    </p>
                </div>

                {/* Offerings Grid */}
                <div data-gsap="grid" className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-2 lg:gap-12">
                    {offerings.map((offering, index) => (
                        <div
                            key={index}
                            data-gsap-item
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`group relative overflow-hidden rounded-2xl border transition-all duration-700 ${activeIndex === index
                                ? 'border-[#C0C0C0]/50 bg-gradient-to-br from-[#C0C0C0]/10 via-transparent to-transparent shadow-[0_0_50px_rgba(192,192,192,0.2)]'
                                : 'border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-[#C0C0C0]/30'
                                }`}
                        >
                            <div className="p-5 sm:p-6 md:p-8 lg:p-10">
                                <div className="flex flex-col gap-6">

                                    {/* Left - Number & Title */}
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`inline-flex items-center rounded-full border px-3 py-3 text-xs font-bold tracking-widest transition-all duration-500 ${activeIndex === index
                                                ? 'border-[#C0C0C0]/40 bg-[#C0C0C0]/10 text-[#C0C0C0]'
                                                : 'border-white/10 bg-white/5 text-white/60'
                                                }`}>
                                                {offering.number}
                                            </div>
                                            <h3 className="text-xl sm:text-2xl font-bold text-white">
                                                {offering.title}
                                            </h3>
                                        </div>
                                        {/* <div className={`h-10 w-10 rounded-xl border transition-all duration-500 ${activeIndex === index
                                            ? 'border-cyan-400/30 bg-cyan-400/10'
                                            : 'border-white/10 bg-white/5'
                                            }`}></div> */}
                                    </div>

                                    {/* Right - Description & Features */}
                                    <div>
                                        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                                            {offering.description}
                                        </p>

                                        {/* Features Grid */}
                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {offering.features.map((feature, fIndex) => (
                                                <div
                                                    key={fIndex}
                                                    className="group/feature inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-[#C0C0C0]/30 hover:bg-[#C0C0C0]/10"
                                                >
                                                    <span className="transition-colors duration-300 group-hover/feature:text-white">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <button className="mt-6 group/btn inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-[#C0C0C0] transition-all duration-300 hover:gap-4">
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
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#C0C0C0]/20 via-transparent to-[#C0C0C0]/20 blur-xl"></div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
