import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { EDITORIAL_EASE } from './ScrollReveal';
import { useLanguage } from '../i18n';

interface HeroProps {
  onExploreProducts: () => void;
}

export function Hero({ onExploreProducts }: HeroProps) {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      aria-label="Desert Moon CBD Featured Campaign"
      className="w-full min-h-[calc(100vh-78px)] grid grid-cols-1 lg:grid-cols-[60.12%_39.88%] items-stretch"
    >
      {/* Left Desert Moon plum panel (#7A548F) aligned vertically with header logo */}
      <div className="relative overflow-hidden bg-[#7A548F] flex flex-col justify-center py-16 sm:py-20 lg:py-16 px-6 sm:px-10 lg:pl-[max(4rem,calc((100vw-1470px)/2))] lg:pr-12 xl:pr-16">
        {/* Expressive sweeping ribbon loop matching the Triptych signature curve */}
        <svg
          viewBox="0 0 632 857"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full text-white/20"
        >
          <path
            d="M -6 426 C 52 518, 152 544, 224 468 C 288 396, 330 286, 286 282 C 238 278, 226 408, 266 534 C 314 692, 434 824, 638 698"
            stroke="currentColor"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative z-10 w-full max-w-[669px]">
          {/* 4-point solid botanical star mark */}
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: EDITORIAL_EASE }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              aria-hidden="true"
              className="w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] shrink-0"
            >
              <path
                d="M22 0C22 14.5 27.5 22 44 22C27.5 22 22 29.5 22 44C22 29.5 16.5 22 0 22C16.5 22 22 14.5 22 0Z"
                fill="#FFFFFF"
              />
            </svg>
          </motion.div>

          {/* Editorial mixed serif-italic + geometric sans display headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.08, ease: EDITORIAL_EASE }}
            className="mt-9 lg:mt-[42px] text-[44px] sm:text-[56px] lg:text-[64px] xl:text-[74px] leading-[1.14] tracking-[-0.025em] text-white font-medium"
          >
            <span className="block">
              <em className="font-editorial italic font-normal tracking-[-0.01em] pr-[0.16em]">
                {t.hero.line1Italic}
              </em>
              {t.hero.line1Sans}
            </span>
            <span className="block">
              {t.hero.line2Sans}
              <em className="font-editorial italic font-normal tracking-[-0.01em] pl-[0.18em]">
                {t.hero.line2Italic}
              </em>
            </span>
          </motion.h1>

          {/* Uppercase two-line honest manifesto */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68, delay: 0.16, ease: EDITORIAL_EASE }}
            className="mt-8 lg:mt-[42px] text-[12px] sm:text-[12.5px] leading-[1.85] tracking-[0.02em] uppercase text-white/90 font-normal max-w-[460px]"
          >
            {t.hero.manifesto1}
            <br className="hidden sm:inline" />{' '}
            {t.hero.manifesto2}
          </motion.p>

          {/* Wide white full-pill CTA button with nested circular plum arrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68, delay: 0.24, ease: EDITORIAL_EASE }}
            className="mt-12 lg:mt-[66px]"
          >
            <button
              type="button"
              onClick={onExploreProducts}
              className="group relative w-full max-w-[669px] h-[63px] rounded-full bg-white text-[#1E1624] flex items-center justify-center pl-8 pr-20 sm:px-16 transition-shadow duration-200 hover:shadow-[0_12px_30px_rgba(30,22,36,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span className="text-[12px] sm:text-[13px] font-normal tracking-[0.03em] uppercase underline underline-offset-[4px] decoration-[#7A548F]/85 whitespace-nowrap">
                {t.hero.cta}
              </span>

              <span
                aria-hidden="true"
                className="absolute right-[7.5px] top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-[#7A548F] text-white flex items-center justify-center transition-all duration-200 ease-out group-hover:bg-[#5C3D6E] group-hover:scale-[1.04]"
              >
                <ArrowUpRight className="w-[18px] h-[18px] stroke-[1.6] transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Right full-bleed portrait column (keeping existing local image) */}
      <div className="relative w-full min-h-[460px] sm:min-h-[600px] lg:min-h-0 lg:h-full bg-gradient-to-br from-[#9C78B1] via-[#7A548F] to-[#4A315A] overflow-hidden">
        {!imgError ? (
          <motion.img
            initial={{ opacity: 0.85, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EDITORIAL_EASE }}
            src="/assets/hero-portrait.png"
            alt="Desert Moon CBD natural botanical wellness campaign"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center block"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center text-white/90">
            <span className="font-editorial italic text-3xl">Desert Moon CBD</span>
            <span className="mt-2 text-xs uppercase tracking-widest opacity-80">
              Solventless Hemp Wellness
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
