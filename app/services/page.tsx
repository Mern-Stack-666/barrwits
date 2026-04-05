import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { 
  HiArrowRight,
  HiCode,
  HiChartBar,
  HiLightningBolt,
  HiGlobe,
  HiCheckCircle
} from 'react-icons/hi';

const iconMap: Record<string, any> = {
  'software-development': HiCode,
  'investment-management': HiChartBar,
  'business-development': HiLightningBolt,
  'digital-transformation': HiGlobe
};

const benefits = [
  "Tailored solutions for your unique challenges",
  "Expert team with 15+ years of experience",
  "Proven track record with 200+ global clients",
  "End-to-end support from strategy to execution",
  "Measurable results and transparent reporting",
  "Scalable solutions that grow with your business"
];

async function getServices() {
  try {
    await dbConnect();
    const services = await Service.find({ isActive: true }).sort({ createdAt: -1 });
    return services.map(service => service.toObject());
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Header />
      <main className="bg-black">
      {/* Hero Section */}
      <section
        className="relative w-full px-4 sm:px-6 pt-32 pb-16 md:pt-40 md:pb-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center animate-fade-in-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-5 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-[#C0C0C0] animate-pulse"></div>
              <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">OUR SERVICES</span>
            </div>
            <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
              Solutions That Drive{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
                Real Results
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg sm:text-xl text-gray-400 leading-relaxed">
              Comprehensive services designed to accelerate your growth, optimize operations, and transform your business for the future.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-8">
            {services.map((service: any, index: number) => {
              const IconComponent = iconMap[service.slug] || HiCode;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`group block relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm transition-all duration-500 hover:border-[#C0C0C0]/30 hover:shadow-[0_0_40px_rgba(192,192,192,0.1)] ${
                    index % 2 === 0 ? 'lg:grid lg:grid-cols-2' : 'lg:grid lg:grid-cols-2 lg:direction-rtl'
                  }`}
                >
                  {/* Content */}
                  <div className={`p-8 md:p-12 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C0C0C0]/10 to-transparent border border-[#C0C0C0]/20 flex items-center justify-center">
                        <IconComponent className="text-xl text-[#C0C0C0]" />
                      </div>
                      <span className="text-sm font-semibold text-[#C0C0C0] tracking-wide uppercase">
                        {service.slug.replace(/-/g, ' ')}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C0C0C0] group-hover:to-white transition-all duration-300">
                      {service.title}
                    </h2>

                    <p className="text-base text-gray-300 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.highlights.map((highlight: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300 group-hover:border-[#C0C0C0]/20 group-hover:bg-[#C0C0C0]/5 transition-all duration-300"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Learn More Link */}
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#C0C0C0] group-hover:text-white transition-colors">
                      Learn More
                      <HiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`relative aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    <Image
                      src={service.imageSrc}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:bg-gradient-to-r"></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-16 backdrop-blur-sm">
            <div className="text-center mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-4 py-2 backdrop-blur-sm">
                <div className="h-2 w-2 rounded-full bg-[#C0C0C0] animate-pulse"></div>
                <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">WHY CHOOSE US</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                The Barrwit{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
                  Advantage
                </span>
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C0C0C0]/20 transition-all duration-300"
                >
                  <HiCheckCircle className="text-[#C0C0C0] mt-0.5 flex-shrink-0 text-xl" />
                  <p className="text-sm text-gray-300 leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              How We{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
                Work
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our proven process ensures consistent results and clear communication at every stage.
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-px bg-gradient-to-b from-[#C0C0C0]/20 via-[#C0C0C0]/40 to-[#C0C0C0]/20 hidden md:block"></div>

            {/* Steps */}
            <div className="space-y-8 md:space-y-12">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description: "We start by understanding your goals, challenges, and requirements through in-depth consultation and analysis."
                },
                {
                  step: "02",
                  title: "Strategy",
                  description: "Our team develops a comprehensive plan tailored to your specific needs, with clear milestones and deliverables."
                },
                {
                  step: "03",
                  title: "Execution",
                  description: "We implement the solution with precision, maintaining transparent communication and iterative feedback throughout."
                },
                {
                  step: "04",
                  title: "Optimization",
                  description: "Post-launch, we monitor performance, gather insights, and continuously optimize to maximize your results."
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm transition-all duration-500 hover:border-[#C0C0C0]/30">
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#C0C0C0] to-white mb-2">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#C0C0C0] border-4 border-black z-10 hidden md:block"></div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
              Started?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can help transform your business and achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#C0C0C0] to-white text-black font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(192,192,192,0.3)] hover:scale-105"
            >
              Contact Us Today
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
