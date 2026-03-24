import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getServiceBySlug, services } from '../../data/services';

export function generateStaticParams() {
    return services.map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    const deliverables = service.deliverables ?? [];
    const process = service.process ?? [];
    const sections = service.sections ?? [];

    return (
        <main className="relative w-full bg-black">
            {/* Banner */}
            <section className="relative overflow-hidden px-4 sm:px-6 pt-28 md:pt-36 pb-10 md:pb-14">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#C0C0C0]/10 blur-[140px]"></div>
                </div>

                <div className="mx-auto max-w-6xl">
                    <div className="mb-6 flex items-center justify-between gap-4">
                        <Link
                            href="/#services"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold tracking-widest text-white transition-colors hover:border-[#C0C0C0]/30 hover:bg-white/10"
                        >
                            <span>BACK</span>
                        </Link>
                        <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-4 py-2 backdrop-blur-sm">
                            <div className="h-2 w-2 rounded-full bg-[#C0C0C0]"></div>
                            <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">SERVICE</span>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(192,192,192,0.12),transparent_55%)]"></div>
                        <div className="pointer-events-none absolute -bottom-36 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#C0C0C0]/10 blur-[160px]"></div>

                        <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-14">
                            <div>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-4 py-2 backdrop-blur-sm">
                                    <div className="h-2 w-2 rounded-full bg-[#C0C0C0]"></div>
                                    <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">{service.slug.replace(/-/g, ' ')}</span>
                                </div>

                                <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                                    {service.title}
                                </h1>

                                <p className="max-w-2xl text-base sm:text-lg text-gray-300 leading-relaxed">
                                    {service.tagline ?? service.description}
                                </p>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                    <Link
                                        href="/#contact"
                                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C0C0C0] to-[#8E8E8E] px-7 py-3.5 text-sm font-bold tracking-widest text-black transition-shadow hover:shadow-[0_0_40px_rgba(192,192,192,0.35)]"
                                    >
                                        START A PROJECT
                                    </Link>
                                    <Link
                                        href="/#contact"
                                        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold tracking-widest text-white transition-colors hover:border-[#C0C0C0]/50 hover:bg-[#C0C0C0]/10"
                                    >
                                        CONTACT US
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                                    <Image
                                        src={service.imageSrc}
                                        alt={service.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 560px"
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/80"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Details */}
            <section className="px-4 sm:px-6 pb-16 md:pb-24">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-10 grid gap-4 rounded-3xl bg-white/5 px-6 py-6 sm:grid-cols-3 sm:px-8">
                        <div>
                            <div className="text-xs font-bold tracking-widest text-white/50">DELIVERABLES</div>
                            <div className="mt-2 text-2xl font-bold text-white">{deliverables.length || 4}</div>
                            <div className="mt-1 text-xs text-gray-400">Clear, packaged outputs</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold tracking-widest text-white/50">PROCESS</div>
                            <div className="mt-2 text-2xl font-bold text-white">{process.length || 4}</div>
                            <div className="mt-1 text-xs text-gray-400">Structured execution steps</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold tracking-widest text-white/50">HIGHLIGHTS</div>
                            <div className="mt-2 text-2xl font-bold text-white">{service.highlights.length}</div>
                            <div className="mt-1 text-xs text-gray-400">Core capabilities</div>
                        </div>
                    </div>

                    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                        <div>
                            <div className="max-w-3xl">
                                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Overview</h2>
                                <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
                                    {service.longDescription ?? service.description}
                                </p>
                            </div>

                            {sections.length > 0 && (
                                <div className="mt-12">
                                    <div className="mb-6 flex items-center justify-between gap-6">
                                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Capabilities</h2>
                                        <div className="h-px w-24 bg-white/10"></div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        {sections.map((sec) => (
                                            <div key={sec.title} className="rounded-2xl bg-white/5 p-5 sm:p-6">
                                                <div className="flex items-center justify-between gap-4">
                                                    <h3 className="text-lg sm:text-xl font-bold text-white">{sec.title}</h3>
                                                    <div className="h-2 w-2 rounded-full bg-[#C0C0C0]"></div>
                                                </div>
                                                <ul className="mt-4 space-y-2">
                                                    {sec.content.map((item) => (
                                                        <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                                                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C0C0C0]"></span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-10">
                            <div>
                                <h3 className="text-xl font-bold text-white">Highlights</h3>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {service.highlights.map((item) => (
                                        <div
                                            key={item}
                                            className="inline-flex items-center rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {deliverables.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-white">Deliverables</h3>
                                    <ul className="mt-4 space-y-2">
                                        {deliverables.map((d) => (
                                            <li key={d} className="flex items-start gap-3 text-sm text-gray-300">
                                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C0C0C0]"></span>
                                                <span>{d}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {process.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-white">Process</h3>
                                    <ol className="mt-4 space-y-3">
                                        {process.map((step, idx) => (
                                            <li key={step} className="flex items-start gap-4">
                                                <div className="min-w-10 text-xs font-bold tracking-widest text-white/50">{String(idx + 1).padStart(2, '0')}</div>
                                                <div className="text-sm font-medium text-gray-200">{step}</div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CTA + Form */}
                    <div className="mt-14 relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent px-6 py-10 sm:px-10 sm:py-12">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(192,192,192,0.12),transparent_55%)]"></div>
                        <div className="pointer-events-none absolute -bottom-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#C0C0C0]/10 blur-[140px]"></div>

                        <div className="relative grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Get a quote for {service.title}</h2>
                                <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed">
                                    Tell us what you need. We will reply with next steps and a clear plan.
                                </p>
                            </div>

                            <form
                                action="mailto:hello@barrwit.com"
                                method="post"
                                encType="text/plain"
                                className="grid gap-3"
                            >
                                <input
                                    name="service"
                                    value={service.title}
                                    readOnly
                                    className="w-full rounded-2xl bg-black/40 px-4 py-3 text-sm text-white/80 outline-none"
                                />
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <input
                                        name="name"
                                        placeholder="Your name"
                                        className="w-full rounded-2xl bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none"
                                    />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        className="w-full rounded-2xl bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none"
                                    />
                                </div>
                                <textarea
                                    name="message"
                                    placeholder="Tell us about your project"
                                    rows={4}
                                    className="w-full resize-none rounded-2xl bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none"
                                />
                                <button
                                    type="submit"
                                    className="mt-1 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C0C0C0] to-[#8E8E8E] px-7 py-3.5 text-sm font-bold tracking-widest text-black transition-shadow hover:shadow-[0_0_40px_rgba(192,192,192,0.35)]"
                                >
                                    SEND REQUEST
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
