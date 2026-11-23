import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import {
  getProductById,
  type ProductCategory,
  type SkincareProduct,
} from '../data/products';
import { ScrollReveal } from './ScrollReveal';
import { pickText, useLanguage } from '../i18n';

interface ExploreFaceWashProps {
  onOpenShop: (category?: ProductCategory) => void;
  onSelectProduct: (product: SkincareProduct) => void;
  onAddToCart: (product: SkincareProduct) => void;
}

const CBD_OIL_CAROUSEL_IDS = [
  'cbd-cbn-sleep-aid',
  'cbd-collagen-beauty',
  'cbd-traditional-oil',
  'cbd-broad-spectrum',
] as const;

const FEATURED_PRODUCTS: SkincareProduct[] = CBD_OIL_CAROUSEL_IDS.map((id) =>
  getProductById(id)
).filter((product): product is SkincareProduct => Boolean(product));

export function ExploreFaceWash({
  onOpenShop,
  onSelectProduct,
  onAddToCart,
}: ExploreFaceWashProps) {
  const { lang, t } = useLanguage();
  const [offset, setOffset] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);

  const visibleCount = 4;
  const maxOffset = Math.max(0, FEATURED_PRODUCTS.length - visibleCount);
  const visibleItems = FEATURED_PRODUCTS.slice(offset, offset + visibleCount);

  const handleBagClick = (item: SkincareProduct) => {
    onAddToCart(item);
    setAddedId(item.id);
    window.setTimeout(() => {
      setAddedId((curr) => (curr === item.id ? null : curr));
    }, 1200);
  };

  return (
    <section
      id="explore-cbd-oils"
      aria-label="Explore CBD Oils Collection"
      className="w-full bg-white py-16 sm:py-20 lg:pt-[120px] lg:pb-[112px]"
    >
      <div className="w-full max-w-[1598px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Control & Editorial Header Row */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-[26%_28%_1fr_auto] gap-y-8 lg:gap-x-6 items-start">
            {/* Far Left: EXPLORE COLLECTION outline pill */}
            <div className="lg:pt-3">
              <button
                type="button"
                onClick={() => onOpenShop('CBD Tinctures')}
                className="inline-flex items-center justify-center min-w-[197px] h-[48px] px-7 rounded-full border border-[#7A548F] bg-white text-[12px] uppercase tracking-[0.025em] text-[#7A548F] font-normal hover:bg-[#7A548F] hover:text-white transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A548F]"
              >
                {t.carousels.cta}
              </button>
            </div>

            {/* Center-Left: Explore / CBD Oils + delicate arching arrow */}
            <div className="relative lg:pl-4">
              <h2 className="leading-[1.06] tracking-[-0.02em]">
                <span className="block text-[34px] sm:text-[38px] lg:text-[41px] font-medium text-[#C8B9D3]">
                  {t.carousels.exploreLabel}
                </span>
                <span className="block text-[36px] sm:text-[40px] lg:text-[44px] font-editorial italic font-normal text-[#7A548F] mt-0.5">
                  {t.carousels.oilsTitle}
                </span>
              </h2>

              {/* Delicate curved arrow sweeping right and down toward card 2 */}
              <svg
                viewBox="0 0 148 96"
                fill="none"
                aria-hidden="true"
                className="hidden lg:block pointer-events-none absolute top-[32px] left-[138px] xl:left-[144px] w-[124px] xl:w-[138px] h-auto text-[#7A548F]"
              >
                <path
                  d="M2 14C56 -4 126 4 138 88"
                  stroke="currentColor"
                  strokeWidth="0.95"
                  strokeLinecap="round"
                />
                <path
                  d="M134 83.5L138.2 89.2L141.5 82.8"
                  stroke="currentColor"
                  strokeWidth="0.95"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Center-Right: Uppercase 3-line product description */}
            <div className="lg:pt-2.5 lg:pl-6">
              <p className="text-[11.5px] sm:text-[12px] leading-[1.85] tracking-[0.015em] uppercase text-[#1E1624] font-normal max-w-[335px]">
                {t.carousels.oilsDesc}
              </p>
            </div>

            {/* Far Right: Circular Carousel Arrows */}
            <div className="flex items-center gap-2.5 lg:pt-3 justify-self-start lg:justify-self-end shrink-0">
              <button
                type="button"
                onClick={() => setOffset((prev) => Math.max(0, prev - 1))}
                disabled={offset === 0}
                aria-label="Previous products"
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
                onClick={() => setOffset((prev) => Math.min(maxOffset, prev + 1))}
                disabled={offset >= maxOffset}
                aria-label="Next products"
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

        {/* 4-Column Product Card Grid */}
        <div className="mt-12 lg:mt-[68px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleItems.map((item, index) => {
            const isAdded = addedId === item.id;
            const title = pickText(item.name, lang);
            const displayTitle = pickText(item.displayTitle, lang);
            const badge = pickText(item.badge, lang);
            const variant = pickText(item.variant, lang);
            return (
              <ScrollReveal key={item.id} delay={index * 0.08} y={32}>
                <article className="group flex flex-col">
                  {/* Soft Lavender Mist Studio Image Frame (#F5F2F7) */}
                  <div className="relative aspect-[352/469] w-full rounded-[10px] bg-[#F5F2F7] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(item)}
                      aria-label={`View ${displayTitle}`}
                      className="w-full h-full block focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#7A548F]"
                    >
                      <img
                        src={item.image}
                        alt={displayTitle}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </button>

                    {/* Top-left category label */}
                    <span className="pointer-events-none absolute top-[12px] left-[12px] h-[24px] px-3 rounded-full bg-white text-[10px] uppercase tracking-[0.03em] text-[#7A548F] font-medium flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                      {badge}
                    </span>

                    {/* Top-right circular shopping bag quick-add action */}
                    <button
                      type="button"
                      onClick={() => handleBagClick(item)}
                      aria-label={`Add ${title} to bag`}
                      className={`absolute top-[10px] right-[10px] w-[30px] h-[30px] rounded-full flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F] ${
                        isAdded
                          ? 'bg-[#7A548F] text-white'
                          : 'bg-white text-[#7A548F] hover:bg-[#7A548F] hover:text-white'
                      }`}
                    >
                      {isAdded ? (
                        <Check className="w-[14px] h-[14px] stroke-[2]" aria-hidden="true" />
                      ) : (
                        <ShoppingBag className="w-[14px] h-[14px] stroke-[1.6]" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  {/* Product Metadata Below Card */}
                  <div className="mt-3.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(item)}
                        className="text-left text-[12.5px] uppercase tracking-[0.02em] text-[#1E1624] font-normal hover:text-[#7A548F] transition-colors truncate"
                      >
                        {title}
                      </button>
                      <span className="text-[12.5px] tabular-nums text-[#7A548F] font-medium whitespace-nowrap shrink-0">
                        {item.priceDisplay}
                      </span>
                    </div>
                    <div className="mt-1 text-[10.5px] uppercase tracking-[0.03em] text-neutral-400 font-normal">
                      {variant}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
