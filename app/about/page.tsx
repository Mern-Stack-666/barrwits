'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  HiTrendingUp, 
  HiUserGroup, 
  HiCurrencyDollar, 
  HiStar,
  HiLightningBolt,
  HiShieldCheck,
  HiGlobe,
  HiChartBar,
  HiOfficeBuilding,
  HiUsers,
  HiSparkles,
  HiArrowRight
} from 'react-icons/hi';

const stats = [
  {
    icon: HiTrendingUp,
    value: "15+",
    label: "Years of Excellence",
    description: "Industry leadership"
  },
  {
    icon: HiUserGroup,
    value: "200+",
    label: "Global Clients",
    description: "Worldwide reach"
  },
  {
    icon: HiCurrencyDollar,
    value: "$2B+",
    label: "Assets Managed",
    description: "Financial expertise"
  },
  {
    icon: HiStar,
    value: "98%",
    label: "Client Satisfaction",
    description: "Proven results"
  }
];

const values = [
  {
    icon: HiLightningBolt,
    title: "Innovation First",
    description: "We embrace cutting-edge technologies and forward-thinking strategies to deliver solutions that keep you ahead of the curve."
  },
  {
    icon: HiShieldCheck,
    title: "Unwavering Integrity",
    description: "Trust is the foundation of every partnership. We operate with complete transparency and ethical excellence."
  },
  {
    icon: HiGlobe,
    title: "Global Perspective",
    description: "Our international experience and diverse team bring worldwide insights to every project we undertake."
  },
  {
    icon: HiChartBar,
    title: "Results Driven",
    description: "We measure success by the tangible impact we create—delivering measurable outcomes that exceed expectations."
  }
];

const milestones = [
  {
    year: "2009",
    title: "Foundation",
    description: "Barrwit International was established with a vision to revolutionize business consulting."
  },
  {
    year: "2012",
    title: "First Major Expansion",
    description: "Opened offices in three countries, serving clients across multiple continents."
  },
  {
    year: "2015",
    title: "Software Development Division",
    description: "Launched our technology arm to deliver custom software solutions."
  },
  {
    year: "2018",
    title: "Investment Management Launch",
    description: "Entered the financial sector with a focus on strategic investment management."
  },
  {
    year: "2021",
    title: "$1B Assets Milestone",
    description: "Surpassed one billion dollars in managed assets, marking a significant achievement."
  },
  {
    year: "2024",
    title: "Global Leadership",
    description: "Recognized as a top-tier consultancy with 200+ clients worldwide."
  }
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-black">
      {/* Hero Section */}
      <section
        className="relative w-full px-4 sm:px-6 pt-32 pb-16 md:pt-40 md:pb-24"
      >
        <div className="mx-auto max-w-7xl">
          <div data-gsap="hero" className="text-center">
            <div data-gsap-item className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-5 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-[#C0C0C0] animate-pulse"></div>
              <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">ABOUT BARRWIT INTERNATIONAL</span>
            </div>
            <h1 data-gsap-item className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
              Transforming Visions Into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
                Global Success
              </span>
            </h1>
            <p data-gsap-item className="mx-auto max-w-3xl text-lg sm:text-xl text-gray-400 leading-relaxed">
              For over 15 years, we've been at the forefront of innovation, delivering exceptional solutions in software development, investment management, and business development.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-gsap="copy" className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 sm:p-10 md:p-16 backdrop-blur-sm">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Image */}
              <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/hero-visual.png"
                    alt="Barrwit International Office"
                    fill
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70"></div>
                </div>
                <div className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <div className="text-sm font-bold tracking-wide text-white">Barrwit International</div>
                    <div className="text-xs text-gray-400">Global Headquarters</div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-[#C0C0C0]"></div>
                </div>
              </div>

              {/* Story Content */}
              <div className="flex flex-col justify-center">
                <h2 className="mb-6 text-3xl sm:text-4xl font-bold text-white">Our Story</h2>
                <div className="space-y-5 text-base sm:text-lg leading-relaxed text-gray-300">
                  <p>
                    Founded over 15 years ago, Barrwit International has grown from a boutique consultancy to a global powerhouse in software development, investment management, and business development.
                  </p>
                  <p>
                    Our journey has been defined by one constant: an unwavering commitment to delivering exceptional value to our clients. We combine deep industry expertise with cutting-edge innovation to solve the most complex business challenges.
                  </p>
                  <p>
                    Today, we serve over 200 clients worldwide, managing billions in assets and driving transformative growth across industries. Our success is built on lasting partnerships, innovative solutions, and a relentless pursuit of excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-gsap="grid" className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <div data-gsap-item className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-12 backdrop-blur-sm transition-all duration-500 hover:border-[#C0C0C0]/30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#C0C0C0]/5 to-transparent rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C0C0C0]/10 to-transparent border border-[#C0C0C0]/20">
                  <HiSparkles className="text-2xl text-[#C0C0C0]" />
                </div>
                <h3 className="mb-4 text-2xl sm:text-3xl font-bold text-white">Our Mission</h3>
                <p className="text-base sm:text-lg leading-relaxed text-gray-300">
                  To empower businesses worldwide with innovative solutions, strategic insights, and exceptional service that drive sustainable growth and lasting success. We transform challenges into opportunities and visions into reality.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div data-gsap-item className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-12 backdrop-blur-sm transition-all duration-500 hover:border-[#C0C0C0]/30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#C0C0C0]/5 to-transparent rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C0C0C0]/10 to-transparent border border-[#C0C0C0]/20">
                  <HiTrendingUp className="text-2xl text-[#C0C0C0]" />
                </div>
                <h3 className="mb-4 text-2xl sm:text-3xl font-bold text-white">Our Vision</h3>
                <p className="text-base sm:text-lg leading-relaxed text-gray-300">
                  To be the global leader in integrated business solutions, setting the standard for excellence in software development, investment management, and business development. We envision a future where innovation drives prosperity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-gsap="heading" className="mb-12 md:mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-4 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-[#C0C0C0] animate-pulse"></div>
              <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">OUR VALUES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              What Drives Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
                Excellence
              </span>
            </h2>
          </div>

          <div data-gsap="grid" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  data-gsap-item
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 md:p-8 backdrop-blur-sm transition-all duration-500 hover:border-[#C0C0C0]/30 hover:bg-[#C0C0C0]/5 md:hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C0C0C0]/0 to-[#C0C0C0]/0 opacity-0 transition-opacity duration-500 group-hover:from-[#C0C0C0]/10 group-hover:to-transparent group-hover:opacity-100"></div>
                  <div className="relative">
                    <IconComponent className="mb-4 text-3xl text-[#C0C0C0] transition-transform duration-500 group-hover:scale-110" />
                    <h3 className="mb-3 text-lg font-bold text-white">{value.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-gsap="heading" className="mb-12 md:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Our Impact in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
                Numbers
              </span>
            </h2>
          </div>

          <div data-gsap="grid" className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  data-gsap-item
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 md:p-8 backdrop-blur-sm transition-all duration-500 hover:border-[#C0C0C0]/30 hover:bg-[#C0C0C0]/5 md:hover:scale-105 hover:shadow-[0_0_40px_rgba(192,192,192,0.15)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C0C0C0]/0 to-[#C0C0C0]/0 opacity-0 transition-opacity duration-500 group-hover:from-[#C0C0C0]/10 group-hover:to-transparent group-hover:opacity-100"></div>
                  <div className="relative">
                    <IconComponent className="mb-4 text-3xl sm:text-4xl text-[#C0C0C0] transition-transform duration-500 group-hover:scale-110" />
                    <div className="mb-2 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-[#C0C0C0]">
                      {stat.value}
                    </div>
                    <div className="mb-1 text-sm font-semibold tracking-wide text-white">
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {stat.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div data-gsap="heading" className="mb-12 md:mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-4 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-[#C0C0C0] animate-pulse"></div>
              <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">OUR JOURNEY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Key{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
                Milestones
              </span>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-px bg-gradient-to-b from-[#C0C0C0]/20 via-[#C0C0C0]/40 to-[#C0C0C0]/20"></div>

            {/* Timeline Items */}
            <div data-gsap="grid" className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  data-gsap-item
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm transition-all duration-500 hover:border-[#C0C0C0]/30">
                      <div className="text-sm font-bold text-[#C0C0C0] mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#C0C0C0] border-4 border-black z-10"></div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-gsap="heading" className="mb-12 md:mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-4 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-[#C0C0C0] animate-pulse"></div>
              <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">OUR PEOPLE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
                Leadership
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-400">
              Our diverse team of experts brings together decades of experience across technology, finance, and business strategy.
            </p>
          </div>

          <div data-gsap="grid" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                data-gsap-item
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm transition-all duration-500 hover:border-[#C0C0C0]/30"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src="/hero-visual.png"
                    alt={`Team Member ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">Leadership Name</h3>
                  <p className="text-sm text-[#C0C0C0] mb-3">Chief Executive Officer</p>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#C0C0C0]/20 transition-colors cursor-pointer">
                      <span className="text-xs text-white">in</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#C0C0C0]/20 transition-colors cursor-pointer">
                      <span className="text-xs text-white">@</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-gsap="copy" className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 sm:p-12 md:p-16 backdrop-blur-sm">
            <div data-gsap="heading" className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                What Sets Us{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
                  Apart
                </span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C0C0C0]/10 to-transparent border border-[#C0C0C0]/20 flex items-center justify-center">
                    <HiOfficeBuilding className="text-xl text-[#C0C0C0]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Integrated Solutions</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">We offer a unique combination of technology, finance, and business expertise under one roof.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C0C0C0]/10 to-transparent border border-[#C0C0C0]/20 flex items-center justify-center">
                    <HiUsers className="text-xl text-[#C0C0C0]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Client-Centric Approach</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">Every solution is tailored to meet your specific needs and objectives with personalized attention.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C0C0C0]/10 to-transparent border border-[#C0C0C0]/20 flex items-center justify-center">
                    <HiGlobe className="text-xl text-[#C0C0C0]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Global Network</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">Access to our extensive network of partners, investors, and industry leaders worldwide.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div data-gsap="cta" className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
              Business?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful clients who have partnered with Barrwit International to achieve extraordinary results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#C0C0C0] to-white text-black font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(192,192,192,0.3)] hover:scale-105"
            >
              Explore Our Services
              <HiArrowRight className="text-lg" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#C0C0C0]/30 text-white font-semibold bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#C0C0C0]/50 hover:bg-[#C0C0C0]/10"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
  );
}
