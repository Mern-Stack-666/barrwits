import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { 
  HiArrowRight,
  HiGlobe,
  HiCode,
  HiChartBar,
  HiLightningBolt,
  HiExternalLink
} from 'react-icons/hi';

const categories = ["All", "Software Development", "Business Development", "Investment Management"];

const iconMap: Record<string, any> = {
  'Software Development': HiCode,
  'Business Development': HiLightningBolt,
  'Investment Management': HiChartBar,
};

async function getProjects() {
  try {
    await dbConnect();
    const projects = await Project.find({ isActive: true }).sort({ createdAt: -1 });
    return projects.map(project => project.toObject());
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featuredProjects = projects.filter((p: any) => p.featured);
  const otherProjects = projects.filter((p: any) => !p.featured);

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
              <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">OUR PORTFOLIO</span>
            </div>
            <h1 data-gsap-item className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
              Success Stories That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
                Speak Volumes
              </span>
            </h1>
            <p data-gsap-item className="mx-auto max-w-3xl text-lg sm:text-xl text-gray-400 leading-relaxed">
              Explore our track record of transformative projects that have driven growth, innovation, and lasting impact for clients worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-gsap="heading" className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
                Projects
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              Our most impactful initiatives showcasing excellence across all service areas.
            </p>
          </div>

          <div data-gsap="grid" className="space-y-12">
            {featuredProjects.map((project: any, index: number) => {
              const IconComponent = iconMap[project.category] || HiGlobe;
              return (
                <div
                  key={project._id}
                  data-gsap-item
                  className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm transition-all duration-500 hover:border-[#C0C0C0]/30 ${
                    index % 2 === 0 ? 'lg:grid lg:grid-cols-2' : 'lg:grid lg:grid-cols-2 lg:direction-rtl'
                  }`}
                >
                  {/* Image */}
                  <div className={`relative aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:bg-gradient-to-r"></div>
                  </div>

                  {/* Content */}
                  <div className={`p-8 md:p-12 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C0C0C0]/10 to-transparent border border-[#C0C0C0]/20 flex items-center justify-center">
                        <IconComponent className="text-lg text-[#C0C0C0]" />
                      </div>
                      <span className="text-sm font-semibold text-[#C0C0C0] tracking-wide">{project.category}</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{project.title}</h3>
                    <p className="text-base text-gray-300 leading-relaxed mb-6">{project.description}</p>

                    {/* Results Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {project.results.map((result: any, idx: any) => (
                        <div key={idx}>
                          <div className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-[#C0C0C0] mb-1">
                            {result.metric}
                          </div>
                          <div className="text-xs text-gray-400">{result.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag: any, idx: any) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#C0C0C0] hover:text-white transition-colors group/link"
                    >
                      Discuss Similar Project
                      <HiArrowRight className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Projects with Filter */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-gsap="heading" className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
              All{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
                Projects
              </span>
            </h2>
          </div>

          {/* Projects Grid */}
          <div data-gsap="grid" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project: any) => {
              const IconComponent = iconMap[project.category] || HiGlobe;
              return (
                <div
                  key={project._id}
                  data-gsap-item
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm transition-all duration-500 hover:border-[#C0C0C0]/30 hover:shadow-[0_0_40px_rgba(192,192,192,0.1)]"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <IconComponent className="text-sm text-[#C0C0C0]" />
                      <span className="text-xs font-semibold text-[#C0C0C0] tracking-wide">{project.category}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">{project.description}</p>

                    {/* Key Metric */}
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-[#C0C0C0] mb-1">
                        {project.results[0].metric}
                      </div>
                      <div className="text-xs text-gray-400">{project.results[0].label}</div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag: any, idx: any) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#C0C0C0] hover:text-white transition-colors group/link"
                    >
                      Learn More
                      <HiArrowRight className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
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
          <div data-gsap="copy" className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-16 backdrop-blur-sm">
            <div data-gsap="heading" className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Our Impact{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
                  at a Glance
                </span>
              </h2>
            </div>

            <div data-gsap="grid" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div data-gsap-item className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-[#C0C0C0] mb-2">
                  150+
                </div>
                <div className="text-sm font-semibold text-white mb-1">Projects Completed</div>
                <div className="text-xs text-gray-400">Across all sectors</div>
              </div>

              <div data-gsap-item className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-[#C0C0C0] mb-2">
                  95%
                </div>
                <div className="text-sm font-semibold text-white mb-1">Client Retention</div>
                <div className="text-xs text-gray-400">Long-term partnerships</div>
              </div>

              <div data-gsap-item className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-[#C0C0C0] mb-2">
                  $3B+
                </div>
                <div className="text-sm font-semibold text-white mb-1">Value Created</div>
                <div className="text-xs text-gray-400">For our clients</div>
              </div>

              <div data-gsap-item className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-[#C0C0C0] mb-2">
                  30+
                </div>
                <div className="text-sm font-semibold text-white mb-1">Countries Served</div>
                <div className="text-xs text-gray-400">Global presence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div data-gsap="cta" className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Create Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
              Success Story?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can bring the same level of excellence and innovation to your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#C0C0C0] to-white text-black font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(192,192,192,0.3)] hover:scale-105"
            >
              Start Your Project
              <HiArrowRight className="text-lg" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#C0C0C0]/30 text-white font-semibold bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#C0C0C0]/50 hover:bg-[#C0C0C0]/10"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
  );
}
