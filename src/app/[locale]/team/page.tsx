import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Team | CyberXP',
};

const teamImages = [
  '/images/team-julian.jpg',
  '/images/3AcKoTlqGxxdHlnT0ZrIYBNUr3E.png',
  '/images/OrZAcCO7eE6m3mipW8FbkJHVnH0.jpg',
  '/images/team-vincent.jpg',
];

export default async function TeamPage() {
  const t = await getTranslations();
  const members = t.raw('teamPage.members') as Array<{ name: string; role: string }>;

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="hero-gradient min-h-[400px] pt-[100px] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold text-white">
            {t('teamPage.title')}
          </h1>
        </div>
      </div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <div key={index} className="flex flex-col">
              {/* Image Container */}
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                <Image
                  src={teamImages[index]}
                  alt={member.name}
                  fill
                  className="object-cover"
                  priority={index < 4}
                />
                {/* Staff Badge */}
                <div className="absolute bottom-4 left-4 bg-cyan-500 text-white text-sm font-medium px-3 py-1 rounded-full border-2 border-white">
                  Staff
                </div>
              </div>

              {/* Member Info */}
              <h3 className="font-bold text-lg text-gray-900">
                {member.name}
              </h3>
              <p className="text-gray-500">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
