'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import Image from 'next/image';
import content from '@/data/content.json';

export default function ResourcesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const resources = (content.resources as Record<string, typeof content.resources.en>)[locale] ?? content.resources.en;
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [pendingTitle, setPendingTitle] = useState('');

  const handleCardClick = (url: string, title: string) => {
    if (!url) return;
    setPendingUrl(url);
    setPendingTitle(title);
  };

  const confirmNavigate = () => {
    if (pendingUrl) window.open(pendingUrl, '_blank', 'noopener,noreferrer');
    setPendingUrl(null);
    setPendingTitle('');
  };

  const cancelNavigate = () => {
    setPendingUrl(null);
    setPendingTitle('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="hero-gradient relative min-h-[400px] pt-[100px] flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-20">
          <Image src="/images/mDIvEXtY18ZeKV27B3MYvqdibIA.png" alt="" width={300} height={300} priority className="w-[300px] h-[300px]" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold text-white mb-4">{t('resourcesPage.title')}</h1>
          <p className="text-xl text-white/90">{t('resourcesPage.subtitle')}</p>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r, i) => (
            <button
              key={i}
              onClick={() => handleCardClick(r.url, r.title)}
              className="text-left rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow bg-white group cursor-pointer"
            >
              {/* Image */}
              <div className="h-48 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
                {r.picture ? (
                  <img src={r.picture} alt={r.title} className="max-w-full max-h-full object-contain" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#35d5f1]/20 to-[#7c3aed]/20 flex items-center justify-center rounded-lg">
                    <ExternalLink size={32} className="text-gray-300" />
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-5">
                <span className="inline-block text-xs font-semibold text-[#35d5f1] bg-[#35d5f1]/10 px-2.5 py-1 rounded-full mb-3">{r.category || 'Link'}</span>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#35d5f1] transition-colors line-clamp-2">{r.title}</h3>
                {r.description && <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-3">{r.description}</p>}
                {r.siteName && <p className="text-xs text-gray-400">{r.siteName}</p>}
                <div className="flex items-center gap-1.5 mt-3 text-[#35d5f1] text-sm font-medium">
                  <ExternalLink size={14} />
                  <span>{t('resourcesPage.visitLink')}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {pendingUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={cancelNavigate}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900">{t('resourcesPage.confirmTitle')}</h3>
              <button onClick={cancelNavigate} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <p className="text-gray-600 mb-2">{t('resourcesPage.confirmMessage')}</p>
            <p className="text-sm font-semibold text-gray-700 mb-2">{pendingTitle}</p>
            <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2 mb-6 break-all font-mono">{pendingUrl}</p>
            <div className="flex gap-3 justify-end">
              <button onClick={cancelNavigate} className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors">
                {t('resourcesPage.cancel')}
              </button>
              <button onClick={confirmNavigate} className="px-5 py-2.5 rounded-full bg-[#35d5f1] text-white hover:bg-[#2bc0db] text-sm font-medium transition-colors flex items-center gap-2">
                <ExternalLink size={14} />
                {t('resourcesPage.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
