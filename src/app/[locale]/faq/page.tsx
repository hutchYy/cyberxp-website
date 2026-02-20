'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import content from '@/data/content.json';

export default function FAQPage() {
  const t = useTranslations();
  const faqs = content.faqs;

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="hero-gradient relative min-h-[400px] pt-[100px] flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-20">
          <Image src="/images/mDIvEXtY18ZeKV27B3MYvqdibIA.png" alt="" width={300} height={300} priority className="w-[300px] h-[300px]" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold text-white mb-4">{t('faqPage.title')}</h1>
          <p className="text-xl text-white/90">{t('faqPage.subtitle')}</p>
        </div>
      </div>

      {/* FAQ Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 p-8 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-black mb-4">{faq.q}</h3>
              <div className="w-full h-px bg-gray-200 mb-4" />
              <p className="text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
