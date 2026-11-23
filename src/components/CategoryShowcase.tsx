import { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProductCategory } from '../data/products';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../i18n';

interface CategoryShowcaseProps {
  onOpenShop: (category?: ProductCategory) => void;
}

interface CategoryCardItem {
  id: string;
  category: Exclude<ProductCategory, 'All'>;
  image: string;
  alt: string;
}

const CATEGORY_CARDS: CategoryCardItem[] = [
  {
    id: 'cbd-tinctures',
    category: 'CBD Tinctures',
    image: '/assets/category-beauty-tools.png',
    alt: 'Desert Moon CBD solventless organic hemp tincture oils',
  },
  {
    id: 'sleep-aid',
    category: 'Sleep Aid',
    image: '/assets/category-cleansers.png',
    alt: 'Desert Moon CBD + CBN lavender restorative sleep aid tonic',
  },
  {
    id: 'cbd-gummies',
    category: 'CBD Gummies',
    image: '/assets/category-face-wash.png',
    alt: 'Desert Moon plant-based CBD and hemp-derived gummies',
  },
  {
    id: 'cbd-topicals',
    category: 'CBD Topicals',
    image: '/assets/category-moisturizers.png',
    alt: 'Desert Moon 5000mg extra strength cooling mint CBD balm',
  },
  {
    id: 'cbd-bundles',
    category: 'CBD Bundles',
    image: '/assets/hero-portrait.png',
    alt: 'Desert Moon complete 4-piece CBD wellness kit',
  },
];

export function CategoryShowcase({ onOpenShop }: CategoryShowcaseProps) {
  const { t } = useLanguage();
  const [selectedPill, setSelectedPill] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);

  const visibleCount = 4;
  const maxOffset = Math.max(0, CATEGORY_CARDS.length - visibleCount);

  const handlePrev = () => {
    setSelectedPill(null);
    setOffset((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setSelectedPill(null);
    setOffset((prev) => Math.min(maxOffset, prev + 1));
  };

  const handlePillClick = (pillId: string) => {
    if (selectedPill === pillId) {
      setSelectedPill(null);
      setOffset(0);
      return;
    }
    setSelectedPill(pillId);
    const idx = CATEGORY_CARDS.findIndex((c) => c.id === pillId);
    if (idx !== -1) {
      if (idx < offset) {
        setOffset(idx);
      } else if (idx >= offset + visibleCount) {
        setOffset(idx - visibleCount + 1);
      }
    }
  };

  const visibleCards = CATEGORY_CARDS.slice(offset, offset + visibleCount);

  return (
    <section
      id="categories"
      aria-label="Shop by Category"
      className="w-full bg-white py-16 sm:py-20 lg:pt-[68px] lg:pb-[96px]"
    >
      <div className="w-full max-w-[1598px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Row: Editorial Headline + First-Order Discount Callout */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <h2 className="text-[36px] sm:text-[46px] lg:text-[52px] xl:text-[56px] leading-[1.13] tracking-[-0.025em] font-medium text-[#1E1624]">
                <span className="block">
                  {t.categoryShowcase.line1Sans}{' '}
                  <em className="font-editorial italic font-normal tracking-[-0.01em] text-[#7A548F]">
                    {t.categoryShowcase.line1Italic}
                  </em>
                </span>
                <span className="block">
                  <em className="font-editorial italic font-normal tracking-[-0.01em] text-[#7A548F]">
                    {t.categoryShowcase.line2Italic}
                  </em>{' '}
                  {t.categoryShowcase.line2Sans}
                </span>
                <span className="block">{t.categoryShowcase.line3}</span>
              </h2>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 lg:pt-1">
              <p className="text-[12px] sm:text-[12.5px] uppercase tracking-[0.02em] text-[#7A548F] font-medium">
                {t.categoryShowcase.promo}
              </p>
              <button
                type="button"
                onClick={() => onOpenShop('All')}
                className="mt-6 inline-flex items-center justify-center h-[46px] px-7 rounded-full border border-[#7A548F] bg-white text-[12px] uppercase tracking-[0.03em] text-[#7A548F] font-normal hover:bg-[#7A548F] hover:text-white transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A548F]"
              >
                {t.categoryShowcase.shopNow}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Pills + Carousel Navigation Arrows */}
        <ScrollReveal delay={0.08} y={24}>
          <div className="mt-14 lg:mt-[84px] flex flex-wrap items-center justify-between gap-4">
            <div
              role="tablist"
              aria-label="Filter CBD categories"
              className="flex items-center gap-2.5 flex-wrap"
            >
              {CATEGORY_CARDS.map((pill) => {
                const isSelected = selectedPill === pill.id;
                const label = t.categoryShowcase.pills[pill.category];
                return (
                  <button
                    key={pill.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handlePillClick(pill.id)}
                    className={`h-[44px] sm:h-[46px] px-5 sm:px-6 rounded-full border text-[11.5px] sm:text-[12px] uppercase tracking-[0.025em] font-normal whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F] ${
                      isSelected
                        ? 'border-[#7A548F] bg-[#7A548F] text-white'
                        : 'border-[#7A548F]/40 bg-white text-[#1E1624] hover:bg-[#F2ECF6] hover:border-[#7A548F]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2.5 shrink-0 ml-auto">
              <button
                type="button"
                onClick={handlePrev}
                disabled={offset === 0}
                aria-label="Previous categories"
                className={`w-[44px] h-[44px] rounded-full border bg-white flex items-center justify-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F] ${
                  offset === 0
                    ? 'border-black/10 text-black/45 cursor-default'
                    : 'border-[#7A548F]/30 text-[#7A548F] hover:border-[#7A548F]'
                }`}
              >
                <ChevronLeft className="w-[16px] h-[16px] stroke-[1.6]" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={offset >= maxOffset}
                aria-label="Next categories"
                className={`w-[44px] h-[44px] rounded-full border bg-white flex items-center justify-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F] ${
                  offset >= maxOffset
                    ? 'border-black/10 text-black/45 cursor-default'
                    : 'border-[#7A548F]/30 text-[#7A548F] hover:border-[#7A548F]'
                }`}
              >
                <ChevronRight className="w-[16px] h-[16px] stroke-[1.6]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 4-Column Category Photo Cards */}
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleCards.map((card, index) => {
            const isHighlighted = selectedPill === card.id;
            const label = t.categoryShowcase.pills[card.category];
            return (
              <ScrollReveal key={card.id} delay={index * 0.08} y={34}>
                <button
                  type="button"
                  onClick={() => onOpenShop(card.category)}
                  className={`group relative aspect-[352/430] w-full rounded-[16px] overflow-hidden bg-[#F5F2F7] text-left block transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A548F] ${
                    isHighlighted ? 'ring-2 ring-[#7A548F] ring-offset-2' : ''
                  }`}
                >
                  <img
                    src={card.image}
                    alt={card.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Bottom white category label pill + separate white circular arrow button */}
                  <div className="absolute bottom-[15px] inset-x-[15px] flex items-center gap-[3px]">
                    <span className="flex-1 h-[44px] rounded-full bg-white text-[#1E1624] flex items-center justify-center px-4 text-[11.5px] sm:text-[12px] uppercase tracking-[0.03em] font-normal whitespace-nowrap shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-colors duration-200 group-hover:bg-[#F2ECF6] group-hover:text-[#7A548F]">
                      {label}
                    </span>

                    <span
                      aria-hidden="true"
                      className="w-[44px] h-[44px] rounded-full bg-white text-[#7A548F] flex items-center justify-center shrink-0 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-colors duration-200 group-hover:bg-[#7A548F] group-hover:text-white"
                    >
                      <ArrowUpRight className="w-[15px] h-[15px] stroke-[1.6] transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
