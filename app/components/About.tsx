'use client';

import Image from 'next/image';
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
    return (
        <section
            data-gsap="section"
            id="about"
            className="relative w-full bg-black px-4 sm:px-6 py-8 md:py-12"
        >
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div data-gsap="heading" className="mb-10 md:mb-20 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-4 py-2 backdrop-blur-sm">
                        <div className="h-2 w-2 rounded-full bg-[#C0C0C0] animate-pulse"></div>
                        <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">ABOUT BARRWIT</span>
                    </div>
                    <h2 className="mb-4 md:mb-6 text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                        Pioneering the future of{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">business excellence</span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed">
                        Barrwit International stands at the intersection of innovation and expertise. We don't just provide services—we forge partnerships that transform visions into reality.
                    </p>
                </div>

                {/* Content Grid */}
                <div data-gsap="copy" className="mb-10 md:mb-20">
                    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5 sm:p-8 md:p-10 backdrop-blur-sm lg:p-16">
                        <div className="grid gap-8 sm:gap-10">

                            {/* Left - Story */}
                            <div>
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                                    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent lg:max-w-[420px]">
                                        <div className="relative aspect-[4/3] w-full">
                                            <Image
                                                src="/hero-visual.png"
                                                alt="CEO"
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 520px"
                                                className="object-cover"
                                            />
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70"></div>
                                        </div>
                                        <div className="flex items-center justify-between gap-4 p-4">
                                            <div>
                                                <div className="text-sm font-bold tracking-wide text-white">CEO</div>
                                                <div className="text-xs text-gray-400">Barrwit International</div>
                                            </div>
                                            <div className="h-2 w-2 rounded-full bg-[#C0C0C0]"></div>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-white">Our Story</h3>
                                        <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
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
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div data-gsap="grid" className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div
                                key={index}
                                data-gsap-item
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5 sm:p-6 md:p-8 backdrop-blur-sm transition-all duration-500 hover:border-[#C0C0C0]/30 hover:bg-[#C0C0C0]/5 md:hover:scale-105 hover:shadow-[0_0_40px_rgba(192,192,192,0.15)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#C0C0C0]/0 to-[#C0C0C0]/0 opacity-0 transition-opacity duration-500 group-hover:from-[#C0C0C0]/10 group-hover:to-transparent group-hover:opacity-100"></div>

                                <div className="relative">
                                    <IconComponent className="mb-4 text-3xl sm:text-4xl text-[#C0C0C0] transition-transform duration-500 group-hover:scale-110" />
                                    <div className="mb-2 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-[#C0C0C0]">
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
