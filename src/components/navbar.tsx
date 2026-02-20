"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  const navLinks = [
    { key: "nav.home", href: "/" },
    { key: "nav.faq", href: "/faq" },
    { key: "nav.team", href: "/team" },
    { key: "nav.resources", href: "/resources" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between py-4">
          {/* Logo + Language Selector */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src="/assets/cAbnkI0AkEaDouR18fSragbzg78.png"
                alt="CYBER XP"
                width={206}
                height={56}
                className="h-14 w-auto"
              />
            </Link>
            <div className="relative">
              <select
                value={locale}
                onChange={(e) => handleLocaleChange(e.target.value)}
                className="bg-transparent text-white/80 border-none text-[1rem] font-normal cursor-pointer focus:outline-none appearance-none pr-5 pl-1"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27white%27 viewBox=%270 0 20 20%27%3e%3cpath d=%27M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z%27/%3e%3c/svg%3e")',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right center",
                  backgroundSize: "14px",
                }}
              >
                <option value="en" className="text-black">EN</option>
                <option value="nl" className="text-black">NL</option>
                <option value="fr" className="text-black">FR</option>
              </select>
            </div>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-white hover:text-white/80 text-[1rem] font-normal transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Right Side - CTA Button */}
          <div className="hidden md:flex md:items-center">
            <Link href="/book-your-event">
              <button className="bg-[#0a0d0b] text-white rounded-[44px] pl-7 pr-2 h-14 text-[1rem] font-normal transition-all flex items-center gap-4 hover:bg-gray-900 group">
                {t("nav.bookEvent")}
                <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <ArrowRight size={16} className="text-black group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-white/80 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 bg-black/90 backdrop-blur-md rounded-xl mt-2 px-4">
            <div className="space-y-2 py-4">
              <div className="flex gap-2 mb-4 px-4">
                {["en", "nl", "fr"].map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { handleLocaleChange(loc); setIsMenuOpen(false); }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      locale === loc ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {loc.toUpperCase()}
                  </button>
                ))}
              </div>
              {navLinks.map((link) => (
                <Link key={link.key} href={link.href}
                  className="block text-white hover:text-cyan-400 px-4 py-2 text-sm font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(link.key)}
                </Link>
              ))}
              <Link href="/book-your-event" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full mt-4 bg-black border border-white/30 text-white rounded-full px-6 py-3 text-sm font-medium flex items-center justify-center gap-2">
                  {t("nav.bookEvent")}
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
