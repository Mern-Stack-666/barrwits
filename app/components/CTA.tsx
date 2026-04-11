'use client';

export default function CTA() {
    return (
        <section
            data-gsap="section"
            className="relative w-full bg-black px-4 sm:px-6 py-8 md:py-12"
        >
            <div className="mx-auto max-w-7xl">
                <div data-gsap="cta" className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent px-5 sm:px-8 py-10 sm:py-14 md:py-16 lg:px-16 lg:py-20 backdrop-blur-sm">

                    {/* Background Glow */}
                    <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 bg-[#C0C0C0]/20 blur-[120px]"></div>
                    <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 bg-white/10 blur-[140px]"></div>
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(192,192,192,0.12),transparent_55%)]"></div>

                    <div className="relative z-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                        <div className="text-center md:text-left">
                            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">transform</span> your future?
                            </h2>

                            <p className="mx-auto md:mx-0 max-w-2xl text-base sm:text-lg text-gray-300">
                                Join the industry leaders who trust Barrwit International to drive their growth and innovation. Let's build something extraordinary together.
                            </p>
                        </div>

                        <div className="flex w-full flex-col gap-3 sm:flex-row md:flex-col md:items-end md:gap-4">
                            <a
                                href="mailto:hello@barrwit.com"
                                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#C0C0C0] to-[#8E8E8E] px-7 py-3.5 sm:px-10 sm:py-5 text-sm font-bold tracking-widest text-black shadow-lg transition-all duration-500 hover:shadow-[0_0_40px_rgba(192,192,192,0.35)] md:hover:-translate-y-0.5"
                            >
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                                <span className="relative z-10 flex items-center gap-2">
                                    START A PROJECT
                                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </a>

                            <a
                                href="#contact"
                                className="group relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-7 py-3.5 sm:px-10 sm:py-5 text-sm font-bold tracking-widest text-white backdrop-blur-sm transition-all duration-500 hover:border-[#C0C0C0]/50 hover:bg-[#C0C0C0]/10"
                            >
                                <span className="relative z-10">CONTACT US</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
