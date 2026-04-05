'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi';

export default function NewServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    tagline: '',
    longDescription: '',
    imageSrc: '',
    highlights: [] as string[],
    features: [] as { title: string; description: string; icon: string }[],
    benefits: [] as string[],
    deliverables: [] as string[],
    process: [] as { step: number; title: string; description: string }[],
    caseStudies: [] as { title: string; metric: string; description: string }[],
    faqs: [] as { question: string; answer: string }[],
    sections: [] as { title: string; content: string[]; type: string }[],
    isActive: true,
  });
  const [newHighlight, setNewHighlight] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [newDeliverable, setNewDeliverable] = useState('');
  const [newFeature, setNewFeature] = useState({ title: '', description: '' });
  const [newProcess, setNewProcess] = useState({ title: '', description: '' });
  const [newCaseStudy, setNewCaseStudy] = useState({ title: '', metric: '', description: '' });
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/services');
      }
    } catch (error) {
      console.error('Error creating service:', error);
    } finally {
      setLoading(false);
    }
  };

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setFormData({ ...formData, highlights: [...formData.highlights, newHighlight.trim()] });
      setNewHighlight('');
    }
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData({ ...formData, benefits: [...formData.benefits, newBenefit.trim()] });
      setNewBenefit('');
    }
  };

  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      setFormData({ ...formData, deliverables: [...formData.deliverables, newDeliverable.trim()] });
      setNewDeliverable('');
    }
  };

  const addFeature = () => {
    if (newFeature.title.trim() && newFeature.description.trim()) {
      setFormData({ 
        ...formData, 
        features: [...formData.features, { ...newFeature, icon: '' }] 
      });
      setNewFeature({ title: '', description: '' });
    }
  };

  const addProcess = () => {
    if (newProcess.title.trim()) {
      setFormData({ 
        ...formData, 
        process: [...formData.process, { 
          step: formData.process.length + 1,
          title: newProcess.title,
          description: newProcess.description 
        }] 
      });
      setNewProcess({ title: '', description: '' });
    }
  };

  const addCaseStudy = () => {
    if (newCaseStudy.title.trim() && newCaseStudy.metric.trim()) {
      setFormData({ 
        ...formData, 
        caseStudies: [...formData.caseStudies, newCaseStudy] 
      });
      setNewCaseStudy({ title: '', metric: '', description: '' });
    }
  };

  const addFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      setFormData({ 
        ...formData, 
        faqs: [...formData.faqs, newFaq] 
      });
      setNewFaq({ question: '', answer: '' });
    }
  };

  const removeItem = (array: string[], index: number, field: string) => {
    const updated = array.filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updated });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();
      if (data.success) {
        setFormData({ ...formData, imageSrc: data.url });
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
          <HiArrowLeft className="text-xl text-white" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">New Service</h1>
          <p className="text-gray-400">Add a new service offering</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
          
          <div>
            <label className="block text-gray-300 text-sm mb-2">Title</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" required />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Slug</label>
            <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" required placeholder="software-development" />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" required />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Tagline</label>
            <input type="text" value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="Build. Scale. Innovate." />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Long Description</label>
            <textarea value={formData.longDescription} onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })} rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Service Image</label>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:border-[#C0C0C0]/50 transition-all duration-300 flex items-center justify-center gap-2">
                    {uploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Choose Image
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
              {formData.imageSrc && (
                <div className="relative rounded-lg overflow-hidden border border-white/10">
                  <img src={formData.imageSrc} alt="Preview" className="w-full h-48 object-cover" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, imageSrc: '' })}
                    className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              )}
              <p className="text-xs text-gray-500">Upload a high-quality image (JPG, PNG, WebP, max 5MB)</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Highlights</h2>
          <div className="flex gap-2 mb-3">
            <input type="text" value={newHighlight} onChange={(e) => setNewHighlight(e.target.value)}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="Add highlight..." />
            <button type="button" onClick={addHighlight} className="px-6 py-3 bg-[#C0C0C0]/20 text-white rounded-lg hover:bg-[#C0C0C0]/30">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.highlights.map((item, index) => (
              <span key={index} className="px-3 py-1 rounded-full bg-[#C0C0C0]/20 text-white text-sm flex items-center gap-2">
                {item}
                <button type="button" onClick={() => removeItem(formData.highlights, index, 'highlights')} className="text-red-400 hover:text-red-300">×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Benefits</h2>
          <div className="flex gap-2 mb-3">
            <input type="text" value={newBenefit} onChange={(e) => setNewBenefit(e.target.value)}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="Add benefit..." />
            <button type="button" onClick={addBenefit} className="px-6 py-3 bg-[#C0C0C0]/20 text-white rounded-lg hover:bg-[#C0C0C0]/30">Add</button>
          </div>
          <div className="space-y-2">
            {formData.benefits.map((item, index) => (
              <div key={index} className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5">
                <span className="text-green-400">✓</span>
                <span className="text-white flex-1">{item}</span>
                <button type="button" onClick={() => removeItem(formData.benefits, index, 'benefits')} className="text-red-400 hover:text-red-300">×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Features</h2>
          <div className="space-y-2 mb-3">
            <input type="text" value={newFeature.title} onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="Feature title..." />
            <textarea value={newFeature.description} onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })} rows={2}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="Feature description..." />
            <button type="button" onClick={addFeature} className="w-full px-6 py-3 bg-[#C0C0C0]/20 text-white rounded-lg hover:bg-[#C0C0C0]/30">Add Feature</button>
          </div>
          <div className="space-y-2">
            {formData.features.map((feature, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5">
                <div className="text-white font-semibold mb-1">{feature.title}</div>
                <div className="text-gray-400 text-sm mb-2">{feature.description}</div>
                <button type="button" onClick={() => {
                  const updated = formData.features.filter((_, i) => i !== index);
                  setFormData({ ...formData, features: updated });
                }} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Deliverables</h2>
          <div className="flex gap-2 mb-3">
            <input type="text" value={newDeliverable} onChange={(e) => setNewDeliverable(e.target.value)}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="Add deliverable..." />
            <button type="button" onClick={addDeliverable} className="px-6 py-3 bg-[#C0C0C0]/20 text-white rounded-lg hover:bg-[#C0C0C0]/30">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.deliverables.map((item, index) => (
              <span key={index} className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm flex items-center gap-2">
                {item}
                <button type="button" onClick={() => removeItem(formData.deliverables, index, 'deliverables')} className="text-red-400 hover:text-red-300">×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Process Steps</h2>
          <div className="space-y-2 mb-3">
            <input type="text" value={newProcess.title} onChange={(e) => setNewProcess({ ...newProcess, title: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="Step title..." />
            <textarea value={newProcess.description} onChange={(e) => setNewProcess({ ...newProcess, description: e.target.value })} rows={2}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="Step description..." />
            <button type="button" onClick={addProcess} className="w-full px-6 py-3 bg-[#C0C0C0]/20 text-white rounded-lg hover:bg-[#C0C0C0]/30">Add Step</button>
          </div>
          <div className="space-y-2">
            {formData.process.map((step, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#C0C0C0] font-bold">{step.step}.</span>
                  <span className="text-white font-semibold">{step.title}</span>
                  <button type="button" onClick={() => {
                    const updated = formData.process.filter((_, i) => i !== index);
                    setFormData({ ...formData, process: updated });
                  }} className="text-red-400 hover:text-red-300 ml-auto">×</button>
                </div>
                {step.description && <div className="text-gray-400 text-sm ml-6">{step.description}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Case Studies / Results</h2>
          <div className="space-y-2 mb-3">
            <input type="text" value={newCaseStudy.metric} onChange={(e) => setNewCaseStudy({ ...newCaseStudy, metric: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="Metric (e.g., 150% ROI)..." />
            <input type="text" value={newCaseStudy.title} onChange={(e) => setNewCaseStudy({ ...newCaseStudy, title: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="Case study title..." />
            <textarea value={newCaseStudy.description} onChange={(e) => setNewCaseStudy({ ...newCaseStudy, description: e.target.value })} rows={2}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="Description..." />
            <button type="button" onClick={addCaseStudy} className="w-full px-6 py-3 bg-[#C0C0C0]/20 text-white rounded-lg hover:bg-[#C0C0C0]/30">Add Case Study</button>
          </div>
          <div className="space-y-2">
            {formData.caseStudies.map((study, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5">
                <div className="text-2xl font-bold text-[#C0C0C0] mb-1">{study.metric}</div>
                <div className="text-white font-semibold mb-1">{study.title}</div>
                <div className="text-gray-400 text-sm mb-2">{study.description}</div>
                <button type="button" onClick={() => {
                  const updated = formData.caseStudies.filter((_, i) => i !== index);
                  setFormData({ ...formData, caseStudies: updated });
                }} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-2 mb-3">
            <input type="text" value={newFaq.question} onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="Question..." />
            <textarea value={newFaq.answer} onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })} rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="Answer..." />
            <button type="button" onClick={addFaq} className="w-full px-6 py-3 bg-[#C0C0C0]/20 text-white rounded-lg hover:bg-[#C0C0C0]/30">Add FAQ</button>
          </div>
          <div className="space-y-2">
            {formData.faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5">
                <div className="text-white font-semibold mb-2">Q: {faq.question}</div>
                <div className="text-gray-400 text-sm mb-2">A: {faq.answer}</div>
                <button type="button" onClick={() => {
                  const updated = formData.faqs.filter((_, i) => i !== index);
                  setFormData({ ...formData, faqs: updated });
                }} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button type="button" onClick={() => router.back()} className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="flex-1 px-6 py-3 bg-gradient-to-r from-[#C0C0C0] to-gray-400 text-black font-semibold rounded-lg disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Service'}
          </button>
        </div>
      </form>
    </div>
  );
}
