'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

const COOKIE_KEY = 'cyberxp-cookie-consent';

export type ConsentStatus = 'pending' | 'accepted' | 'declined';

export function getConsentStatus(): ConsentStatus {
  if (typeof window === 'undefined') return 'pending';
  const stored = localStorage.getItem(COOKIE_KEY);
  if (stored === 'accepted') return 'accepted';
  if (stored === 'declined') return 'declined';
  return 'pending';
}

export function setConsentStatus(status: 'accepted' | 'declined') {
  localStorage.setItem(COOKIE_KEY, status);
  // Dispatch custom event so tracking component reacts
  window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: status }));
}

export default function CookieConsent() {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show the banner only if no consent choice has been made
    const status = getConsentStatus();
    if (status === 'pending') {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setConsentStatus('accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    setConsentStatus('declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            {t('cookies.title')}
          </h3>
          <button
            onClick={handleDecline}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {t('cookies.message')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAccept}
            className="px-6 py-2.5 rounded-full bg-[#35d5f1] text-white font-medium text-sm hover:bg-[#2bc0db] transition-colors"
          >
            {t('cookies.accept')}
          </button>
          <button
            onClick={handleDecline}
            className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            {t('cookies.decline')}
          </button>
          <a
            href="/privacy-policy"
            className="px-6 py-2.5 text-gray-500 font-medium text-sm hover:text-gray-700 transition-colors text-center"
          >
            {t('cookies.learnMore')}
          </a>
        </div>
      </div>
    </div>
  );
}
