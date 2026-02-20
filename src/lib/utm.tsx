'use client';

import { createContext, useContext, useEffect, useState, type ReactNode, type ComponentProps } from 'react';
import { Link as BaseLink } from '@/i18n/routing';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
const STORAGE_KEY = 'cyberxp-utm';

type UTMParams = Record<string, string>;

const UTMContext = createContext<UTMParams>({});

export function useUTMParams() {
  return useContext(UTMContext);
}

export function UTMProvider({ children }: { children: ReactNode }) {
  const [utm, setUtm] = useState<UTMParams>({});

  useEffect(() => {
    // Read from URL first
    const params = new URLSearchParams(window.location.search);
    const fromUrl: UTMParams = {};
    for (const key of UTM_KEYS) {
      const val = params.get(key);
      if (val) fromUrl[key] = val;
    }

    if (Object.keys(fromUrl).length > 0) {
      // New UTM params in URL — store them
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      setUtm(fromUrl);
    } else {
      // No UTM in URL — restore from session
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) setUtm(JSON.parse(stored));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  return <UTMContext.Provider value={utm}>{children}</UTMContext.Provider>;
}

type BaseLinkProps = ComponentProps<typeof BaseLink>;

export function Link({ href, ...props }: BaseLinkProps) {
  const utm = useUTMParams();

  // Append UTM params to href
  let finalHref = href;
  if (typeof href === 'string' && Object.keys(utm).length > 0) {
    const separator = href.includes('?') ? '&' : '?';
    const utmString = new URLSearchParams(utm).toString();
    finalHref = `${href}${separator}${utmString}`;
  } else if (typeof href === 'object' && Object.keys(utm).length > 0) {
    finalHref = {
      ...href,
      query: { ...(typeof href.query === 'object' ? href.query : {}), ...utm },
    };
  }

  return <BaseLink href={finalHref} {...props} />;
}
