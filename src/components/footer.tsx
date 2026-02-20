'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/utm';
import { MapPin, Mail, ArrowRight } from 'lucide-react';

const GALLERY_ROW1 = [
  '/images/s7y3sUoZtsF07OXIzT9n6tqVSo.jpg',
  '/images/xJEPhamNz683w6fG1UzarDByAs0.jpg',
  '/images/Q4NCqDjNdLfLqr6xFJrf6Qo.jpg',
  '/images/sKnteV5gw2KcXKo0be6tfzQBU.jpg',
  '/images/yroeEAgXVNPK8x6Bhi2PlNTtRc.jpg',
];

const GALLERY_ROW2 = [
  '/images/GXQdapANe1hLJnrSnLGo19Po.jpg',
  '/images/OQ5AZmcp6OZoB6VxFrw1cVfRHC4.jpg',
  '/images/g0YusB2R02F67MNmL4nRCrOlyf0.jpg',
  '/images/s7y3sUoZtsF07OXIzT9n6tqVSo.jpg',
  '/images/xJEPhamNz683w6fG1UzarDByAs0.jpg',
];

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="w-full">
      {/* ── Photo Gallery — full-bleed edge-to-edge ── */}
      <div className="bg-[#2a7c8a]">
        {/* Row 1 */}
        <div className="flex gap-3 px-3 pt-3 pb-1.5 overflow-hidden">
          {GALLERY_ROW1.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-[28%] md:w-[22%] aspect-[4/3] overflow-hidden rounded-xl">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        {/* Row 2 */}
        <div className="flex gap-3 px-3 pt-1.5 pb-3 overflow-hidden">
          {GALLERY_ROW2.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-[28%] md:w-[22%] aspect-[4/3] overflow-hidden rounded-xl">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Gallery CTA ── */}
      <div className="relative bg-gradient-to-b from-[#2a7c8a] via-[#1e3a42] to-[#0d1b1f] pt-16 pb-32 md:pt-24 md:pb-44 overflow-hidden">
        {/* Decorative CyberXP flower — large, centered at bottom */}
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
          <img
            src="/images/cyberxp-flower.png"
            alt=""
            className="w-[420px] md:w-[550px] translate-y-[30%] opacity-80"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-[3.2rem] font-bold text-white mb-6 leading-tight">
            {t('galleryCta.title')}
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            {t('galleryCta.description')}
          </p>
          <Link href="/book-your-event">
            <span className="inline-flex items-center gap-3 bg-black/80 text-white px-8 py-4 rounded-full hover:bg-black transition-colors font-medium cursor-pointer group">
              {t('galleryCta.cta')}
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <ArrowRight size={14} className="text-black group-hover:translate-x-0.5 transition-transform" />
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* ── Footer Links ── */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Column 1: Navigate */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {t('footer.navigate')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                    {t('footer.home')}
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-gray-600 hover:text-gray-900 transition-colors">
                    {t('footer.team')}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">
                    {t('footer.faqs')}
                  </Link>
                </li>
                <li>
                  <Link href="/book-your-event" className="text-gray-600 hover:text-gray-900 transition-colors">
                    {t('footer.apply')}
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-gray-600 hover:text-gray-900 transition-colors">
                    {t('footer.resources')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Support */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {t('footer.support')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900 transition-colors">
                    {t('footer.privacy')}
                  </Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions" className="text-gray-600 hover:text-gray-900 transition-colors">
                    {t('footer.terms')}
                  </Link>
                </li>
                <li className="text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
                    onClick={() => {
                      localStorage.removeItem('cyberxp-cookie-consent');
                      window.location.reload();
                    }}>
                  {t('footer.cookies')}
                </li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {t('footer.contact')}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-gray-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{t('footer.address')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={20} className="text-gray-600 flex-shrink-0 mt-0.5" />
                  <a href={`mailto:${t('footer.email')}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                    {t('footer.email')}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center gap-8">
              <img
                src="/images/ZmzcFoFaght8UcgUwdo6S7XE.png"
                alt="Economie logo"
                className="h-8 w-auto"
              />
              <img
                src="/images/7uB7L1GyoURX7AiRe5OvCj8ruk.png"
                alt="EU funded logo"
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
