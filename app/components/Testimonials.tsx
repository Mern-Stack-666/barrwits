'use client';

import { useEffect, useState, useRef } from 'react';

const testimonials = [
    {
        quote: "Barrwit transformed our entire digital infrastructure. Their expertise in software development is unmatched.",
        author: "Sarah Chen",
        role: "CTO, TechVision Inc.",
        company: "Fortune 500 Technology Company"
    },
    {
        quote: "The investment strategies they developed increased our portfolio returns by 45% in just 18 months.",
        author: "Michael Rodriguez",
        role: "Managing Partner",
        company: "Global Investment Fund"
    },
    {
        quote: "Their business development approach opened doors we didn't even know existed. Revenue up 3x.",
        author: "Aisha Patel",
        role: "CEO, GrowthCo",
        company: "B2B SaaS Startup"
    }
];

export default function Testimonials() {
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

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            className="relative w-full bg-black px-4 sm:px-6 py-8 md:py-12"
        >
            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <div className={`mb-10 md:mb-20 text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-4 py-2 backdrop-blur-sm">
                        <div className="h-2 w-2 rounded-full bg-[#C0C0C0] animate-pulse"></div>
                        <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">CLIENT SUCCESS</span>
                    </div>
                    <h2 className="mb-4 md:mb-6 text-3xl sm:text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                        Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">industry leaders</span>
                    </h2>
                </div>

                {/* Testimonial Carousel */}
                <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5 sm:p-8 md:p-10 lg:p-10 backdrop-blur-sm">

                        {/* Quote Icon */}
                        <div className="pointer-events-none absolute top-4 left-4 sm:top-6 sm:left-6 text-5xl sm:text-6xl text-[#C0C0C0]/20">❝</div>

                        {/* Content */}
                        <div className="relative min-h-[220px] sm:min-h-[260px] md:min-h-[300px] flex flex-col justify-center">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ${index === activeIndex
                                        ? 'opacity-100 translate-x-0'
                                        : index < activeIndex
                                            ? 'opacity-0 -translate-x-full'
                                            : 'opacity-0 translate-x-full'
                                        }`}
                                >
                                    <p className="mb-6 sm:mb-8 text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-gray-200 lg:text-3xl">
                                        "{testimonial.quote}"
                                    </p>
                                    <div>
                                        <div className="text-base sm:text-lg md:text-xl font-bold text-white">{testimonial.author}</div>
                                        <div className="text-sm sm:text-base text-[#C0C0C0]">{testimonial.role}</div>
                                        <div className="text-xs sm:text-sm text-gray-500">{testimonial.company}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Dots */}
                        <div className="mt-6 sm:mt-8 flex justify-center gap-2 sm:gap-3">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-3 sm:h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                        ? 'w-10 sm:w-12 bg-[#C0C0C0]'
                                        : 'w-3 sm:w-2 bg-white/30 hover:bg-white/50'
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
