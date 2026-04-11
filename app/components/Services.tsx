'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { services } from '../data/services';

export default function Services() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section
            data-gsap="section"
            id="services"
            className="relative w-full bg-linear-to-b from-black via-zinc-950 to-black px-6 pb-8 md:pb-12"
        >
            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <div data-gsap="heading" className="mb-20">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-4 py-2 backdrop-blur-sm">
                        <div className="h-2 w-2 rounded-full bg-[#C0C0C0] animate-pulse"></div>
                        <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">OUR EXPERTISE</span>
                    </div>
                    <h2 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                        Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">Services</span>
                    </h2>
                    <p className="max-w-3xl text-xl text-gray-400 leading-relaxed">
                        Delivering world-class solutions across software, investment, and business development with unmatched expertise and innovation.
                    </p>
                </div>

                {/* Services Grid */}
                <div data-gsap="grid" className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => {
                        return (
                            <div
                                key={index}
                                data-gsap-item
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`group relative overflow-hidden rounded-3xl border transition-all duration-700 ${hoveredIndex === index
                                    ? 'border-[#C0C0C0]/50 bg-gradient-to-br from-[#C0C0C0]/10 via-transparent to-transparent shadow-[0_0_60px_rgba(192,192,192,0.25)]'
                                    : 'border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-[#C0C0C0]/30'
                                    }`}
                            >
                                <div className="flex flex-col">

                                    <div className="relative h-48 w-full sm:h-56">
                                        <Image
                                            src={service.imageSrc}
                                            alt={service.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
                                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                            priority={index === 0}
                                        />
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80"></div>

                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-xl sm:text-2xl font-bold text-white">
                                                {service.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="p-5 sm:p-6 lg:p-8">
                                        <p className="text-sm sm:text-base leading-relaxed text-gray-300 lg:text-lg">
                                            {service.description}
                                        </p>

                                        <div className="mt-6 flex items-center justify-between">
                                            <Link
                                                href={`/services/${service.slug}`}
                                                className="group/btn flex items-center gap-2 text-sm font-semibold tracking-wider text-[#C0C0C0] transition-all duration-300 hover:gap-4"
                                            >
                                                <span>Explore Service</span>
                                                <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </Link>

                                            <div className="text-xs font-medium tracking-widest text-white/40">
                                                VIEW DETAILS
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Animated glow border */}
                                <div className={`pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-700 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#C0C0C0]/20 via-transparent to-[#C0C0C0]/20 blur-2xl"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
