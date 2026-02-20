import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/utm';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thanks for Applying | CyberXP',
};

export default async function ThanksPage() {
  const t = await getTranslations();

  return (
    <div className="w-full bg-white">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden">
        <div className="hero-gradient pt-[120px] pb-16 md:pb-20 relative">
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-black/80 mb-4">
              {t('thanksPage.title')}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-2xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 -mt-20 relative z-20">
          <div className="flex justify-center mb-6">
            <CheckCircle size={64} className="text-cyan-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('thanksPage.heading')}
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            {t('thanksPage.message')}
          </p>
          <Link href="/">
            <span className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors font-semibold cursor-pointer">
              {t('thanksPage.backHome')}
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <ArrowRight size={16} className="text-black" />
              </span>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
