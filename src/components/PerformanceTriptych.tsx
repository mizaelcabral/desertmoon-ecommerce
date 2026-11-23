import type { ProductCategory } from '../data/products';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../i18n';

interface PerformanceTriptychProps {
  onOpenShop: (category?: ProductCategory) => void;
}

export function PerformanceTriptych({ onOpenShop }: PerformanceTriptychProps) {
  const { t } = useLanguage();

  return (
    <section
      id="performance"
      aria-label="Pure, Organic, Solventless"
      className="w-full bg-white py-6 lg:py-8"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 items-stretch lg:min-h-[820px]">
        {/* Column 1: Desert Moon Plum panel (#7A548F) with headline, sweeping ribbon, and bottom copy */}
        <ScrollReveal
          delay={0}
          y={28}
          className="relative bg-[#7A548F] overflow-hidden flex flex-col justify-between min-h-[540px] lg:min-h-0 px-8 py-11 sm:px-10 sm:py-12 lg:px-[40px] lg:pt-[46px] lg:pb-[44px]"
        >
          <h2 className="relative z-10 text-[44px] sm:text-[54px] lg:text-[52px] xl:text-[64px] leading-[1.06] tracking-[-0.03em] font-medium text-white">
            <span className="block">{t.triptych.col1Line1}</span>
            <span className="block">{t.triptych.col1Line2}</span>
            <span className="block">{t.triptych.col1Line3}</span>
          </h2>

          {/* Expressive sweeping ribbon loop */}
          <svg
            viewBox="0 0 632 857"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full text-white/30"
          >
            <path
              d="M -6 426 C 52 518, 152 544, 224 468 C 288 396, 330 286, 286 282 C 238 278, 226 408, 266 534 C 314 692, 434 824, 638 698"
              stroke="currentColor"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
          </svg>

          <p className="relative z-10 mt-64 lg:mt-0 text-[11px] sm:text-[12px] leading-[1.75] tracking-[0.02em] uppercase text-white/90 font-normal max-w-[380px]">
            {t.triptych.col1Copy1}
            <br />
            {t.triptych.col1Copy2}
          </p>
        </ScrollReveal>

        {/* Column 2: Full-bleed center portrait */}
        <ScrollReveal
          delay={0.1}
          y={28}
          className="relative w-full min-h-[480px] sm:min-h-[600px] lg:min-h-0 bg-[#9C78B1] overflow-hidden"
        >
          <img
            src="/assets/triptych-portrait.png"
            alt="Desert Moon CBD natural wellness lifestyle portrait"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center block"
          />
        </ScrollReveal>

        {/* Column 3: Top bottle in hands + bottom Solventless Purity copy */}
        <ScrollReveal delay={0.18} y={28} className="flex flex-col bg-white">
          <button
            type="button"
            onClick={() => onOpenShop('CBD Tinctures')}
            aria-label="Explore Desert Moon CBD Tinctures"
            className="group relative w-full aspect-[640/599] lg:aspect-auto lg:flex-[70] bg-[#EAE0F0] overflow-hidden block text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#7A548F]"
          >
            <img
              src="/assets/triptych-serum-hands.png"
              alt="Hands holding a minimalist clear glass bottle of organic hemp CBD oil"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.025] block"
            />
          </button>

          <div className="bg-white lg:flex-[30] px-8 py-9 sm:px-10 lg:px-[34px] lg:pt-[42px] lg:pb-[40px] flex flex-col justify-center">
            <h3 className="text-[28px] sm:text-[32px] xl:text-[36px] leading-[1.16] tracking-[-0.02em] font-medium text-[#1E1624]">
              <span className="block">{t.triptych.col3Line1}</span>
              <span className="block">
                <em className="font-editorial italic font-normal tracking-[-0.01em] pr-[0.14em] text-[#7A548F]">
                  {t.triptych.col3Italic}
                </em>
                {t.triptych.col3End}
              </span>
            </h3>

            <p className="mt-6 text-[11px] sm:text-[11.5px] leading-[1.85] tracking-[0.015em] uppercase text-[#1E1624] font-normal max-w-[460px]">
              {t.triptych.col3Copy}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
