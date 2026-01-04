'use client';

import { FaLinkedinIn, FaTwitter, FaInstagram, FaArrowRight } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

export default function Footer() {
    return (
        <footer className="relative w-full border-t border-white/5 bg-gradient-to-b from-black via-zinc-950 to-black px-6 py-20 md:px-12 lg:px-24">
            {/* Background Glow */}
            <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-full bg-gradient-to-t from-cyan-900/10 to-transparent"></div>

            <div className="relative mx-auto max-w-7xl">

                <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

                    {/* Left Column: Brand & Newsletter */}
                    <div className="space-y-10">
                        <div>
                            <span className="text-4xl font-bold tracking-[0.2em] text-white">BARRWIT</span>
                            <p className="mt-4 max-w-md text-lg text-gray-400 leading-relaxed">
                                Pioneering the future of business through technology, investment, and strategic growth.
                            </p>
                        </div>

                        <div className="max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/30">
                            <h4 className="mb-4 text-sm font-bold tracking-widest text-white">STAY UPDATED</h4>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full rounded-xl border border-white/10 bg-black/50 py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                                    />
                                </div>
                                <button className="group flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-cyan-400 text-black transition-transform hover:scale-105 hover:bg-white">
                                    <FaArrowRight className="transition-transform duration-300 group-hover:-rotate-45" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Links Grid */}
                    <div className="grid grid-cols-2 gap-10 md:grid-cols-3">

                        {/* Services */}
                        <div>
                            <h4 className="mb-6 text-sm font-bold tracking-widest text-cyan-400">SERVICES</h4>
                            <ul className="space-y-4">
                                {['Software Development', 'Investment Management', 'Business Development', 'Digital Transformation'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white">
                                            <span className="h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-3"></span>
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="mb-6 text-sm font-bold tracking-widest text-cyan-400">COMPANY</h4>
                            <ul className="space-y-4">
                                {['About Us', 'Our Team', 'Careers', 'Latest News'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white">
                                            <span className="h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-3"></span>
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Connect */}
                        <div>
                            <h4 className="mb-6 text-sm font-bold tracking-widest text-cyan-400">SOCIAL</h4>
                            <div className="flex flex-col gap-4">
                                <a href="#" className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-cyan-400">
                                    <FaLinkedinIn className="text-lg" /> LinkedIn
                                </a>
                                <a href="#" className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-cyan-400">
                                    <FaTwitter className="text-lg" /> Twitter
                                </a>
                                <a href="#" className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-cyan-400">
                                    <FaInstagram className="text-lg" /> Instagram
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
                    <p className="text-xs text-gray-600">
                        © 2026 Barrwit International. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                            <a key={item} href="#" className="text-xs text-gray-600 transition-colors hover:text-cyan-400">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}
