'use client';

import Scene from "./Scene";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { HiChartBar, HiShieldCheck, HiGlobeAlt } from "react-icons/hi2";

export default function Hero() {
    const [isVisible, setIsVisible] = useState(false);
    const [typedText, setTypedText] = useState("");
    const fullText = "INTERNATIONAL CONSULTING";

    // 3D Tilt State
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Typewriter effect
    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setTypedText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 80);

        return () => clearInterval(typingInterval);
    }, []);

    // Perspective Tilt Handler
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 20; // Sensitivity 
        const y = (e.clientY - top - height / 2) / 20;
        setTilt({ x, y });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (

        <section className="relative flex min-h-screen w-full flex-col items-center justify-center md:mt-28 mb-10 overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black px-2 md:px-6 pb-10 pt-24 md:pt-0 text-white perspective-[1000px] lg:pb-5 lg:pt-0">
            {/* 3D Background */}
            <Scene />

            {/* Ambient Background Glow Orb */}
            <div className={`absolute left-10 top-20 h-96 w-96 rounded-full bg-[#C0C0C0]/10 blur-[120px] transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>

            {/* Content Overlay */}
            <div className="relative z-50 flex w-full max-w-7xl flex-col items-center justify-between gap-12 px-4 md:flex-row lg:gap-16 lg:px-6">

                {/* Left Column - Text Content */}
                <div className={`flex flex-col items-start justify-center pt-5 xl:pt-10 lg:w-1/2 lg:pt-0 ${isVisible ? 'div-animate-slide-in-left' : 'opacity-0'}`}>

                    {/* Eyebrow */}
                    <div className="mb-4 md:mb-6 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-4 py-2 backdrop-blur-sm shadow-[0_0_15px_rgba(192,192,192,0.1)] transition-transform hover:scale-105">
                        <div className="h-2 w-2 rounded-full bg-[#C0C0C0] animate-pulse"></div>
                        <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">
                            {typedText}
                            <span className="animate-pulse">|</span>
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="mb-2 md:mb-6 text-[34px] font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-4xl xl:text-7xl">
                        An organization where you find{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-[#C0C0C0] via-white to-[#C0C0C0] animate-gradient-x bg-size-[200%_auto]">growth</span>
                            {/* <span className="absolute -bottom-1 left-0 h-1 w-full bg-cyan-400/30 blur-sm lg:-bottom-2"></span> */}
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mb-4 max-w-xl text-base xl:text-lg font-light leading-relaxed text-gray-300 lg:mb-6 xl:mb-10 lg:text-2xl">
                        Not just for businesses but for people who live in something big. Barrwit International is the game changer when it comes to software, investment management and BD.
                    </p>

                    {/* Buttons */}
                    <div className="flex w-full flex-col gap-2 md:flex-row justify-center lg:gap-6 lg:w-auto">
                        <button className="btn-premium group relative overflow-hidden bg-gradient-to-r from-white to-[#E8E8E8] px-4 py-3 xl:px-8 xl:py-4 text-xs font-bold tracking-widest text-black shadow-2xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(192,192,192,0.4)] hover:-translate-y-1">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <span className="text-sm lg:text-base">
                                DISCOVER MORE
                                </span>
                                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </button>
                        <button className="btn-premium group relative overflow-hidden border-2 border-white/30 bg-transparent px-4 py-3 xl:px-8 xl:py-4 text-xs font-bold tracking-widest text-white backdrop-blur-sm transition-all duration-500 hover:border-[#C0C0C0]/60 hover:text-[#C0C0C0] hover:bg-[#C0C0C0]/10 hover:-translate-y-1">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <span className="text-xs lg:text-base">
                                CONTACT US
                                </span>
                                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </button>
                    </div>

                    {/* Detailed Stats */}
                    <div className="xl:mt-10 mt-6 grid w-full grid-cols-3 gap-4 border-t border-white/10 md:pt-8  lg:flex lg:w-auto lg:gap-12">
                        {[
                            { val: '15+', label: 'Years Experience' },
                            { val: '200+', label: 'Global Clients' },
                            { val: '98%', label: 'Success Rate' }
                        ].map((stat, i) => (
                            <div key={i} className="group cursor-default text-center lg:text-left">
                                <div className="text-2xl font-bold text-white transition-all group-hover:text-[#C0C0C0] group-hover:drop-shadow-[0_0_10px_rgba(192,192,192,0.5)] lg:text-4xl">{stat.val}</div>
                                <div className="text-xs text-gray-400 tracking-wide group-hover:text-gray-200 lg:text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Right Column - Interactive Image Container */}
                <div
                    className={`hidden md:flex items-center justify-center w-full lg:w-5/12 xl:w-1/3 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
                    style={{ animationDelay: '0.2s' }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    ref={imageRef}
                >
                    <div
                        className="relative h-[400px] w-full max-w-lg transition-transform duration-200 ease-out lg:h-[520px] xl:h-[600px]"
                        style={{ transform: `rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)` }}
                    >
                        {/* Main Glass Card */}
                        <div className="relative h-full w-full rounded-3xl border border-[#C0C0C0]/30 bg-gradient-to-br from-[#C0C0C0]/10 via-gray-900/60 to-black p-4 shadow-[0_0_50px_rgba(192,192,192,0.15)] backdrop-blur-md lg:p-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#C0C0C0]/20 to-transparent rounded-3xl blur-2xl"></div>

                            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/5">
                                <Image
                                    src="/hero-banner.webp"
                                    alt="Barrwit Visual"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                    priority
                                />
                            </div>

                            {/* Floating Badge 1 - Top Left */}
                            <div className="absolute -left-4 top-8 hidden animate-float-slow items-center gap-3 rounded-xl border border-white/10 bg-black/80 p-3 shadow-xl backdrop-blur-md transition-transform hover:scale-110 lg:-left-8 lg:top-12 lg:flex lg:p-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C0C0C0]/20 text-[#C0C0C0]">
                                    <HiChartBar className="text-xl" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">Analytics</div>
                                    <div className="text-xs text-gray-400 text-[#C0C0C0]">+245% Growth</div>
                                </div>
                            </div>

                            {/* Floating Badge 2 - Bottom Right */}
                            <div className="absolute -right-4 bottom-16 hidden animate-float-reverse items-center gap-3 rounded-xl border border-white/10 bg-black/80 p-3 shadow-xl backdrop-blur-md transition-transform hover:scale-110 lg:-right-8 lg:bottom-24 lg:flex lg:p-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/20 text-pink-400">
                                    <HiGlobeAlt className="text-xl" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">Global Reach</div>
                                    <div className="text-xs text-gray-400">25+ Countries</div>
                                </div>
                            </div>

                            {/* Floating Badge 3 - Bottom Left (Small) */}
                            <div className="absolute -bottom-4 left-8 hidden animate-float-slow items-center gap-2 rounded-full border border-white/10 bg-black/80 px-4 py-2 shadow-xl backdrop-blur-md lg:-bottom-6 lg:left-12 lg:flex">
                                <HiShieldCheck className="text-green-400" />
                                <span className="text-xs font-bold text-white">ISO Certified</span>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            {/* Scroll Indicator */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden animate-bounce transition-opacity duration-1000 lg:block ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex flex-col items-center gap-2 opacity-50 transition-opacity hover:opacity-100">
                    <div className="h-12 w-7 rounded-full border-2 border-white/30 flex justify-center pt-2 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        <div className="h-3 w-1 rounded-full bg-[#C0C0C0] animate-pulse"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
