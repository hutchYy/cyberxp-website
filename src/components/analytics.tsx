'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getConsentStatus, type ConsentStatus } from './cookie-consent';

// Replace with your actual GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  const [consent, setConsent] = useState<ConsentStatus>('pending');

  useEffect(() => {
    // Check initial consent status
    setConsent(getConsentStatus());

    // Listen for consent changes
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as ConsentStatus;
      setConsent(detail);

      if (detail === 'accepted') {
        // Update gtag consent mode to granted
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('consent', 'update', {
            analytics_storage: 'granted',
          });
        }
      }

      if (detail === 'declined') {
        // Revoke consent — delete GA cookies
        document.cookie.split(';').forEach((c) => {
          const name = c.split('=')[0].trim();
          if (name.startsWith('_ga') || name.startsWith('_gid')) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          }
        });
      }
    };

    window.addEventListener('cookie-consent-change', handler);
    return () => window.removeEventListener('cookie-consent-change', handler);
  }, []);

  // Always load gtag with consent mode defaulting to denied
  // This allows proper consent-aware tracking
  return (
    <>
      {/* Google tag (gtag.js) — loads with consent mode */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Default consent to denied — respects user choice
          gtag('consent', 'default', {
            'analytics_storage': '${consent === 'accepted' ? 'granted' : 'denied'}',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
          });

          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
