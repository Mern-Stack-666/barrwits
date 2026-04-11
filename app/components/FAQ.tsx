'use client';

import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

const faqs = [
    {
        question: "What services does Barrwit International offer?",
        answer: "We specialize in three core areas: Software Development (custom applications, cloud solutions, API integration), Investment Management (portfolio strategy, risk analysis, asset allocation), and Business Development (market expansion, partnership development, revenue optimization). We also offer Digital Transformation services to help modernize your enterprise infrastructure."
    },
    {
        question: "How long has Barrwit been in business?",
        answer: "Barrwit International has been delivering exceptional results for over 15 years. During this time, we've grown from a boutique consultancy to a global powerhouse, serving 200+ clients worldwide and managing over $2B in assets."
    },
    {
        question: "What industries do you serve?",
        answer: "We work across multiple industries including technology, finance, healthcare, retail, manufacturing, and professional services. Our global expertise combined with deep local market knowledge allows us to deliver tailored solutions regardless of your industry vertical."
    },
    {
        question: "What is your approach to client partnerships?",
        answer: "We don't just provide services—we become your strategic partner. Our approach is collaborative and customized to your unique challenges and goals. We combine deep expertise with innovative thinking to deliver results that exceed expectations, maintaining a 98% client satisfaction rate."
    },
    {
        question: "How do you ensure project success?",
        answer: "Our success is built on proven methodologies, experienced teams, and a commitment to excellence. We use agile approaches for rapid execution, maintain transparent communication throughout the engagement, and leverage cutting-edge technology to keep you ahead of the competition."
    },
    {
        question: "What makes Barrwit different from other consulting firms?",
        answer: "Our unique combination of 15+ years of proven track record, innovation-first mindset, partnership approach, global expertise, tailored solutions, and rapid execution sets us apart. We're not just consultants—we're your partners in growth and transformation."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            data-gsap="section"
            id="faq"
            className="relative w-full bg-gradient-to-b from-black via-zinc-950 to-black px-4 sm:px-6 py-8 md:py-12"
        >
            <div className="mx-auto max-w-4xl">

                {/* Section Header */}
                <div data-gsap="heading" className="mb-10 md:mb-16 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-4 py-2 backdrop-blur-sm">
                        <div className="h-2 w-2 rounded-full bg-[#C0C0C0] animate-pulse"></div>
                        <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">FAQ</span>
                    </div>
                    <h2 className="mb-4 md:mb-6 text-3xl sm:text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                        Frequently Asked{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">Questions</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed">
                        Everything you need to know about Barrwit and our services
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div data-gsap="grid" className="space-y-3 sm:space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            data-gsap-item
                            className={`group overflow-hidden rounded-2xl border transition-all duration-500 ${openIndex === index
                                ? 'border-[#C0C0C0]/50 bg-gradient-to-br from-[#C0C0C0]/10 via-transparent to-transparent shadow-[0_0_40px_rgba(192,192,192,0.15)]'
                                : 'border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-[#C0C0C0]/30'
                                }`}
                        >
                            {/* Question Button */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex w-full items-center justify-between p-4 sm:p-6 text-left transition-all duration-300 lg:p-8"
                            >
                                <span className={`text-lg font-semibold transition-colors duration-300 lg:text-xl ${openIndex === index ? 'text-[#C0C0C0]' : 'text-white group-hover:text-[#C0C0C0]'
                                    }`}>
                                    {faq.question}
                                </span>
                                <HiChevronDown
                                    className={`ml-4 flex-shrink-0 text-xl sm:text-2xl transition-all duration-500 ${openIndex === index
                                        ? 'rotate-180 text-[#C0C0C0]'
                                        : 'rotate-0 text-gray-400 group-hover:text-[#C0C0C0]'
                                        }`}
                                />
                            </button>

                            {/* Answer */}
                            <div
                                className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="border-t border-white/10 px-4 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4 lg:px-8 lg:pb-8">
                                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div data-gsap="cta" className="mt-10 text-center">
                    <p className="mb-6 text-sm sm:text-base lg:text-lg text-gray-400">
                        Still have questions? We're here to help.
                    </p>
                    <a
                        href="#contact"
                        className="group inline-flex items-center gap-2 rounded-lg border border-white/20 bg-gradient-to-r from-white to-gray-100 px-6 py-3 sm:px-8 sm:py-4 text-sm font-bold tracking-widest text-black shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(192,192,192,0.3)] md:hover:scale-105"
                    >
                        <span className="relative z-10">GET IN TOUCH</span>
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>

            </div>
        </section>
    );
}
