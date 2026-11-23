import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { ProductCategory } from '../data/products';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../i18n';

interface ValuesAccordionProps {
  onOpenShop: (category?: ProductCategory) => void;
}

export function ValuesAccordion({ onOpenShop }: ValuesAccordionProps) {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('solventless-extraction');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="values"
      aria-label="Pure, Organic, Solventless Wellness Standards"
      className="w-full bg-white py-16 sm:py-20 lg:pt-[96px] lg:pb-[124px]"
    >
      <div className="w-full max-w-[1598px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="relative grid grid-cols-1 lg:grid-cols-[42%_1fr] gap-y-12 lg:gap-y-0 items-end">
          {/* Left Column: Square editorial photograph */}
          <ScrollReveal className="relative" delay={0}>
            <button
              type="button"
              onClick={() => onOpenShop('CBD Tinctures')}
              aria-label="Shop Solventless Organic CBD Tinctures"
              className="group w-full aspect-[618/610] bg-[#EAE0F0] overflow-hidden block text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A548F]"
            >
              <img
                src="/assets/cleansing-beauty-oil.png"
                alt="Desert Moon CBD solventless organic hemp tincture bottle"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.025] block"
              />
            </button>

            {/* Delicate thin curved arrow starting inside top-right of photo and arcing to the headline */}
            <svg
              viewBox="0 0 290 96"
              fill="none"
              aria-hidden="true"
              className="hidden lg:block pointer-events-none absolute top-[6px] right-[-215px] xl:right-[-226px] w-[265px] xl:w-[288px] h-auto text-[#7A548F] z-10"
            >
              <path
                d="M2 22C96 -8 224 2 282 90"
                stroke="currentColor"
                strokeWidth="1.05"
                strokeLinecap="round"
              />
              <path
                d="M276 86L282.5 91.2L284.5 83.2"
                stroke="currentColor"
                strokeWidth="1.05"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ScrollReveal>

          {/* Right Column: Mixed serif/sans headline + 4-item interactive accordion */}
          <ScrollReveal className="lg:pl-[120px] xl:pl-[218px] pb-1" delay={0.14}>
            <div className="w-full max-w-[444px]">
              <h2 className="text-[32px] sm:text-[36px] lg:text-[38px] xl:text-[42px] leading-[1.16] tracking-[-0.025em] font-medium text-[#1E1624]">
                <span className="block">{t.values.line1}</span>
                <span className="block">
                  {t.values.line2Sans}{' '}
                  <em className="font-editorial italic font-normal tracking-[-0.01em] text-[#7A548F]">
                    {t.values.line2Italic}
                  </em>
                </span>
              </h2>

              <div className="mt-8 lg:mt-10 divide-y divide-[#7A548F]/15">
                {t.values.items.map((item) => {
                  const isOpen = openId === item.id;
                  return (
                    <div key={item.id}>
                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        aria-expanded={isOpen}
                        aria-controls={`accordion-panel-${item.id}`}
                        className="w-full py-[18px] flex items-center justify-between gap-4 text-left text-[#1E1624] hover:text-[#7A548F] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F]"
                      >
                        <span className="text-[12px] sm:text-[12.5px] uppercase tracking-[0.025em] font-medium">
                          {item.title}
                        </span>
                        {isOpen ? (
                          <X className="w-[13px] h-[13px] stroke-[1.7] shrink-0 text-[#7A548F]" aria-hidden="true" />
                        ) : (
                          <Plus className="w-[13px] h-[13px] stroke-[1.7] shrink-0 text-[#7A548F]" aria-hidden="true" />
                        )}
                      </button>

                      {isOpen && (
                        <div
                          id={`accordion-panel-${item.id}`}
                          className="pb-6 pr-6 text-[11.5px] sm:text-[12px] leading-[1.85] tracking-[0.015em] uppercase text-[#5B5566] font-normal"
                        >
                          {item.body}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
