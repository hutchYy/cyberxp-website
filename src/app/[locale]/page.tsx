'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/utm';
import content from '@/data/content.json';

export default function HomePage() {
  const t = useTranslations();
  const sponsors = content.sponsors;
  const quotes = content.quotes;
  const faqs = content.faqs;
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev + 1) % quotes.length);
  }, [quotes.length]);

  const prevTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev - 1 + quotes.length) % quotes.length);
  }, [quotes.length]);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  return (
    <div className="w-full bg-white">
      {/* ── Hero ── */}
      <section className="relative w-full min-h-[80vh] overflow-hidden flex items-center">
        <img src="/images/ACSVSU8pnh3frOWUrPpQOXvXA.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#35d5f1]/95 via-[#35d5f1]/80 to-[#1a3a5c]/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-24">
          <div className="max-w-[640px]">
            <h1 className="text-[2.2rem] md:text-[3.5rem] leading-[1.2] font-extrabold text-[#0a0d0b] mb-6" style={{ letterSpacing: '-2.5px' }}>
              {t('hero.title')}
            </h1>
            <p className="text-base text-[#0d1117] mb-10 max-w-xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <Link href="/book-your-event">
              <span className="inline-flex items-center gap-3 bg-[#0a0d0b] text-white px-7 py-3.5 rounded-[44px] hover:bg-gray-900 transition-all font-normal text-[1rem] cursor-pointer group">
                {t('hero.cta')}
                <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <ArrowRight size={16} className="text-black group-hover:translate-x-0.5 transition-transform" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Partners Bar (data-driven) ── */}
      <section className="bg-[#0a0a0a] py-6 md:py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <p className="text-white/50 text-sm font-medium whitespace-nowrap shrink-0">
            {t('partners.supportedBy')}
          </p>
          <div className="relative w-full overflow-hidden mask-gradient">
            <div className="flex animate-scroll-logos gap-12 items-center">
              {[...sponsors, ...sponsors].map((s, i) => (
                <img key={i} src={s.logo} alt={s.name} className="h-8 md:h-10 brightness-0 invert opacity-70 shrink-0" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What to Expect ── */}
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <p className="text-sm font-semibold text-black/50 mb-6 tracking-wide">{t('expect.label')}</p>
              <h2 className="text-[1.75rem] md:text-[2.5rem] leading-[1.15] font-extrabold text-black">{t('expect.title')}</h2>
            </div>
            <div className="flex items-start pt-8">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">{t('expect.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature 1: Case Studies ── */}
      <section className="bg-white pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h3 className="text-[1.75rem] md:text-[2.5rem] leading-[1.12] font-extrabold text-black mb-6">{t('features.caseStudies.title')}</h3>
              <p className="text-gray-600 text-base leading-relaxed">{t('features.caseStudies.description')}</p>
            </div>
            <div>
              <img src="/images/KD7dvx0TuFUojm9zQgQ1tiPdzn8.jpg" alt="Case Studies" className="w-full h-auto rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature 2: Coaching ── */}
      <section className="bg-white pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <img src="/images/9GjrDEGtPHn6adtz6YzwcmqTx8.jpg" alt="Coaching" className="w-full h-auto rounded-2xl object-cover" />
            </div>
            <div>
              <h3 className="text-[1.75rem] md:text-[2.5rem] leading-[1.12] font-extrabold text-black mb-6">{t('features.coaching.title')}</h3>
              <p className="text-gray-600 text-base leading-relaxed">{t('features.coaching.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-gradient-to-r from-[#7c3aed] via-[#4c1d95] to-[#0a0a0a] rounded-2xl px-8 md:px-16 py-8 md:py-10">
            <p className="text-white/50 text-sm mb-2">{t('contactCta.title')}</p>
            <h2 className="text-xl md:text-3xl font-bold text-white">{t('contactCta.subtitle')}</h2>
          </div>
        </div>
      </section>

      {/* ── Testimonials (data-driven) ── */}
      <section className="bg-white py-20 md:py-28 relative">
        <div className="max-w-5xl mx-auto px-6 md:px-16 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
            {t('testimonials.title')}
          </p>
          <h2 className="text-3xl md:text-[2.8rem] font-bold text-[#0a0d0b] leading-tight mb-16">
            What they are saying
          </h2>
          <div className="flex justify-center mb-8">
            <svg width="48" height="38" viewBox="0 0 60 48" fill="none">
              <path d="M0 48V28.8C0 20.267 1.867 13.333 5.6 8C9.467 2.667 15.2 0 22.8 0v9.6c-4.267 0-7.467 1.6-9.6 4.8-1.6 2.4-2.4 5.067-2.4 8h12V48H0zm36 0V28.8c0-8.533 1.867-15.467 5.6-20.8C45.467 2.667 51.2 0 58.8 0v9.6c-4.267 0-7.467 1.6-9.6 4.8-1.6 2.4-2.4 5.067-2.4 8H58.8V48H36z" fill="#35d5f1" opacity="0.7"/>
            </svg>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
              {quotes.map((q, i) => (
                <div key={i} className="w-full shrink-0 px-4">
                  <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 max-w-3xl mx-auto">{q.quote}</p>
                  <p className="text-base font-bold text-[#0a0d0b]">{q.name}{q.title ? `, ${q.title}` : ''}</p>
                  <p className="text-sm text-gray-400 mt-1">{q.org}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={prevTestimonial} className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <div className="flex gap-2">
              {quotes.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === activeTestimonial ? 'bg-[#35d5f1]' : 'bg-gray-300'}`} />
              ))}
            </div>
            <button onClick={nextTestimonial} className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ Preview (data-driven, first 4) ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {faqs.slice(0, 4).map((faq, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 p-8 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-black mb-4">{faq.q}</h3>
                <div className="w-full h-px bg-gray-200 mb-4" />
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/faq">
              <span className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors font-medium cursor-pointer">
                {t('faqPreview.browseFaq')}
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <ArrowRight size={14} className="text-black" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
