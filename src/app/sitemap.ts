import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.cyberxp.be';

const pages = [
  '/',
  '/faq',
  '/team',
  '/resources',
  '/book-your-event',
  '/privacy-policy',
  '/terms-and-conditions',
];

const locales = ['en', 'nl', 'fr'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) => {
    const defaultUrl = page === '/' ? BASE_URL : `${BASE_URL}${page}`;
    const languages: Record<string, string> = {};

    for (const locale of locales) {
      if (locale === 'en') {
        languages[locale] = page === '/' ? BASE_URL : `${BASE_URL}${page}`;
      } else {
        languages[locale] = page === '/' ? `${BASE_URL}/${locale}` : `${BASE_URL}/${locale}${page}`;
      }
    }

    return {
      url: defaultUrl,
      lastModified: new Date(),
      alternates: { languages },
    };
  });
}
