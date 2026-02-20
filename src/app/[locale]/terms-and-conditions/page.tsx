import { getTranslations } from 'next-intl/server';


export default async function TermsPage() {
  const t = await getTranslations();

  const sections = [0, 1, 2];

  return (
    <div className="w-full bg-white">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden">
        <div className="hero-gradient pt-[120px] pb-16 md:pb-20 relative">
          <img
            src={`/images/IsgmnS8Sh2jY1lSKSyF63F0so.png`}
            alt=""
            className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-30"
          />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-black/80 mb-2">
              {t('termsPage.title')}
            </h1>
            <p className="text-black/60 text-sm">
              {t('termsPage.lastUpdate')}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="space-y-12">
          {sections.map((i) => (
            <div key={i}>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <img
                    src={`/images/HcTNqoMpEO4zYf3mobWq0blOHo.svg`}
                    alt=""
                    className="w-5 h-5"
                  />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-black pt-1">
                  {t(`termsPage.sections.${i}.title`)}
                </h2>
              </div>
              <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line pl-14">
                {t(`termsPage.sections.${i}.content`)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
