'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  HiMail, 
  HiPhone, 
  HiLocationMarker,
  HiClock,
  HiArrowRight,
  HiCheckCircle,
  HiUser,
  HiOfficeBuilding
} from 'react-icons/hi';

const contactInfo = [
  {
    icon: HiMail,
    title: "Email Us",
    details: ["hello@barrwit.com", "support@barrwit.com"],
    link: "mailto:hello@barrwit.com",
    description: "We'll respond within 24 hours"
  },
  {
    icon: HiPhone,
    title: "Call Us",
    details: ["+1 (234) 567-890", "+1 (234) 567-891"],
    link: "tel:+1234567890",
    description: "Mon-Fri from 9am to 6pm EST"
  },
  {
    icon: HiLocationMarker,
    title: "Visit Us",
    details: ["123 Business Avenue", "New York, NY 10001"],
    link: "#",
    description: "Global headquarters"
  },
  {
    icon: HiClock,
    title: "Business Hours",
    details: ["Monday - Friday: 9AM - 6PM", "Saturday - Sunday: Closed"],
    link: "#",
    description: "EST Time Zone"
  }
];

const services = [
  "Software Development",
  "Investment Management",
  "Business Development",
  "Digital Transformation",
  "Strategic Consulting",
  "Other"
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        
        // Reset form after showing success message
        setTimeout(() => {
          setIsSubmitted(false);
          setFormState({
            firstName: '',
            lastName: '',
            email: '',
            company: '',
            phone: '',
            service: '',
            budget: '',
            message: ''
          });
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="bg-black min-h-screen flex items-center justify-center px-4">
        <div data-gsap="hero" className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#C0C0C0]/20 to-transparent border border-[#C0C0C0]/30 mb-6">
            <HiCheckCircle className="text-5xl text-[#C0C0C0]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Message Sent Successfully!
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-6">
            Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
          </p>
          <p className="text-sm text-gray-500">
            We appreciate your interest in Barrwit International.
          </p>
        </div>
      </main>
    );
  }

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
              <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">CONTACT US</span>
            </div>
            <h1 data-gsap-item className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
              Let's Start a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
                Conversation
              </span>
            </h1>
            <p data-gsap-item className="mx-auto max-w-3xl text-lg sm:text-xl text-gray-400 leading-relaxed">
              Ready to transform your business? Get in touch with our team and discover how we can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-gsap="grid" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <a
                  key={index}
                  data-gsap-item
                  href={info.link}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm transition-all duration-500 hover:border-[#C0C0C0]/30 hover:bg-[#C0C0C0]/5 md:hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C0C0C0]/0 to-[#C0C0C0]/0 opacity-0 transition-opacity duration-500 group-hover:from-[#C0C0C0]/10 group-hover:to-transparent group-hover:opacity-100"></div>
                  <div className="relative">
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#C0C0C0]/10 to-transparent border border-[#C0C0C0]/20">
                      <IconComponent className="text-xl text-[#C0C0C0]" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-gray-300 mb-1">{detail}</p>
                    ))}
                    <p className="text-xs text-gray-500 mt-3">{info.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-gsap="grid" className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div data-gsap-item className="lg:col-span-3">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-12 backdrop-blur-sm">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Send Us a Message</h2>
                  <p className="text-gray-400">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
                        FIRST NAME *
                      </label>
                      <div className="relative">
                        <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formState.firstName}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-white/20 bg-white/5 pl-11 pr-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-[#C0C0C0]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20"
                          placeholder="John"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lastName" className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
                        LAST NAME *
                      </label>
                      <div className="relative">
                        <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formState.lastName}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-white/20 bg-white/5 pl-11 pr-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-[#C0C0C0]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
                        EMAIL *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-[#C0C0C0]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
                        PHONE
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-[#C0C0C0]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20"
                        placeholder="+1 (234) 567-890"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
                      COMPANY
                    </label>
                    <div className="relative">
                      <HiOfficeBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-white/20 bg-white/5 pl-11 pr-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-[#C0C0C0]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20"
                        placeholder="Your Company Inc."
                      />
                    </div>
                  </div>

                  {/* Service Interested In */}
                  <div>
                    <label htmlFor="service" className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
                      SERVICE INTERESTED IN *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white backdrop-blur-sm transition-all duration-300 focus:border-[#C0C0C0]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-black">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service} className="bg-black">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label htmlFor="budget" className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
                      BUDGET RANGE
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white backdrop-blur-sm transition-all duration-300 focus:border-[#C0C0C0]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-black">Select budget range</option>
                      <option value="10k-25k" className="bg-black">$10,000 - $25,000</option>
                      <option value="25k-50k" className="bg-black">$25,000 - $50,000</option>
                      <option value="50k-100k" className="bg-black">$50,000 - $100,000</option>
                      <option value="100k-250k" className="bg-black">$100,000 - $250,000</option>
                      <option value="250k+" className="bg-black">$250,000+</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
                      MESSAGE *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-[#C0C0C0]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20 resize-none"
                      placeholder="Tell us about your project, goals, and how we can help..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#C0C0C0] to-white px-8 py-4 text-sm font-bold tracking-widest text-black shadow-lg transition-all duration-500 hover:shadow-[0_0_40px_rgba(192,192,192,0.4)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          SENDING...
                        </>
                      ) : (
                        <>
                          SEND MESSAGE
                          <HiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div data-gsap-item className="lg:col-span-2 space-y-6">
              {/* Quick Contact */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4">Why Choose Barrwit?</h3>
                <ul className="space-y-4">
                  {[
                    "15+ years of industry experience",
                    "200+ satisfied global clients",
                    "Expert team across multiple domains",
                    "Proven track record of success",
                    "Personalized approach to every project",
                    "24/7 dedicated support"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <HiCheckCircle className="text-[#C0C0C0] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response Time */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <HiClock className="text-2xl text-[#C0C0C0]" />
                  <h3 className="text-xl font-bold text-white">Response Time</h3>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  We typically respond to all inquiries within <span className="text-[#C0C0C0] font-semibold">24 hours</span> during business days.
                </p>
                <p className="text-xs text-gray-500">
                  For urgent matters, please call us directly at +1 (234) 567-890
                </p>
              </div>

              {/* Social Proof */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4">Trusted By Industry Leaders</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-[#C0C0C0] mb-1">
                      98%
                    </div>
                    <div className="text-xs text-gray-400">Client Satisfaction</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-[#C0C0C0] mb-1">
                      150+
                    </div>
                    <div className="text-xs text-gray-400">Projects Delivered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional - placeholder) */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-gsap="copy" className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-12 backdrop-blur-sm">
            <div data-gsap="heading" className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Our Global Presence</h2>
              <p className="text-gray-400">Serving clients across 30+ countries worldwide</p>
            </div>
            
            {/* Placeholder for map - you can integrate Google Maps or similar */}
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
              <div className="text-center">
                <HiLocationMarker className="text-6xl text-[#C0C0C0] mx-auto mb-4" />
                <p className="text-lg text-gray-400">Interactive Map</p>
                <p className="text-sm text-gray-500 mt-2">123 Business Avenue, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full px-4 sm:px-6 py-12 md:pb-20">
        <div data-gsap="cta" className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Still Have{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
              Questions?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Browse our FAQ section or reach out directly. We're here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@barrwit.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#C0C0C0] to-white text-black font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(192,192,192,0.3)] hover:scale-105"
            >
              <HiMail className="text-lg" />
              Email Us Directly
            </a>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#C0C0C0]/30 text-white font-semibold bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#C0C0C0]/50 hover:bg-[#C0C0C0]/10"
            >
              <HiPhone className="text-lg" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
  );
}
