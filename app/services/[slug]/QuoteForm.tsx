'use client';

import { useState } from 'react';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi';

interface QuoteFormProps {
  serviceId: string;
  serviceName: string;
}

export default function QuoteForm({ serviceId, serviceName }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: serviceName,
          serviceId: serviceId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            company: '',
            phone: '',
            message: '',
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
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 sm:p-10 md:p-16 backdrop-blur-sm">
        <div className="text-center animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#C0C0C0]/20 to-transparent border border-[#C0C0C0]/30 mb-6 mx-auto">
            <HiCheckCircle className="text-5xl text-[#C0C0C0]" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">Request Submitted!</h3>
          <p className="text-gray-400 mb-6">
            Thank you for your interest in our {serviceName} services. We'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 sm:p-10 md:p-16 backdrop-blur-sm">
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5 px-5 py-2 backdrop-blur-sm">
          <div className="h-2 w-2 rounded-full bg-[#C0C0C0] animate-pulse"></div>
          <span className="text-xs font-medium tracking-widest text-[#C0C0C0]">GET A QUOTE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Let's Build Something{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0C0C0] to-white">
            Amazing
          </span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Fill out the form below and we'll get back to you with a detailed proposal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
              FIRST NAME *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="John"
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-[#C0C0C0]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
              LAST NAME *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Doe"
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-[#C0C0C0]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
              EMAIL *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@company.com"
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-[#C0C0C0]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
              COMPANY
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-[#C0C0C0]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
            PHONE
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-[#C0C0C0]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold tracking-wider text-gray-300">
            MESSAGE *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
            placeholder="Tell us about your project requirements..."
            className="w-full resize-none rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-[#C0C0C0]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#C0C0C0] to-white px-8 py-4 text-sm font-bold tracking-widest text-black shadow-lg transition-all duration-500 hover:shadow-[0_0_40px_rgba(192,192,192,0.4)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                SENDING...
              </>
            ) : (
              <>
                SEND REQUEST
                <HiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
}
