'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/utm';
import { useRouter } from '@/i18n/routing';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useState, FormEvent } from 'react';

const FALLBACK_EMAIL = 'info@cyberxp.be';

export default function BookEventPage() {
  const t = useTranslations();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    companyActivity: '',
    companySize: '',
    jobTitle: '',
    companyEmail: '',
    mobilePhone: '',
    website: '',
    comments: '',
    acceptPrivacy: false,
    acceptTerms: false,
    _hp: '', // honeypot field — hidden from real users
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!form.fullName || !form.companyName || !form.companyActivity || !form.companySize || !form.jobTitle || !form.companyEmail || !form.mobilePhone) {
      setError(t('bookPage.errorRequired'));
      return;
    }
    if (!form.acceptPrivacy || !form.acceptTerms) {
      setError(t('bookPage.errorCheckboxes'));
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/book-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          companyName: form.companyName,
          companyActivity: form.companyActivity,
          companySize: form.companySize,
          jobTitle: form.jobTitle,
          companyEmail: form.companyEmail,
          mobilePhone: form.mobilePhone,
          website: form.website,
          comments: form.comments,
          _hp: form._hp,
        }),
      });

      if (res.ok) {
        router.push('/thanks-for-applying');
        return;
      }

      // Webhook returned non-OK — fall back to email
      triggerEmailFallback();
    } catch {
      // Network error — fall back to email
      triggerEmailFallback();
    }
  };

  const triggerEmailFallback = () => {
    const subject = encodeURIComponent(`Event Application — ${form.fullName} (${form.companyName})`);
    const body = encodeURIComponent(
      [
        `Full Name: ${form.fullName}`,
        `Company: ${form.companyName}`,
        `Activity: ${form.companyActivity}`,
        `Size: ${form.companySize} employees`,
        `Job Title: ${form.jobTitle}`,
        `Email: ${form.companyEmail}`,
        `Phone: ${form.mobilePhone}`,
        form.website ? `Website: ${form.website}` : '',
        form.comments ? `Comments: ${form.comments}` : '',
      ]
        .filter(Boolean)
        .join('\n')
    );

    window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitting(false);
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden">
        <div className="hero-gradient pt-[120px] pb-16 md:pb-20 relative">
          <img
            src="/images/IsgmnS8Sh2jY1lSKSyF63F0so.png"
            alt=""
            className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-30"
          />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-black/80 mb-4">
              {t('bookPage.title')}
            </h1>
            <p className="text-black/60 text-lg max-w-2xl mx-auto">
              {t('bookPage.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 -mt-20 relative z-20">
          <p className="text-gray-500 mb-8 text-center">
            {t('bookPage.formIntro')}
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                {t('bookPage.fields.fullName')}*
              </label>
              <input
                type="text"
                required
                maxLength={200}
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                placeholder="Jane Smith"
                className="w-full border-b border-gray-300 py-3 px-1 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors bg-transparent"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                {t('bookPage.fields.companyName')}*
              </label>
              <input
                type="text"
                required
                maxLength={200}
                value={form.companyName}
                onChange={(e) => update('companyName', e.target.value)}
                placeholder="CyberXP ASBL/VZW"
                className="w-full border-b border-gray-300 py-3 px-1 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors bg-transparent"
              />
            </div>

            {/* Company Activity */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                {t('bookPage.fields.companyActivity')}*
              </label>
              <input
                type="text"
                required
                maxLength={300}
                value={form.companyActivity}
                onChange={(e) => update('companyActivity', e.target.value)}
                className="w-full border-b border-gray-300 py-3 px-1 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors bg-transparent"
              />
            </div>

            {/* Company Size */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                {t('bookPage.fields.companySize')}*
              </label>
              <div className="flex items-center gap-4">
                <span className="text-gray-400">~</span>
                <input
                  type="number"
                  required
                  value={form.companySize}
                  onChange={(e) => update('companySize', e.target.value)}
                  className="flex-1 border-b border-gray-300 py-3 px-1 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors bg-transparent"
                />
                <span className="text-gray-500 text-sm">{t('bookPage.fields.employees')}</span>
              </div>
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                {t('bookPage.fields.jobTitle')}*
              </label>
              <input
                type="text"
                required
                maxLength={200}
                value={form.jobTitle}
                onChange={(e) => update('jobTitle', e.target.value)}
                className="w-full border-b border-gray-300 py-3 px-1 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors bg-transparent"
              />
            </div>

            {/* Company Email */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                {t('bookPage.fields.companyEmail')}*
              </label>
              <input
                type="email"
                required
                maxLength={254}
                value={form.companyEmail}
                onChange={(e) => update('companyEmail', e.target.value)}
                className="w-full border-b border-gray-300 py-3 px-1 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors bg-transparent"
              />
            </div>

            {/* Mobile Phone */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                {t('bookPage.fields.mobilePhone')}*
              </label>
              <input
                type="tel"
                required
                maxLength={30}
                value={form.mobilePhone}
                onChange={(e) => update('mobilePhone', e.target.value)}
                className="w-full border-b border-gray-300 py-3 px-1 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors bg-transparent"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                {t('bookPage.fields.website')}
              </label>
              <input
                type="url"
                maxLength={500}
                value={form.website}
                onChange={(e) => update('website', e.target.value)}
                className="w-full border-b border-gray-300 py-3 px-1 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors bg-transparent"
              />
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                {t('bookPage.fields.comments')}
              </label>
              <textarea
                rows={3}
                maxLength={2000}
                value={form.comments}
                onChange={(e) => update('comments', e.target.value)}
                className="w-full border-b border-gray-300 py-3 px-1 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors bg-transparent resize-none"
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-4 pt-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.acceptPrivacy}
                  onChange={(e) => update('acceptPrivacy', e.target.checked)}
                  className="mt-1 w-4 h-4 accent-cyan-400"
                />
                <span className="text-sm text-gray-700">
                  {t('bookPage.fields.acceptPrivacy')}{' '}
                  <Link href="/privacy-policy" className="text-cyan-500 underline hover:text-cyan-600">
                    {t('bookPage.fields.privacyLink')}
                  </Link>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.acceptTerms}
                  onChange={(e) => update('acceptTerms', e.target.checked)}
                  className="mt-1 w-4 h-4 accent-cyan-400"
                />
                <span className="text-sm text-gray-700">
                  {t('bookPage.fields.acceptTerms')}{' '}
                  <Link href="/terms-and-conditions" className="text-cyan-500 underline hover:text-cyan-600">
                    {t('bookPage.fields.termsLink')}
                  </Link>
                </span>
              </label>
            </div>

            {/* Honeypot — hidden from real users, catches bots */}
            <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
              <input
                type="text"
                name="_hp"
                autoComplete="off"
                tabIndex={-1}
                value={form._hp}
                onChange={(e) => update('_hp', e.target.value)}
              />
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-500 text-sm text-center pt-2">{error}</p>
            )}

            {/* Submit */}
            <div className="pt-6 text-center">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-colors font-semibold text-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    {t('bookPage.submitting')}
                  </>
                ) : (
                  <>
                    {t('bookPage.submit')}
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <ArrowRight size={16} className="text-black" />
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
