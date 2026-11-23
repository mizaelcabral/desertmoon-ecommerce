import type { ProductCategory } from '../data/products';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../i18n';

interface EditorialShowcaseProps {
  onOpenShop: (category?: ProductCategory) => void;
}

export function EditorialShowcase({ onOpenShop }: EditorialShowcaseProps) {
  const { t } = useLanguage();

  return (
    <section
      id="editorial"
      aria-label="Pure, Organic Hemp CBD Wellness"
      className="w-full bg-white py-16 sm:py-20 lg:pt-[76px] lg:pb-[112px]"
    >
      <div className="w-full max-w-[1598px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="relative grid grid-cols-1 lg:grid-cols-[22.25%_1fr_32.7%] gap-y-12 lg:gap-y-0 items-stretch">
          {/* Left Column: Headline + Editorial Portrait */}
          <ScrollReveal className="relative flex flex-col justify-between lg:pt-[26px]" delay={0}>
            <div className="relative z-10">
              <h2 className="text-[36px] sm:text-[42px] lg:text-[44px] xl:text-[48px] leading-[1.12] tracking-[-0.025em] font-medium text-[#1E1624] lg:whitespace-nowrap">
                <span className="block">{t.editorial.line1}</span>
                <span className="block">{t.editorial.line2}</span>
                <span className="block">
                  <em className="font-editorial italic font-normal tracking-[-0.01em] text-[#7A548F]">
                    {t.editorial.line3Italic}
                  </em>
                </span>
              </h2>

              {/* Delicate sweeping curved arrow flowing from line 2 toward the middle copy */}
              <svg
                viewBox="0 0 260 185"
                fill="none"
                aria-hidden="true"
                className="hidden lg:block pointer-events-none absolute top-[62px] left-[250px] xl:left-[262px] w-[220px] xl:w-[252px] h-auto text-[#7A548F]"
              >
                <path
                  d="M2 22C98 1 224 22 246 172"
                  stroke="currentColor"
                  strokeWidth="1.05"
                  strokeLinecap="round"
                />
                <path
                  d="M240 165L246.2 173.5L251 164"
                  stroke="currentColor"
                  strokeWidth="1.05"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <button
              type="button"
              onClick={() => onOpenShop('CBD Tinctures')}
              aria-label="Shop CBD Tinctures"
              className="group mt-10 lg:mt-[68px] w-full max-w-[360px] lg:max-w-none aspect-[327/409] bg-[#F5F2F7] overflow-hidden block text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A548F]"
            >
              <img
                src="/assets/editorial-enzyme-cleanser.png"
                alt="Desert Moon CBD solventless organic hemp tincture ritual"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </button>
          </ScrollReveal>

          {/* Center Column: Bottom-aligned uppercase copy + EXPLORE PRODUCTS outline pill */}
          <ScrollReveal className="flex flex-col justify-end lg:px-10 xl:px-14" delay={0.12}>
            <div className="w-full max-w-[308px] lg:mx-auto">
              <p className="text-[11.5px] sm:text-[12px] leading-[1.9] tracking-[0.015em] uppercase text-[#1E1624] font-normal">
                {t.editorial.body}
              </p>

              <div className="mt-8 lg:mt-[34px]">
                <button
                  type="button"
                  onClick={() => onOpenShop('All')}
                  className="inline-flex items-center justify-center min-w-[183px] h-[48px] px-7 rounded-full border border-[#7A548F] bg-white text-[12px] uppercase tracking-[0.025em] text-[#7A548F] font-normal hover:bg-[#7A548F] hover:text-white transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A548F]"
                >
                  {t.editorial.cta}
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Tall full-height editorial portrait */}
          <ScrollReveal className="flex items-end" delay={0.2}>
            <button
              type="button"
              onClick={() => onOpenShop('Sleep Aid')}
              aria-label="Shop CBD Sleep Aid"
              className="group w-full aspect-[481/642] bg-[#F5F2F7] overflow-hidden block text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A548F]"
            >
              <img
                src="/assets/editorial-botanical-serum.png"
                alt="Desert Moon CBD botanical hemp dropper bottle illuminated by natural sunlight"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
