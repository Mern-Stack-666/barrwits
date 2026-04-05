import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiArrowRight, HiCheckCircle, HiLightningBolt, HiSparkles, HiChartBar, HiShieldCheck, HiAcademicCap, HiQuestionMarkCircle } from 'react-icons/hi';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import QuoteForm from './QuoteForm';

export async function generateStaticParams() {
    await dbConnect();
    const services = await Service.find({ isActive: true }).select('slug');
    return services.map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    await dbConnect();
    const service = await Service.findOne({ slug, isActive: true });

    if (!service) {
        notFound();
    }

    const serviceObj = service.toObject();

    const features = serviceObj.features ?? [];
    const benefits = serviceObj.benefits ?? [];
    const deliverables = serviceObj.deliverables ?? [];
    const process = serviceObj.process ?? [];
    const caseStudies = serviceObj.caseStudies ?? [];
    const faqs = serviceObj.faqs ?? [];
    const sections = serviceObj.sections ?? [];

    return (
        <>
            <Header />
            <main className="bg-black">
            {/* Hero Section */}
            <section className="relative w-full px-4 sm:px-6 pt-32 pb-16 md:pt-40 md:pb-24">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center animate-fade-in-up">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-5 py-2 backdrop-blur-sm">
                            <div className="h-2 w-2 rounded-full bg-[#C0C0C0] animate-pulse"></div>
                            <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">{serviceObj.slug.replace(/-/g, ' ').toUpperCase()}</span>
                        </div>
                        <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
                            {serviceObj.title}
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg sm:text-xl text-gray-400 leading-relaxed">
                            {serviceObj.tagline ?? serviceObj.description}
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="#quote-form"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#C0C0C0] to-white text-black font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(192,192,192,0.3)] hover:scale-105"
                            >
                                Start a Project
                                <HiArrowRight className="text-lg" />
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#C0C0C0]/30 text-white font-semibold bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#C0C0C0]/50 hover:bg-[#C0C0C0]/10"
                            >
                                Back to Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Image */}
                        <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
                            <div className="relative aspect-[4/3] w-full">
                                {serviceObj.imageSrc ? (
                                    <Image
                                        src={serviceObj.imageSrc}
                                        alt={serviceObj.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 520px"
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#C0C0C0]/10 to-transparent flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-6xl mb-4">💼</div>
                                            <p className="text-gray-400">{serviceObj.title}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70"></div>
                            </div>
                            <div className="flex items-center justify-between gap-4 p-5">
                                <div>
                                    <div className="text-sm font-bold tracking-wide text-white">{serviceObj.title}</div>
                                    <div className="text-xs text-gray-400">Barrwit International</div>
                                </div>
                                <div className="h-2 w-2 rounded-full bg-[#C0C0C0]"></div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-center">
                            <h2 className="mb-6 text-3xl sm:text-4xl font-bold text-white">Overview</h2>
                            <div className="space-y-5 text-base sm:text-lg leading-relaxed text-gray-300">
                                <p>{serviceObj.longDescription ?? serviceObj.description}</p>
                            </div>

                            {/* Highlights */}
                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-white mb-4">Key Highlights</h3>
                                <div className="flex flex-wrap gap-3">
                                    {serviceObj.highlights.map((highlight: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300"
                                        >
                                            <HiCheckCircle className="text-[#C0C0C0]" />
                                            {highlight}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dynamic Content Sections from Database */}
            {sections.length > 0 && (
                <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="space-y-8">
                            {sections.map((section: { title: string; content: string[] }, index: number) => (
                                <div
                                    key={index}
                                    className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-12 backdrop-blur-sm"
                                >
                                    <div className="mb-6 flex items-center justify-between gap-4">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-white">{section.title}</h3>
                                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                                        <div className="h-2 w-2 rounded-full bg-[#C0C0C0]"></div>
                                    </div>
                                    <div className="space-y-4">
                                        {section.content.map((item: string, idx: number) => (
                                            <p key={idx} className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Deliverables & Process - Only show if data exists */}
            {(deliverables.length > 0 || process.length > 0) && (
                <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-8 md:grid-cols-2">
                            {/* Deliverables */}
                            {deliverables.length > 0 && (
                                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-12 backdrop-blur-sm">
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-[#C0C0C0]"></div>
                                        <h3 className="text-2xl font-bold text-white">Deliverables</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {deliverables.map((item: string, index: number) => (
                                            <li key={index} className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#C0C0C0]/10 to-transparent border border-[#C0C0C0]/20 flex items-center justify-center">
                                                    <span className="text-xs font-bold text-[#C0C0C0]">{String(index + 1).padStart(2, '0')}</span>
                                                </div>
                                                <span className="text-base text-gray-300 pt-1">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Process */}
                            {process.length > 0 && (
                                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-12 backdrop-blur-sm">
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-[#C0C0C0]"></div>
                                        <h3 className="text-2xl font-bold text-white">Our Process</h3>
                                    </div>
                                    <ol className="space-y-4">
                                        {process.map((step: any, index: number) => (
                                            <li key={index} className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#C0C0C0]/10 to-transparent border border-[#C0C0C0]/20 flex items-center justify-center">
                                                    <span className="text-xs font-bold text-[#C0C0C0]">{String(step.step || index + 1).padStart(2, '0')}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-white font-semibold mb-1">{step.title || step}</div>
                                                    {step.description && <div className="text-sm text-gray-400">{step.description}</div>}
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Features Grid */}
            {features.length > 0 && (
                <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center mb-12">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-5 py-2 backdrop-blur-sm mx-auto">
                                <HiSparkles className="text-[#C0C0C0]" />
                                <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">FEATURES</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                                Powerful Capabilities
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Discover what makes our {serviceObj.title.toLowerCase()} solution stand out
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature: any, index: number) => (
                                <div
                                    key={index}
                                    className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#C0C0C0]/30 hover:from-white/10"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C0C0C0]/20 to-transparent border border-[#C0C0C0]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <HiLightningBolt className="text-2xl text-[#C0C0C0]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Benefits Section */}
            {benefits.length > 0 && (
                <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                            <div>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-5 py-2 backdrop-blur-sm">
                                    <HiChartBar className="text-[#C0C0C0]" />
                                    <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">BENEFITS</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                                    Why Choose Our {serviceObj.title}?
                                </h2>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    Experience the advantages that set us apart and drive real results.
                                </p>
                                <div className="space-y-4">
                                    {benefits.map((benefit: string, index: number) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#C0C0C0]/10 to-transparent border border-[#C0C0C0]/20 flex items-center justify-center mt-1">
                                                <HiCheckCircle className="text-[#C0C0C0]" />
                                            </div>
                                            <span className="text-gray-300 leading-relaxed">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#C0C0C0]/10 via-transparent to-transparent"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <HiShieldCheck className="text-8xl text-[#C0C0C0]/30 mx-auto mb-4" />
                                            <p className="text-white font-bold text-xl">Trusted Solution</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Case Studies / Results */}
            {caseStudies.length > 0 && (
                <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center mb-12">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-5 py-2 backdrop-blur-sm mx-auto">
                                <HiChartBar className="text-[#C0C0C0]" />
                                <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">RESULTS</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                                Proven Impact
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Real results from clients who trusted us
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {caseStudies.map((study: any, index: number) => (
                                <div
                                    key={index}
                                    className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-sm hover:border-[#C0C0C0]/30 transition-all duration-300"
                                >
                                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white mb-3">
                                        {study.metric}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{study.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{study.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQs Section */}
            {faqs.length > 0 && (
                <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
                    <div className="mx-auto max-w-4xl">
                        <div className="text-center mb-12">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-5 py-2 backdrop-blur-sm mx-auto">
                                <HiQuestionMarkCircle className="text-[#C0C0C0]" />
                                <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">FAQ</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-gray-400">
                                Everything you need to know about our {serviceObj.title.toLowerCase()} services
                            </p>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq: any, index: number) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm"
                                >
                                    <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                                        <HiQuestionMarkCircle className="text-[#C0C0C0] mt-1 flex-shrink-0" />
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed ml-8">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Quote Form Section */}
            <section id="quote-form" className="relative w-full px-4 sm:px-6 py-12 md:py-20">
                <div className="mx-auto max-w-4xl">
                    <QuoteForm serviceId={serviceObj._id.toString()} serviceName={serviceObj.title} />
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Transform Your{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
                            Business?
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                        Let's discuss how our {serviceObj.title.toLowerCase()} services can help you achieve your goals and drive growth.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="#quote-form"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#C0C0C0] to-white text-black font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(192,192,192,0.3)] hover:scale-105"
                        >
                            Get Started Today
                            <HiArrowRight className="text-lg" />
                        </Link>
                        <Link
                            href="/projects"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#C0C0C0]/30 text-white font-semibold bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#C0C0C0]/50 hover:bg-[#C0C0C0]/10"
                        >
                            View Our Work
                        </Link>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
    </>
    );
}
