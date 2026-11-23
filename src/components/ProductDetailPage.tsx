import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  Star,
} from 'lucide-react';
import {
  BITPAN_PRODUCTS,
  getProductById,
  type ProductCategory,
  type SkincareProduct,
} from '../data/products';
import type { ActiveDrawer } from './Header';
import { NewsletterGuarantees } from './NewsletterGuarantees';
import { ScrollReveal } from './ScrollReveal';
import { pickText, useLanguage } from '../i18n';

export interface AddToCartOptions {
  color?: string;
  packSize?: string;
  quantity?: number;
  openCart?: boolean;
}

interface ProductDetailPageProps {
  product: SkincareProduct;
  inCartCount: number;
  onBackHome: () => void;
  onSelectProduct: (product: SkincareProduct) => void;
  onOpenShop: (category?: ProductCategory) => void;
  onOpenDrawer: (drawer: ActiveDrawer) => void;
  onAddToCart: (product: SkincareProduct, options?: AddToCartOptions) => void;
}

type DetailTab = 'description' | 'reviews' | 'care' | 'faqs';

interface CustomerReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  body: string;
}

function ReturnShipMiniIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 30 28" fill="none" aria-hidden="true">
      <path d="M11 8V5.5H14.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 13V8.2H18.5L21 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 13H24.5L22.2 18.5H7.8L5.5 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 22C6.2 20.8 7.8 20.8 9.5 22C11.2 23.2 12.8 23.2 14.5 22C16.2 20.8 17.8 20.8 19.5 22C21.2 23.2 22.8 23.2 24.5 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FreeShipBulbMiniIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M11.2 19.5V17.4C9.1 16.3 7.8 14.2 7.8 11.8C7.8 8.4 10.6 5.6 14 5.6C17.4 5.6 20.2 8.4 20.2 11.8C20.2 14.2 18.9 16.3 16.8 17.4V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.2 19.5H16.8M12 22H16M13.2 24H14.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 2.5V3.8M22.2 6L21.2 7M5.8 6L6.8 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function QualitySproutMiniIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 30 28" fill="none" aria-hidden="true">
      <path d="M15 20V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 12.5C15 9 12.2 6.8 8.5 7C8.5 10.8 10.9 13.2 15 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M15 14.5C15 11.2 17.7 9 21.5 9.2C21.5 12.8 19.1 15.1 15 14.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7.5 22.5C9.8 20.2 12.3 19.2 15 19.2C17.7 19.2 20.2 20.2 22.5 22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function VeganHeartMiniIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 22.2C14 22.2 6.5 17.5 6.5 11.5C6.5 8.8 8.6 6.8 11.1 6.8C12.6 6.8 13.6 7.5 14 8.3C14.4 7.5 15.4 6.8 16.9 6.8C19.4 6.8 21.5 8.8 21.5 11.5C21.5 13 20.9 14.4 20 15.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.5 18.2V22.8M17.2 20.5H21.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const BADGE_ICONS = [
  ReturnShipMiniIcon,
  FreeShipBulbMiniIcon,
  QualitySproutMiniIcon,
  VeganHeartMiniIcon,
];

export function ProductDetailPage({
  product,
  inCartCount,
  onBackHome,
  onSelectProduct,
  onOpenShop,
  onOpenDrawer,
  onAddToCart,
}: ProductDetailPageProps) {
  const { lang, t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? '1500MG');
  const [selectedPackSize, setSelectedPackSize] = useState(product.packSizes[0] ?? '1 BOTTLE');
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<DetailTab>('description');
  const [relatedOffset, setRelatedOffset] = useState(0);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);
  const [customReviews, setCustomReviews] = useState<CustomerReview[]>([]);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const tabsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColor(product.colors[0] ?? '1500MG');
    setSelectedPackSize(product.packSizes[0] ?? '1 BOTTLE');
    setQty(1);
    setActiveTab('description');
    setRelatedOffset(0);
  }, [product.id]);

  const reviews: CustomerReview[] = [...customReviews, ...t.pdp.initialReviews];
  const displayTitle = pickText(product.displayTitle, lang);
  const productName = pickText(product.name, lang);
  const productBadge = pickText(product.badge, lang);
  const shortDescription = pickText(product.shortDescription, lang);

  const gallery = product.gallery.length > 0 ? product.gallery : [product.image];
  const pairedProduct =
    getProductById(product.pairWithId) ??
    BITPAN_PRODUCTS.find((p) => p.id !== product.id) ??
    product;

  const relatedProducts = BITPAN_PRODUCTS.filter((p) => p.id !== product.id);
  const visibleRelatedCount = 4;
  const maxRelatedOffset = Math.max(0, relatedProducts.length - visibleRelatedCount);
  const visibleRelated = relatedProducts.slice(
    relatedOffset,
    relatedOffset + visibleRelatedCount
  );

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const handleAddCurrentToCart = () => {
    onAddToCart(product, {
      color: selectedColor,
      packSize: selectedPackSize,
      quantity: qty,
      openCart: true,
    });
  };

  const handleJumpToReviews = () => {
    setActiveTab('reviews');
    tabsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewBody.trim()) return;
    setCustomReviews((prev) => [
      {
        id: `rev-${Date.now()}`,
        author: reviewAuthor.trim(),
        date: lang === 'pt' ? 'Agora' : 'Just now',
        rating: 5,
        title: reviewTitle.trim() || (lang === 'pt' ? 'Avaliação Verificada' : 'Verified CBD Review'),
        body: reviewBody.trim(),
      },
      ...prev,
    ]);
    setReviewAuthor('');
    setReviewTitle('');
    setReviewBody('');
  };

  const handleRelatedQuickAdd = (item: SkincareProduct) => {
    onAddToCart(item, {
      color: item.colors[0] ?? pickText(item.variant, lang),
      packSize: item.packSizes[0],
      quantity: 1,
      openCart: false,
    });
    setQuickAddedId(item.id);
    window.setTimeout(() => {
      setQuickAddedId((curr) => (curr === item.id ? null : curr));
    }, 1100);
  };

  return (
    <div className="w-full bg-white text-[#1E1624]">
      {/* Section 1: Product Gallery + Contiguous Purchase Module */}
      <section aria-label={displayTitle} className="w-full pt-3 pb-16 lg:pb-20">
        <div className="w-full max-w-[1598px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[55.6%_1fr] gap-10 xl:gap-[68px] items-start">
            {/* Left: 4 Vertical Thumbnails + Main Product Image Stage */}
            <div className="flex flex-col-reverse sm:flex-row gap-4 xl:gap-5 lg:sticky lg:top-[96px]">
              {/* Vertical Thumbnail Strip */}
              <div className="grid grid-cols-4 sm:flex sm:flex-col gap-3.5 sm:w-[96px] xl:w-[124px] shrink-0">
                {gallery.map((imgSrc, idx) => {
                  const isActive = idx === activeImageIndex;
                  return (
                    <button
                      key={`${product.id}-thumb-${idx}`}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`View image ${idx + 1} of ${displayTitle}`}
                      aria-pressed={isActive}
                      className={`relative aspect-square w-full overflow-hidden bg-[#F5F2F7] transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F] ${
                        isActive ? 'ring-1 ring-[#7A548F]' : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgSrc}
                        alt={`${displayTitle} thumbnail ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center block"
                      />
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-[#7A548F]/10 pointer-events-none"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Large Main Product Showcase */}
              <div
                className={`relative flex-1 aspect-[678/800] overflow-hidden ${
                  product.bgColor === '#F3F3F3' ? 'bg-[#F3F3F3]' : 'bg-[#F5F2F7]'
                }`}
              >
                <img
                  src={gallery[activeImageIndex]}
                  alt={`${displayTitle} — view ${activeImageIndex + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center block transition-opacity duration-300"
                />

                <button
                  type="button"
                  onClick={handlePrevImage}
                  aria-label="Previous product image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-[38px] h-[38px] bg-white/95 text-[#7A548F] flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:bg-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F]"
                >
                  <ChevronLeft className="w-[15px] h-[15px] stroke-[1.6]" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={handleNextImage}
                  aria-label="Next product image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-[38px] h-[38px] bg-white/95 text-[#7A548F] flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:bg-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F]"
                >
                  <ChevronRight className="w-[15px] h-[15px] stroke-[1.6]" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="lg:pt-7">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-[11px] uppercase tracking-[0.03em]">
                <button
                  type="button"
                  onClick={onBackHome}
                  className="text-[#1E1624] hover:text-[#7A548F] transition-colors"
                >
                  {t.pdp.home}
                </button>
                <span className="text-neutral-400" aria-hidden="true">/</span>
                <button
                  type="button"
                  onClick={() => onOpenShop(product.category)}
                  className="text-[#1E1624] hover:text-[#7A548F] transition-colors"
                >
                  {productBadge}
                </button>
                <span className="text-neutral-400" aria-hidden="true">/</span>
                <span className="text-[#7A548F]">{productName}</span>
              </nav>

              {/* Editorial Italic Serif Product Title */}
              <h1 className="mt-3 font-editorial italic font-normal text-[44px] sm:text-[52px] leading-[1.08] tracking-[-0.015em] text-[#1E1624]">
                {displayTitle}
              </h1>

              {/* Category Pill + Price + Star Ratings */}
              <div className="mt-5 flex flex-wrap items-center gap-3.5 sm:gap-4">
                <span className="inline-flex items-center justify-center h-[34px] px-5 rounded-full bg-[#7A548F] text-white text-[11px] uppercase tracking-[0.03em] font-normal whitespace-nowrap">
                  {productBadge}
                </span>

                <span className="text-[20px] font-medium tabular-nums text-[#7A548F]">
                  ${product.price.toFixed(2)}
                </span>

                <span className="text-neutral-400 text-[15px]" aria-hidden="true">/</span>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-[#7A548F]" aria-label="Rated 5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-[12px] h-[12px] fill-[#7A548F] stroke-[#7A548F]" aria-hidden="true" />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleJumpToReviews}
                    className="text-[11px] uppercase tracking-[0.025em] underline underline-offset-[3px] text-[#1E1624] hover:text-[#7A548F] transition-colors whitespace-nowrap"
                  >
                    ({reviews.length} {t.pdp.reviewsLink})
                  </button>
                </div>
              </div>

              {/* Short Uppercase Summary */}
              <p className="mt-6 text-[11.5px] sm:text-[12px] leading-[1.85] tracking-[0.015em] uppercase text-[#1E1624] font-normal max-w-[540px]">
                {shortDescription}
              </p>

              {/* FORMULA Variant Selector */}
              <div className="mt-7">
                <div className="text-[11.5px] uppercase tracking-[0.03em] text-[#1E1624] mb-2.5">
                  {t.pdp.formulaLabel}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        aria-pressed={isSelected}
                        className={`min-w-[58px] h-[34px] px-3.5 border text-[11px] uppercase tracking-[0.025em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F] ${
                          isSelected
                            ? 'bg-[#7A548F] border-[#7A548F] text-white'
                            : 'bg-white border-[#7A548F]/30 text-[#1E1624] hover:border-[#7A548F]'
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PACK SIZE Variant Selector */}
              <div className="mt-5">
                <div className="text-[11.5px] uppercase tracking-[0.03em] text-[#1E1624] mb-2.5">
                  {t.pdp.packSizeLabel}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {product.packSizes.map((size) => {
                    const isSelected = selectedPackSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedPackSize(size)}
                        aria-pressed={isSelected}
                        className={`min-w-[66px] h-[34px] px-3.5 border text-[11px] uppercase tracking-[0.025em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F] ${
                          isSelected
                            ? 'bg-[#7A548F] border-[#7A548F] text-white'
                            : 'bg-white border-[#7A548F]/30 text-[#1E1624] hover:border-[#7A548F]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* QTY Stepper */}
              <div className="mt-8 flex items-center gap-4">
                <span className="text-[11.5px] uppercase tracking-[0.03em] text-[#1E1624] mr-2">
                  {t.pdp.qtyLabel}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  aria-label="Decrease quantity"
                  className="w-[34px] h-[34px] rounded-full border border-[#7A548F]/30 flex items-center justify-center text-[#7A548F] hover:border-[#7A548F] transition-colors"
                >
                  <Minus className="w-3 h-3 stroke-[1.7]" />
                </button>
                <span className="w-6 text-center text-[13px] font-normal tabular-nums text-[#1E1624]">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((prev) => prev + 1)}
                  aria-label="Increase quantity"
                  className="w-[34px] h-[34px] rounded-full border border-[#7A548F]/30 flex items-center justify-center text-[#7A548F] hover:border-[#7A548F] transition-colors"
                >
                  <Plus className="w-3 h-3 stroke-[1.7]" />
                </button>
              </div>

              {/* Wide Rounded ADD TO CART Button */}
              <div className="mt-7 space-y-2.5">
                <button
                  type="button"
                  onClick={handleAddCurrentToCart}
                  className="w-full h-[54px] rounded-full border-[1.5px] border-[#7A548F] bg-[#7A548F] text-white hover:bg-[#5C3D6E] hover:border-[#5C3D6E] transition-colors duration-200 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A548F]"
                >
                  <span className="text-[12px] uppercase tracking-[0.035em] font-medium underline underline-offset-[4px]">
                    {inCartCount > 0
                      ? `${t.pdp.addToCart} (${inCartCount} ${t.pdp.inCartSuffix})`
                      : t.pdp.addToCart}
                  </span>
                </button>

                {inCartCount > 0 && (
                  <button
                    type="button"
                    onClick={() => onOpenDrawer('cart')}
                    className="w-full py-2 text-[11px] uppercase tracking-[0.03em] text-[#7A548F] hover:text-[#5C3D6E] underline underline-offset-4 transition-colors"
                  >
                    {t.pdp.viewBag}
                  </button>
                )}
              </div>

              {/* PAIR IT WITH Recommendation Box */}
              <div className="mt-8 rounded-[10px] bg-[#F5F2F7] p-5">
                <div className="text-[11.5px] uppercase tracking-[0.03em] font-medium text-[#7A548F] mb-4">
                  {t.pdp.pairWith}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(pairedProduct)}
                      className="w-[66px] h-[82px] bg-white rounded-[4px] overflow-hidden shrink-0 block"
                    >
                      <img
                        src={pairedProduct.image}
                        alt={pickText(pairedProduct.displayTitle, lang)}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center block"
                      />
                    </button>

                    <div className="min-w-0">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(pairedProduct)}
                        className="text-left text-[12px] uppercase tracking-[0.025em] text-[#1E1624] font-normal hover:text-[#7A548F] transition-colors block truncate"
                      >
                        {pickText(pairedProduct.name, lang)}
                      </button>
                      <div className="text-[11px] uppercase tracking-[0.025em] text-[#5B5566] mt-0.5">
                        {pickText(pairedProduct.variant, lang)}
                      </div>
                      <div className="text-[12.5px] tabular-nums text-[#7A548F] font-medium mt-3">
                        ${pairedProduct.price.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectProduct(pairedProduct)}
                    className="h-[38px] px-5 rounded-full bg-[#7A548F] text-white text-[10.5px] uppercase tracking-[0.03em] hover:bg-[#5C3D6E] transition-colors whitespace-nowrap shrink-0"
                  >
                    {t.pdp.selectOptions}
                  </button>
                </div>
              </div>

              {/* 4 Circular Brand Assurance Badges */}
              <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-5 text-center">
                {t.pdp.badges.map(([line1, line2], idx) => {
                  const Icon = BADGE_ICONS[idx] ?? QualitySproutMiniIcon;
                  return (
                    <div key={line1} className="flex flex-col items-center">
                      <div className="w-[54px] h-[54px] rounded-full bg-[#F5F2F7] text-[#7A548F] flex items-center justify-center">
                        <Icon />
                      </div>
                      <span className="mt-3 text-[10.5px] leading-[1.45] uppercase tracking-[0.02em] text-[#1E1624]">
                        {line1}
                        {line2 && (
                          <>
                            <br />
                            {line2}
                          </>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: "all about the PRODUCT" Tabbed Editorial Details */}
      <section
        ref={tabsSectionRef}
        aria-label="All about the product"
        className="w-full bg-white"
      >
        <div className="w-full max-w-[1598px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="border-t border-[#7A548F]/15 pt-16 sm:pt-20 pb-20 lg:pb-24">
            {/* Centered Editorial Header */}
            <ScrollReveal className="text-center">
              <h2 className="text-[#1E1624]">
                <span className="block font-editorial italic font-normal text-[40px] sm:text-[50px] leading-[1.06] text-[#7A548F]">
                  {t.pdp.allAboutItalic}
                </span>
                <span className="block text-[34px] sm:text-[42px] font-normal tracking-[0.04em] uppercase leading-[1.15] mt-1">
                  {t.pdp.allAboutCaps}
                </span>
              </h2>
            </ScrollReveal>

            {/* Full-Width Rounded Pill Tab Selector */}
            <ScrollReveal delay={0.08} y={20} className="mt-12 lg:mt-14">
              <div
                role="tablist"
                aria-label="Product information tabs"
                className="w-full bg-[#F5F2F7] rounded-[28px] sm:rounded-full grid grid-cols-2 sm:grid-cols-4 overflow-hidden"
              >
                {(
                  [
                    { id: 'description', label: t.pdp.tabs.description },
                    { id: 'reviews', label: t.pdp.tabs.reviews },
                    { id: 'care', label: t.pdp.tabs.care },
                    { id: 'faqs', label: t.pdp.tabs.faqs },
                  ] as { id: DetailTab; label: string }[]
                ).map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(tab.id)}
                      className={`h-[52px] sm:h-[56px] rounded-full text-[11px] sm:text-[11.5px] uppercase tracking-[0.03em] transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#7A548F] ${
                        isActive
                          ? 'bg-[#7A548F] text-white font-medium'
                          : 'bg-transparent text-[#1E1624] hover:text-[#7A548F] font-normal'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Tab Panels: 2-Column Editorial Image Left + Structured Details Right */}
            <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
              {/* Left Editorial Portrait */}
              <ScrollReveal className="w-full aspect-[620/660] bg-[#F5F2F7] overflow-hidden">
                <img
                  src={product.editorialImage}
                  alt={`${displayTitle} editorial ritual`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center block"
                />
              </ScrollReveal>

              {/* Right Dynamic Tab Panel */}
              <ScrollReveal delay={0.1} className="lg:pt-2">
                {activeTab === 'description' && (
                  <div className="max-w-[540px]">
                    <h3 className="text-[34px] sm:text-[40px] leading-[1.1] tracking-[-0.02em] text-[#1E1624]">
                      <span className="block font-medium">{t.pdp.detailsHeading1}</span>
                      <span className="block font-editorial italic font-normal mt-0.5 text-[#7A548F]">
                        {t.pdp.detailsHeading2}
                      </span>
                    </h3>

                    <p className="mt-7 text-[11.5px] sm:text-[12px] leading-[1.9] tracking-[0.015em] uppercase text-[#1E1624]">
                      {shortDescription}
                    </p>

                    <div className="mt-8">
                      <h4 className="text-[11.5px] uppercase tracking-[0.03em] text-[#7A548F] font-medium">
                        {t.pdp.productDetails}
                      </h4>
                      <ul className="mt-4 space-y-2.5 text-[11px] sm:text-[11.5px] leading-[1.75] tracking-[0.015em] uppercase text-[#1E1624]">
                        {product.details[lang].map((line, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span aria-hidden="true" className="mt-[2px] text-[#7A548F]">•</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <h4 className="text-[11.5px] uppercase tracking-[0.03em] text-[#7A548F] font-medium">
                        {t.pdp.productFeatures}
                      </h4>
                      <ul className="mt-4 space-y-2.5 text-[11px] sm:text-[11.5px] leading-[1.75] tracking-[0.015em] uppercase text-[#1E1624]">
                        {product.features[lang].map((line, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span aria-hidden="true" className="mt-[2px] text-[#7A548F]">•</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="max-w-[540px]">
                    <h3 className="text-[34px] sm:text-[40px] leading-[1.1] tracking-[-0.02em] text-[#1E1624]">
                      <span className="block font-medium">{t.pdp.customerHeading1}</span>
                      <span className="block font-editorial italic font-normal mt-0.5 text-[#7A548F]">
                        {t.pdp.customerHeading2} ({reviews.length})
                      </span>
                    </h3>

                    <div className="mt-7 divide-y divide-[#7A548F]/15">
                      {reviews.map((rev) => (
                        <div key={rev.id} className="py-5 first:pt-0">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-1 text-[#7A548F]">
                              {Array.from({ length: rev.rating }).map((_, idx) => (
                                <Star key={idx} className="w-3 h-3 fill-[#7A548F] stroke-[#7A548F]" />
                              ))}
                            </div>
                            <span className="text-[11px] uppercase tracking-[0.02em] text-neutral-500">
                              {rev.author} · {rev.date}
                            </span>
                          </div>
                          <div className="mt-2 text-[13px] font-medium uppercase tracking-[0.02em] text-[#1E1624]">
                            {rev.title}
                          </div>
                          <p className="mt-1.5 text-[12.5px] leading-[1.7] text-[#5B5566]">
                            {rev.body}
                          </p>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleReviewSubmit} className="mt-8 pt-6 border-t border-[#7A548F]/15 space-y-3">
                      <div className="text-[11.5px] uppercase tracking-[0.03em] font-medium text-[#7A548F]">
                        {t.pdp.writeReview}
                      </div>
                      <input
                        type="text"
                        required
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        placeholder={t.pdp.yourName}
                        className="w-full h-10 px-4 border border-[#7A548F]/25 text-[12px] focus:outline-none focus:border-[#7A548F]"
                      />
                      <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder={t.pdp.reviewHeadline}
                        className="w-full h-10 px-4 border border-[#7A548F]/25 text-[12px] focus:outline-none focus:border-[#7A548F]"
                      />
                      <textarea
                        rows={3}
                        required
                        value={reviewBody}
                        onChange={(e) => setReviewBody(e.target.value)}
                        placeholder={t.pdp.shareExperience}
                        className="w-full p-3.5 border border-[#7A548F]/25 text-[12px] focus:outline-none focus:border-[#7A548F] resize-none"
                      />
                      <button
                        type="submit"
                        className="h-10 px-6 rounded-full bg-[#7A548F] text-white text-[11px] uppercase tracking-[0.03em] hover:bg-[#5C3D6E] transition-colors"
                      >
                        {t.pdp.submitReview}
                      </button>
                    </form>
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className="max-w-[540px]">
                    <h3 className="text-[34px] sm:text-[40px] leading-[1.1] tracking-[-0.02em] text-[#1E1624]">
                      <span className="block font-medium">{t.pdp.careHeading1}</span>
                      <span className="block font-editorial italic font-normal mt-0.5 text-[#7A548F]">
                        {t.pdp.careHeading2}
                      </span>
                    </h3>
                    <div className="mt-7 space-y-5 text-[12px] leading-[1.9] tracking-[0.015em] uppercase text-[#1E1624]">
                      <p>{t.pdp.careIntro}</p>
                      <ul className="space-y-2.5">
                        {t.pdp.careBullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'faqs' && (
                  <div className="max-w-[540px]">
                    <h3 className="text-[34px] sm:text-[40px] leading-[1.1] tracking-[-0.02em] text-[#1E1624]">
                      <span className="block font-medium">{t.pdp.faqHeading1}</span>
                      <span className="block font-editorial italic font-normal mt-0.5 text-[#7A548F]">
                        {t.pdp.faqHeading2}
                      </span>
                    </h3>
                    <div className="mt-7 divide-y divide-[#7A548F]/15">
                      {t.pdp.faqs.map((faq, idx) => {
                        const isOpen = openFaqIdx === idx;
                        return (
                          <div key={faq.q} className="py-4">
                            <button
                              type="button"
                              onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                              aria-expanded={isOpen}
                              className="w-full flex items-center justify-between gap-4 text-left text-[12px] uppercase tracking-[0.025em] font-medium text-[#1E1624] hover:text-[#7A548F]"
                            >
                              <span>{faq.q}</span>
                              {isOpen ? (
                                <Minus className="w-3.5 h-3.5 shrink-0 text-[#7A548F]" />
                              ) : (
                                <Plus className="w-3.5 h-3.5 shrink-0 text-[#7A548F]" />
                              )}
                            </button>
                            {isOpen && (
                              <p className="mt-3 text-[11.5px] leading-[1.85] tracking-[0.015em] uppercase text-[#5B5566]">
                                {faq.a}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: "Take another look" Related Products Carousel */}
      <section aria-label="Take another look" className="w-full bg-white">
        <div className="w-full max-w-[1598px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="border-t border-[#7A548F]/15 pt-16 sm:pt-20 pb-12">
            <ScrollReveal>
              <div className="flex items-end justify-between gap-6">
                <h2 className="text-[36px] sm:text-[44px] leading-[1.1] tracking-[-0.025em] text-[#1E1624]">
                  <span className="block font-medium">{t.pdp.relatedHeading1}</span>
                  <span className="block font-editorial italic font-normal mt-0.5 text-[#7A548F]">
                    {t.pdp.relatedHeading2}
                  </span>
                </h2>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setRelatedOffset((prev) => Math.max(0, prev - 1))}
                    disabled={relatedOffset === 0}
                    aria-label="Previous related products"
                    className={`w-[44px] h-[44px] rounded-full border bg-white flex items-center justify-center transition-colors duration-150 ${
                      relatedOffset === 0
                        ? 'border-black/10 text-black/45 cursor-default'
                        : 'border-[#7A548F]/30 text-[#7A548F] hover:border-[#7A548F]'
                    }`}
                  >
                    <ChevronLeft className="w-[16px] h-[16px] stroke-[1.6]" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setRelatedOffset((prev) => Math.min(maxRelatedOffset, prev + 1))
                    }
                    disabled={relatedOffset >= maxRelatedOffset}
                    aria-label="Next related products"
                    className={`w-[44px] h-[44px] rounded-full border bg-white flex items-center justify-center transition-colors duration-150 ${
                      relatedOffset >= maxRelatedOffset
                        ? 'border-black/10 text-black/45 cursor-default'
                        : 'border-[#7A548F]/30 text-[#7A548F] hover:border-[#7A548F]'
                    }`}
                  >
                    <ChevronRight className="w-[16px] h-[16px] stroke-[1.6]" />
                  </button>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {visibleRelated.map((item, idx) => {
                const isAdded = quickAddedId === item.id;
                const relTitle = pickText(item.name, lang);
                const relDisplay = pickText(item.displayTitle, lang);
                const relBadge = pickText(item.badge, lang);
                const relVariant = pickText(item.variant, lang);
                return (
                  <ScrollReveal key={item.id} delay={idx * 0.08} y={28}>
                    <article className="group flex flex-col">
                      <div
                        className={`relative aspect-[352/469] w-full rounded-[10px] overflow-hidden ${
                          item.bgColor === '#F3F3F3' ? 'bg-[#F3F3F3]' : 'bg-[#F5F2F7]'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => onSelectProduct(item)}
                          aria-label={`View ${relDisplay}`}
                          className="w-full h-full block"
                        >
                          <img
                            src={item.image}
                            alt={relDisplay}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          />
                        </button>

                        <span className="pointer-events-none absolute top-[12px] left-[12px] h-[24px] px-3 rounded-full bg-white text-[10px] uppercase tracking-[0.03em] text-[#7A548F] font-medium flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                          {relBadge}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleRelatedQuickAdd(item)}
                          aria-label={`Add ${relDisplay} to bag`}
                          className={`absolute top-[10px] right-[10px] w-[30px] h-[30px] rounded-full flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-colors duration-150 ${
                            isAdded
                              ? 'bg-[#7A548F] text-white'
                              : 'bg-white text-[#7A548F] hover:bg-[#7A548F] hover:text-white'
                          }`}
                        >
                          {isAdded ? (
                            <Check className="w-[14px] h-[14px] stroke-[2]" />
                          ) : (
                            <ShoppingBag className="w-[14px] h-[14px] stroke-[1.6]" />
                          )}
                        </button>
                      </div>

                      <div className="mt-3.5">
                        <div className="flex items-baseline justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => onSelectProduct(item)}
                            className="text-left text-[12.5px] uppercase tracking-[0.02em] text-[#1E1624] font-normal hover:text-[#7A548F] transition-colors truncate"
                          >
                            {relTitle}
                          </button>
                          <span className="text-[12.5px] tabular-nums text-[#7A548F] font-medium whitespace-nowrap shrink-0">
                            {item.priceDisplay}
                          </span>
                        </div>
                        <div className="mt-1 text-[10.5px] uppercase tracking-[0.03em] text-neutral-400 font-normal">
                          {relVariant}
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Newsletter + 5 Brand Guarantees */}
      <NewsletterGuarantees onOpenDrawer={onOpenDrawer} />
    </div>
  );
}
