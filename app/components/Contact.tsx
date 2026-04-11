'use client';

import { HiMail, HiPhone } from 'react-icons/hi';

export default function Contact() {
    return (
        <section
            data-gsap="section"
            id="contact"
            className="relative w-full bg-black px-6 pb-8 md:pb-12"
        >
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div data-gsap="heading" className="mb-16 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 backdrop-blur-sm">
                        <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        <span className="text-xs font-medium tracking-widest text-cyan-400">GET IN TOUCH</span>
                    </div>

                    <h2 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                        Let's build something{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">extraordinary</span>
                    </h2>

                    <p className="mx-auto max-w-2xl text-xl text-gray-400 leading-relaxed">
                        Ready to transform your business? Get in touch with our team.
                    </p>
                </div>

                {/* Contact Cards */}
                <div data-gsap="grid" className="mb-16 grid gap-6 md:grid-cols-2">

                    {/* Email Card */}
                    <a
                        data-gsap-item
                        href="mailto:hello@barrwit.com"
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,255,0.15)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-cyan-400/0 opacity-0 transition-opacity duration-500 group-hover:from-cyan-400/10 group-hover:to-transparent group-hover:opacity-100"></div>

                        <div className="relative">
                            <HiMail className="mb-4 text-5xl text-cyan-400" />
                            <div className="mb-2 text-sm font-semibold tracking-wider text-gray-400">EMAIL</div>
                            <div className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                hello@barrwit.com
                            </div>
                        </div>
                    </a>

                    {/* Phone Card */}
                    <a
                        data-gsap-item
                        href="tel:+1234567890"
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,255,0.15)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-cyan-400/0 opacity-0 transition-opacity duration-500 group-hover:from-cyan-400/10 group-hover:to-transparent group-hover:opacity-100"></div>

                        <div className="relative">
                            <HiPhone className="mb-4 text-5xl text-cyan-400" />
                            <div className="mb-2 text-sm font-semibold tracking-wider text-gray-400">PHONE</div>
                            <div className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                +1 (234) 567-890
                            </div>
                        </div>
                    </a>

                </div>

                {/* Form */}
                <div data-gsap="cta">
                    <form className="space-y-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-sm lg:p-12">

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
                                    NAME
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
                                    EMAIL
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                                    placeholder="john@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="company" className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
                                COMPANY
                            </label>
                            <input
                                type="text"
                                id="company"
                                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                                placeholder="Your Company Inc."
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
                                MESSAGE
                            </label>
                            <textarea
                                id="message"
                                rows={6}
                                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 resize-none"
                                placeholder="Tell us about your project and how we can help..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="group relative w-full overflow-hidden rounded-lg border border-white/20 bg-gradient-to-r from-white to-gray-100 px-8 py-4 text-sm font-bold tracking-widest text-black shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:scale-[1.02]"
                        >
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                SEND MESSAGE
                                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </button>

                    </form>
                </div>

            </div>
        </section>
    );
}
