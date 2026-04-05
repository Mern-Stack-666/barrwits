'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HiArrowRight, HiArrowUpRight, HiChevronDown } from 'react-icons/hi2';

const menuItems = [
    { title: 'HOME', href: '/' },
    { title: 'ABOUT', href: '/about' },
    {
        title: 'SERVICES',
        children: [
            { title: 'Software Development', href: '/services/software-development' },
            { title: 'Investment Management', href: '/services/investment-management' },
            { title: 'Business Development', href: '/services/business-development' },
            { title: 'Digital Transformation', href: '/services/digital-transformation' }
        ]
    },
    { title: 'PROJECTS', href: '/projects' },
    { title: 'CONTACT', href: '/contact' }
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('HOME');
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    useEffect(() => {
        if (!isMenuOpen) return;

        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;

        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        if (scrollBarWidth > 0) {
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        }

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleAccordion = (title: string) => {
        if (openAccordion === title) {
            setOpenAccordion(null);
        } else {
            setOpenAccordion(title);
        }
    };

    return (
        <>
            <header className="fixed top-6 left-0 right-0 z-[100] px-6 transition-all duration-500 md:px-12 py-3 lg:px-24 pointer-events-none">
                <div className="relative mx-auto max-w-7xl">
                    <div className={`pointer-events-none absolute -inset-x-4 -inset-y-3 rounded-[2.25rem] border transition-all duration-500 md:-inset-x-6 lg:-inset-x-10 ${isScrolled || isMenuOpen
                        ? 'border-white/10 bg-black/40 backdrop-blur-xl'
                        : 'border-transparent bg-transparent'
                        }`}></div>

                    <div className="relative flex items-center justify-between">

                    {/* 1. Logo Pill - Morphs when menu open */}
                    <Link
                        href="/"
                        className={`pointer-events-auto group relative flex items-center overflow-hidden rounded-full border border-white/10 bg-white shadow-lg transition-all duration-500 ${isMenuOpen ? 'h-12 w-12 justify-center pl-0 pr-0' : 'h-12 w-auto gap-3 pl-2 pr-6'
                            }`}
                    >
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-500 ${isMenuOpen ? 'scale-100' : ''}`}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                        </div>
                        <span className={`font-bold tracking-widest text-black whitespace-nowrap transition-all duration-300 ${isMenuOpen ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'
                            }`}>
                            BARRWIT
                        </span>
                    </Link>

                    <div className="flex items-center gap-4 pointer-events-auto">

                        {/* 2. LET'S TALK Pill */}
                        <Link
                            href="/contact"
                            className="group hidden h-12 items-center gap-3 rounded-full bg-[#1a1a1a] px-6 text-sm font-bold tracking-widest text-white transition-all duration-300 hover:bg-[#C0C0C0] hover:text-black md:flex shadow-lg"
                        >
                            <span>LET'S TALK</span>
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C0C0C0] opacity-75 group-hover:bg-black"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C0C0C0] group-hover:bg-black"></span>
                            </span>
                        </Link>

                        {/* 3. MENU / CLOSE Pill */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="group flex h-12 items-center gap-3 rounded-full bg-white px-6 text-sm font-bold tracking-widest text-black shadow-lg transition-all duration-300 hover:bg-gray-100"
                        >
                            <span>{isMenuOpen ? 'CLOSE' : 'MENU'}</span>
                            <div className="flex flex-col gap-1">
                                {isMenuOpen ? (
                                    <>
                                        <div className="h-1 w-1 rounded-full bg-black"></div>
                                        <div className="h-1 w-1 rounded-full bg-black"></div>
                                    </>
                                ) : (
                                    <div className="flex gap-0.5">
                                        <div className="h-1 w-1 rounded-full bg-black"></div>
                                        <div className="h-1 w-1 rounded-full bg-black"></div>
                                    </div>
                                )}
                            </div>
                        </button>
                    </div>

                    </div>
                </div>
            </header>

            {/* Card Menu Overlay */}
            <div
                className={`fixed inset-0 z-[90]  mt-20 px-4 flex items-start justify-center overflow-y-auto bg-black/60 pt-10 pb-10 backdrop-blur-md transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                <div
                    className={`flex w-full max-w-sm flex-col gap-4 transition-all duration-700 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                        }`}
                >
                    {/* Card 1: Navigation */}
                    <div className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl">
                        <nav className="flex flex-col gap-4">
                            {menuItems.map((item) => (
                                <div key={item.title}>
                                    {item.children ? (
                                        // Accordion Item
                                        <div>
                                            <button
                                                onClick={() => toggleAccordion(item.title)}
                                                className="group flex w-full items-center justify-between text-2xl font-bold tracking-tight text-white transition-colors hover:text-[#C0C0C0]"
                                            >
                                                <span>{item.title}</span>
                                                <HiChevronDown
                                                    className={`text-xl transition-transform duration-300 text-white group-hover:text-[#C0C0C0] ${openAccordion === item.title ? 'rotate-180' : ''
                                                        }`}
                                                />
                                            </button>

                                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordion === item.title ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                                                }`}>
                                                <div className="flex flex-col gap-3 pl-4 border-l-2 border-white/10">
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.title}
                                                            href={child.href}
                                                            onClick={() => { setActiveLink(item.title); setIsMenuOpen(false); }}
                                                            className="text-lg font-medium text-gray-400 hover:text-[#C0C0C0] transition-colors"
                                                        >
                                                            {child.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        // Regular Link
                                        <Link
                                            href={item.href}
                                            onClick={() => { setActiveLink(item.title); setIsMenuOpen(false); }}
                                            className="group flex items-center justify-between text-2xl font-bold tracking-tight text-white transition-colors hover:text-[#C0C0C0]"
                                        >
                                            <span>{item.title}</span>
                                            {activeLink === item.title && (
                                                <div className="h-2 w-2 rounded-full bg-[#C0C0C0]"></div>
                                            )}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* Card 2: Newsletter */}
                    <div className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl">
                        <h3 className="mb-6 text-3xl font-bold leading-tight text-white">
                            Subscribe to<br />our newsletter
                        </h3>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-white placeholder-gray-500 outline-none transition-all focus:border-[#C0C0C0]/50 focus:bg-white/10"
                            />
                            <button className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black transition-transform hover:scale-105 hover:bg-[#C0C0C0]">
                                <HiArrowRight className="text-xl" />
                            </button>
                        </div>
                    </div>

                    {/* Card 3: Labs */}
                    <div className="flex items-center justify-between rounded-[2rem] border border-white/10 bg-black p-6 shadow-2xl">
                        <div className="flex items-center gap-3">
                            <div className="text-2xl text-white">☺</div>
                            <span className="text-xl font-bold tracking-widest text-white">LABS</span>
                        </div>
                        <div className="text-white">
                            <HiArrowUpRight className="text-2xl" />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
