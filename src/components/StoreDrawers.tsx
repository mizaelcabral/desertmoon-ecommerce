import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { BITPAN_PRODUCTS, type ProductCategory, type SkincareProduct } from '../data/products';
import { FOOTER_DRAWER_CONTENT, type InfoDrawerKey } from '../data/footerPages';
import type { ActiveDrawer } from './Header';
import type { AddToCartOptions } from './ProductDetailPage';
import { CATEGORY_LABELS, pickText, useLanguage } from '../i18n';

export interface CartItem {
  key: string;
  product: SkincareProduct;
  color: string;
  packSize: string;
  quantity: number;
}

interface StoreDrawersProps {
  activeDrawer: ActiveDrawer;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onSelectProduct: (product: SkincareProduct) => void;
  onClose: () => void;
  onSwitchDrawer: (drawer: ActiveDrawer) => void;
  cart: CartItem[];
  onAddToCart: (product: SkincareProduct, options?: AddToCartOptions) => void;
  onUpdateQty: (itemKey: string, delta: number) => void;
  onRemoveItem: (itemKey: string) => void;
  onClearCart: () => void;
}

const CATEGORIES: ProductCategory[] = [
  'All',
  'CBD Tinctures',
  'Sleep Aid',
  'CBD Gummies',
  'CBD Topicals',
  'CBD Bundles',
];

export function StoreDrawers({
  activeDrawer,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onClose,
  onSwitchDrawer,
  cart,
  onAddToCart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: StoreDrawersProps) {
  const { lang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [cartStep, setCartStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [checkoutCity, setCheckoutCity] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [accountSignedIn, setAccountSignedIn] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeDrawer !== 'none') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeDrawer, onClose]);

  useEffect(() => {
    if (activeDrawer === 'cart' && cart.length === 0 && cartStep === 'checkout') {
      setCartStep('bag');
    }
  }, [activeDrawer, cart.length, cartStep]);

  if (activeDrawer === 'none') return null;

  const isInfoDrawer = (key: ActiveDrawer): key is InfoDrawerKey =>
    key in FOOTER_DRAWER_CONTENT[lang];
  const activeInfoDrawer = isInfoDrawer(activeDrawer)
    ? FOOTER_DRAWER_CONTENT[lang][activeDrawer]
    : null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 199;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingCost = remainingForFreeShipping === 0 || cart.length === 0 ? 0 : 12;

  const handleQuickAdd = (product: SkincareProduct) => {
    onAddToCart(product, {
      color: product.colors[0] ?? pickText(product.variant, lang),
      packSize: product.packSizes[0],
      quantity: 1,
      openCart: false,
    });
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === product.id ? null : curr));
    }, 1100);
  };

  const filteredProducts =
    selectedCategory === 'All'
      ? BITPAN_PRODUCTS
      : BITPAN_PRODUCTS.filter((p) => p.category === selectedCategory);

  const searchedProducts = BITPAN_PRODUCTS.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name.en.toLowerCase().includes(q) ||
      p.name.pt.toLowerCase().includes(q) ||
      p.displayTitle.en.toLowerCase().includes(q) ||
      p.displayTitle.pt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.keyIngredients.en.toLowerCase().includes(q) ||
      p.keyIngredients.pt.toLowerCase().includes(q) ||
      p.tagline.en.toLowerCase().includes(q) ||
      p.tagline.pt.toLowerCase().includes(q)
    );
  });

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setCartStep('confirmed');
    onClearCart();
    setCheckoutName('');
    setCheckoutEmail('');
    setCheckoutAddress('');
    setCheckoutCity('');
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    setContactSubmitted(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  const handleAccountSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setAccountSignedIn(emailInput.trim());
    setEmailInput('');
  };

  const handleCloseAll = () => {
    if (cartStep === 'confirmed') setCartStep('bag');
    setContactSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1E1624]/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      onClick={handleCloseAll}
    >
      <div
        className="relative w-full max-w-[540px] h-full bg-white text-[#1E1624] shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-[#7A548F]/15 shrink-0">
          <div className="flex items-center gap-3">
            {activeDrawer === 'cart' && cartStep === 'checkout' && (
              <button
                type="button"
                onClick={() => setCartStep('bag')}
                aria-label="Back to shopping bag"
                className="w-8 h-8 rounded-full border border-[#7A548F]/20 flex items-center justify-center hover:bg-[#F2ECF6] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 stroke-[1.6]" />
              </button>
            )}
            <div>
              <h2 className="text-[20px] font-medium tracking-[-0.02em] text-[#1E1624]">
                {activeDrawer === 'shop' && t.drawers.titles.shop}
                {activeDrawer === 'search' && t.drawers.titles.search}
                {activeDrawer === 'cart' &&
                  (cartStep === 'checkout'
                    ? t.drawers.titles.cartCheckout
                    : cartStep === 'confirmed'
                    ? t.drawers.titles.cartConfirmed
                    : t.drawers.titles.cartBag)}
                {activeDrawer === 'account' && t.drawers.titles.account}
                {activeDrawer === 'contact' && t.drawers.titles.contact}
                {activeDrawer === 'philosophy' && t.drawers.titles.philosophy}
                {activeInfoDrawer && activeInfoDrawer.title}
              </h2>
              <p className="text-[12px] text-neutral-500 mt-0.5">
                {activeDrawer === 'shop' && `${filteredProducts.length} ${t.drawers.subtitles.shopCount}`}
                {activeDrawer === 'search' && t.drawers.subtitles.search}
                {activeDrawer === 'cart' &&
                  (cartStep === 'confirmed'
                    ? t.drawers.subtitles.cartConfirmed
                    : cart.length === 0
                    ? t.drawers.subtitles.cartEmpty
                    : `${cart.reduce((s, i) => s + i.quantity, 0)} item(s) · $${(subtotal + shippingCost).toFixed(2)}`)}
                {activeDrawer === 'account' && t.drawers.subtitles.account}
                {activeDrawer === 'contact' && t.drawers.subtitles.contact}
                {activeDrawer === 'philosophy' && t.drawers.subtitles.philosophy}
                {activeInfoDrawer && activeInfoDrawer.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCloseAll}
            aria-label="Close panel"
            className="w-10 h-10 rounded-full border border-[#7A548F]/20 flex items-center justify-center hover:bg-[#F2ECF6] text-[#7A548F] transition-colors"
          >
            <X className="w-4 h-4 stroke-[1.6]" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          {/* SHOP / COLLECTION */}
          {activeDrawer === 'shop' && (
            <div>
              <div className="flex items-center gap-1.5 p-1 bg-[#F5F2F7] rounded-lg mb-6 overflow-x-auto">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => onSelectCategory(category)}
                    className={`px-3.5 py-1.5 text-[12px] font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      selectedCategory === category
                        ? 'bg-[#7A548F] text-white shadow-xs'
                        : 'text-[#5B5566] hover:text-[#7A548F]'
                    }`}
                  >
                    {pickText(CATEGORY_LABELS[category], lang)}
                  </button>
                ))}
              </div>

              <div className="divide-y divide-[#7A548F]/10">
                {filteredProducts.map((product) => {
                  const isJustAdded = recentlyAddedId === product.id;
                  const displayTitle = pickText(product.displayTitle, lang);
                  const tagline = pickText(product.tagline, lang);
                  return (
                    <div key={product.id} className="py-5 first:pt-0 flex items-start gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectProduct(product);
                        }}
                        className="w-[68px] h-[84px] rounded-[6px] bg-[#F5F2F7] overflow-hidden shrink-0 block"
                      >
                        <img
                          src={product.image}
                          alt={displayTitle}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center block"
                        />
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[11px] text-[#7A548F]">
                          <span>{pickText(CATEGORY_LABELS[product.category], lang)}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-neutral-500">{product.volume}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onSelectProduct(product);
                          }}
                          className="mt-1 text-left text-[15px] font-medium text-[#1E1624] hover:text-[#7A548F] hover:underline underline-offset-4 block"
                        >
                          {displayTitle}
                        </button>
                        <p className="mt-1 text-[12.5px] leading-[1.5] text-neutral-600 line-clamp-2">
                          {tagline}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2.5 shrink-0">
                        <span className="text-[14px] font-medium tabular-nums text-[#7A548F]">
                          ${product.price.toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuickAdd(product)}
                          className={`px-3.5 py-2 rounded-full text-[11px] font-medium uppercase tracking-[0.04em] transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                            isJustAdded
                              ? 'bg-[#F2ECF6] text-[#7A548F]'
                              : 'bg-[#7A548F] text-white hover:bg-[#5C3D6E]'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{t.drawers.added}</span>
                            </>
                          ) : (
                            <span>{t.drawers.addToCart}</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SEARCH */}
          {activeDrawer === 'search' && (
            <div>
              <div className="relative mb-6">
                <Search className="w-4 h-4 text-[#7A548F] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.drawers.searchPlaceholder}
                  autoFocus
                  className="w-full h-11 pl-11 pr-4 text-[14px] border border-[#7A548F]/25 rounded-full focus:outline-none focus:border-[#7A548F]"
                />
              </div>

              {searchedProducts.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-[14px] text-neutral-600">
                    {t.drawers.noResults} &ldquo;{searchQuery}&rdquo;.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-3 text-[12px] uppercase tracking-[0.04em] underline underline-offset-4 text-[#7A548F]"
                  >
                    {t.drawers.clearSearch}
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-[#7A548F]/10">
                  {searchedProducts.map((product) => {
                    const displayTitle = pickText(product.displayTitle, lang);
                    const keyIngredients = pickText(product.keyIngredients, lang);
                    return (
                      <div key={product.id} className="py-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onSelectProduct(product);
                            }}
                            className="w-[52px] h-[64px] rounded-[6px] bg-[#F5F2F7] overflow-hidden shrink-0"
                          >
                            <img
                              src={product.image}
                              alt={displayTitle}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-center block"
                            />
                          </button>
                          <div className="min-w-0">
                            <button
                              type="button"
                              onClick={() => {
                                onClose();
                                onSelectProduct(product);
                              }}
                              className="text-left text-[14px] font-medium text-[#1E1624] hover:text-[#7A548F] hover:underline underline-offset-4 block truncate"
                            >
                              {displayTitle}
                            </button>
                            <div className="text-[11.5px] text-neutral-500 mt-0.5 truncate">
                              {pickText(CATEGORY_LABELS[product.category], lang)} · {keyIngredients}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleQuickAdd(product)}
                          className="px-3.5 py-2 rounded-full bg-[#7A548F] text-white text-[11px] font-medium tabular-nums hover:bg-[#5C3D6E] whitespace-nowrap shrink-0"
                        >
                          ${product.price.toFixed(0)} · {t.drawers.addShort}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* CART & CHECKOUT */}
          {activeDrawer === 'cart' && (
            <div className="h-full flex flex-col">
              {cartStep === 'confirmed' ? (
                <div className="my-auto py-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#F2ECF6] text-[#7A548F] mx-auto flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="mt-4 text-[20px] font-medium text-[#1E1624]">
                    {t.drawers.orderConfirmedTitle}
                  </h3>
                  <p className="mt-2 text-[13.5px] text-neutral-600 max-w-xs mx-auto leading-relaxed">
                    {t.drawers.orderConfirmedBody}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCartStep('bag');
                      onSwitchDrawer('shop');
                    }}
                    className="mt-6 px-6 py-3 rounded-full bg-[#7A548F] text-white text-[12px] uppercase tracking-[0.04em] hover:bg-[#5C3D6E]"
                  >
                    {t.drawers.continueExploring}
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="my-auto py-12 text-center">
                  <ShoppingBag className="w-8 h-8 stroke-[1.3] text-[#7A548F]/60 mx-auto" />
                  <p className="mt-4 text-[15px] font-medium text-[#1E1624]">
                    {t.drawers.emptyBagTitle}
                  </p>
                  <p className="mt-1.5 text-[13px] text-neutral-500">
                    {t.drawers.emptyBagBody}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCartStep('bag');
                      onSwitchDrawer('shop');
                    }}
                    className="mt-6 px-6 py-3 rounded-full bg-[#7A548F] text-white text-[12px] uppercase tracking-[0.04em] hover:bg-[#5C3D6E]"
                  >
                    {t.drawers.exploreAll}
                  </button>
                </div>
              ) : cartStep === 'bag' ? (
                <>
                  <div className="p-3.5 bg-[#F2ECF6] text-[12.5px] text-[#5C3D6E] mb-5 rounded-md">
                    {remainingForFreeShipping === 0
                      ? t.drawers.freeShippingUnlocked
                      : `${t.drawers.freeShippingRemainingPrefix} $${remainingForFreeShipping.toFixed(2)} ${t.drawers.freeShippingRemainingSuffix}`}
                  </div>

                  <div className="divide-y divide-[#7A548F]/10 flex-1">
                    {cart.map((item) => {
                      const displayTitle = pickText(item.product.displayTitle, lang);
                      return (
                        <div key={item.key} className="py-4 flex items-start gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onSelectProduct(item.product);
                            }}
                            className="w-[68px] h-[84px] rounded-[6px] bg-[#F5F2F7] overflow-hidden shrink-0 block"
                          >
                            <img
                              src={item.product.image}
                              alt={displayTitle}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-center block"
                            />
                          </button>

                          <div className="flex-1 min-w-0">
                            <button
                              type="button"
                              onClick={() => {
                                onClose();
                                onSelectProduct(item.product);
                              }}
                              className="text-left text-[14px] font-medium text-[#1E1624] hover:text-[#7A548F] hover:underline underline-offset-4 block truncate"
                            >
                              {displayTitle}
                            </button>
                            <div className="text-[11px] uppercase tracking-[0.025em] text-neutral-500 mt-0.5">
                              {item.color} · {item.packSize}
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <button
                                type="button"
                                aria-label={`Decrease quantity of ${displayTitle}`}
                                onClick={() => onUpdateQty(item.key, -1)}
                                className="w-7 h-7 rounded-full border border-[#7A548F]/25 flex items-center justify-center hover:bg-[#F2ECF6]"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-[13px] font-medium tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label={`Increase quantity of ${displayTitle}`}
                                onClick={() => onUpdateQty(item.key, 1)}
                                className="w-7 h-7 rounded-full border border-[#7A548F]/25 flex items-center justify-center hover:bg-[#F2ECF6]"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col items-end justify-between self-stretch shrink-0">
                            <span className="text-[14.5px] font-medium tabular-nums text-[#7A548F]">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              type="button"
                              aria-label={`Remove ${displayTitle} from bag`}
                              onClick={() => onRemoveItem(item.key)}
                              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.02em] text-neutral-500 hover:text-red-600 transition-colors py-1"
                            >
                              <Trash2 className="w-3.5 h-3.5 stroke-[1.6]" />
                              <span>{t.drawers.remove}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-5 border-t border-[#7A548F]/15 mt-6">
                    <div className="flex items-center justify-between text-[13.5px] mb-2">
                      <span className="text-neutral-600">{t.drawers.shipping}</span>
                      <span className="tabular-nums">
                        {shippingCost === 0 ? t.drawers.free : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[16px] font-medium mb-5">
                      <span>{t.drawers.subtotal}</span>
                      <span className="tabular-nums text-[#7A548F]">
                        ${(subtotal + shippingCost).toFixed(2)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCartStep('checkout')}
                      className="w-full h-12 rounded-full bg-[#7A548F] text-white text-[12px] uppercase tracking-[0.04em] hover:bg-[#5C3D6E] transition-colors"
                    >
                      {t.drawers.proceedCheckout}
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handlePlaceOrder} className="flex flex-col flex-1">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-[12px] uppercase tracking-[0.03em] font-medium text-[#1E1624]">
                        {t.drawers.orderSummary} ({cart.reduce((s, i) => s + i.quantity, 0)})
                      </h3>
                      <span className="text-[11px] text-neutral-500">
                        {t.drawers.editOrDelete}
                      </span>
                    </div>

                    <div className="rounded-[10px] border border-[#7A548F]/15 divide-y divide-[#7A548F]/10 bg-[#FAF8FC]">
                      {cart.map((item) => {
                        const displayTitle = pickText(item.product.displayTitle, lang);
                        return (
                          <div key={item.key} className="p-3.5 flex items-center gap-3.5">
                            <img
                              src={item.product.image}
                              alt={displayTitle}
                              referrerPolicy="no-referrer"
                              className="w-[54px] h-[66px] rounded-[5px] bg-[#F5F2F7] object-cover object-center shrink-0"
                            />

                            <div className="flex-1 min-w-0">
                              <div className="text-[13px] font-medium text-[#1E1624] truncate">
                                {displayTitle}
                              </div>
                              <div className="text-[10.5px] uppercase tracking-[0.025em] text-neutral-500 mt-0.5">
                                {item.color} · {item.packSize} · Qty {item.quantity}
                              </div>
                              <div className="text-[12.5px] font-medium tabular-nums text-[#7A548F] mt-1">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.key)}
                              aria-label={`Delete ${displayTitle} from checkout`}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#7A548F]/20 bg-white text-[10.5px] uppercase tracking-[0.02em] text-neutral-600 hover:border-red-500 hover:text-red-600 transition-colors shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5 stroke-[1.6]" />
                              <span>{t.drawers.delete}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Shipping Details */}
                  <div className="space-y-3.5 flex-1">
                    <h3 className="text-[12px] uppercase tracking-[0.03em] font-medium text-[#1E1624]">
                      {t.drawers.shippingInfo}
                    </h3>
                    <input
                      type="text"
                      required
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      placeholder={t.drawers.fullName}
                      className="w-full h-11 px-4 text-[13.5px] border border-[#7A548F]/25 rounded-lg focus:outline-none focus:border-[#7A548F]"
                    />
                    <input
                      type="email"
                      required
                      value={checkoutEmail}
                      onChange={(e) => setCheckoutEmail(e.target.value)}
                      placeholder={t.drawers.emailAddress}
                      className="w-full h-11 px-4 text-[13.5px] border border-[#7A548F]/25 rounded-lg focus:outline-none focus:border-[#7A548F]"
                    />
                    <input
                      type="text"
                      required
                      value={checkoutAddress}
                      onChange={(e) => setCheckoutAddress(e.target.value)}
                      placeholder={t.drawers.streetAddress}
                      className="w-full h-11 px-4 text-[13.5px] border border-[#7A548F]/25 rounded-lg focus:outline-none focus:border-[#7A548F]"
                    />
                    <input
                      type="text"
                      required
                      value={checkoutCity}
                      onChange={(e) => setCheckoutCity(e.target.value)}
                      placeholder={t.drawers.cityPostal}
                      className="w-full h-11 px-4 text-[13.5px] border border-[#7A548F]/25 rounded-lg focus:outline-none focus:border-[#7A548F]"
                    />
                  </div>

                  <div className="pt-5 border-t border-[#7A548F]/15 mt-6">
                    <div className="flex items-center justify-between text-[13.5px] mb-1.5">
                      <span className="text-neutral-600">{t.drawers.shipping}</span>
                      <span className="tabular-nums">
                        {shippingCost === 0 ? t.drawers.free : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[16px] font-medium mb-4">
                      <span>{t.drawers.totalDue}</span>
                      <span className="tabular-nums text-[#7A548F]">
                        ${(subtotal + shippingCost).toFixed(2)}
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="w-full h-12 rounded-full bg-[#7A548F] text-white text-[12px] uppercase tracking-[0.04em] hover:bg-[#5C3D6E] transition-colors"
                    >
                      {t.drawers.completeOrder} · ${(subtotal + shippingCost).toFixed(2)}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ACCOUNT */}
          {activeDrawer === 'account' && (
            <div>
              {accountSignedIn ? (
                <div className="p-5 bg-[#F2ECF6] rounded-lg">
                  <div className="text-[12px] uppercase tracking-[0.04em] text-[#7A548F]">
                    {t.drawers.signedIn}
                  </div>
                  <div className="mt-1 text-[16px] font-medium text-[#1E1624]">
                    {accountSignedIn}
                  </div>
                  <p className="mt-2 text-[13px] text-neutral-600">
                    {t.drawers.noOrders}
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSwitchDrawer('shop')}
                      className="px-4 py-2 rounded-full bg-[#7A548F] text-white text-[12px] uppercase tracking-[0.04em]"
                    >
                      {t.drawers.browseShop}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAccountSignedIn(null)}
                      className="px-4 py-2 text-[12px] uppercase tracking-[0.04em] underline underline-offset-4 text-[#7A548F]"
                    >
                      {t.drawers.signOut}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleAccountSubmit} className="space-y-4">
                  <p className="text-[13.5px] text-neutral-600 leading-relaxed">
                    {t.drawers.accountIntro}
                  </p>
                  <div>
                    <label
                      htmlFor="account-email"
                      className="block text-[12px] uppercase tracking-[0.04em] text-neutral-600 mb-1.5"
                    >
                      {t.drawers.emailAddress}
                    </label>
                    <input
                      id="account-email"
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full h-11 px-4 text-[14px] border border-[#7A548F]/25 rounded-lg focus:outline-none focus:border-[#7A548F]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-11 rounded-full bg-[#7A548F] text-white text-[12.5px] uppercase tracking-[0.04em] hover:bg-[#5C3D6E]"
                  >
                    {t.drawers.continueBtn}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* CONTACT US */}
          {activeDrawer === 'contact' && (
            <div>
              {contactSubmitted ? (
                <div className="p-6 bg-[#F2ECF6] text-center rounded-lg">
                  <Check className="w-6 h-6 mx-auto text-[#7A548F]" />
                  <h3 className="mt-3 text-[17px] font-medium text-[#1E1624]">
                    {t.drawers.messageReceived}
                  </h3>
                  <p className="mt-1.5 text-[13px] text-neutral-700">
                    {t.drawers.messageReceivedBody}
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactSubmitted(false)}
                    className="mt-4 text-[12px] uppercase tracking-[0.04em] text-[#7A548F] underline underline-offset-4"
                  >
                    {t.drawers.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <p className="text-[13.5px] text-neutral-600 leading-relaxed">
                    {t.drawers.contactIntro}
                  </p>
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[12px] uppercase tracking-[0.04em] text-neutral-600 mb-1.5"
                    >
                      {t.drawers.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder={t.drawers.namePlaceholder}
                      className="w-full h-11 px-4 text-[14px] border border-[#7A548F]/25 rounded-lg focus:outline-none focus:border-[#7A548F]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[12px] uppercase tracking-[0.04em] text-neutral-600 mb-1.5"
                    >
                      {t.drawers.emailLabel}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="desertmooncbd@gmail.com"
                      className="w-full h-11 px-4 text-[14px] border border-[#7A548F]/25 rounded-lg focus:outline-none focus:border-[#7A548F]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-msg"
                      className="block text-[12px] uppercase tracking-[0.04em] text-neutral-600 mb-1.5"
                    >
                      {t.drawers.messageLabel}
                    </label>
                    <textarea
                      id="contact-msg"
                      rows={4}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder={t.drawers.messagePlaceholder}
                      className="w-full p-4 text-[14px] border border-[#7A548F]/25 rounded-lg focus:outline-none focus:border-[#7A548F] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-11 rounded-full bg-[#7A548F] text-white text-[12.5px] uppercase tracking-[0.04em] hover:bg-[#5C3D6E]"
                  >
                    {t.drawers.sendMessage}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* BRAND STORY / PHILOSOPHY */}
          {activeDrawer === 'philosophy' && (
            <div className="min-h-full flex flex-col justify-between gap-6">
              <div className="space-y-5">
                <div className="w-full aspect-[16/11] rounded-[12px] overflow-hidden bg-[#F5F2F7]">
                  <img
                    src="/assets/triptych-serum-hands.png"
                    alt="Desert Moon CBD hand-blended organic hemp tincture in San Diego"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center block"
                  />
                </div>

                <div className="p-6 bg-[#7A548F] rounded-[12px]">
                  <p className="font-editorial italic text-[24px] sm:text-[26px] leading-[1.22] text-white">
                    {t.drawers.philosophyQuote}
                  </p>
                </div>

                <div className="space-y-3.5 text-[14px] leading-[1.7] text-neutral-700">
                  <p>{t.drawers.philosophyP1}</p>
                  <p>{t.drawers.philosophyP2}</p>
                </div>

                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  <div className="rounded-[10px] bg-[#F5F2F7] px-3 py-3 text-center">
                    <div className="text-[10.5px] uppercase tracking-[0.04em] font-medium text-[#7A548F]">
                      San Diego, CA
                    </div>
                  </div>
                  <div className="rounded-[10px] bg-[#F5F2F7] px-3 py-3 text-center">
                    <div className="text-[10.5px] uppercase tracking-[0.04em] font-medium text-[#7A548F]">
                      {lang === 'pt' ? 'Sem Solventes' : 'Solventless'}
                    </div>
                  </div>
                  <div className="rounded-[10px] bg-[#F5F2F7] px-3 py-3 text-center">
                    <div className="text-[10.5px] uppercase tracking-[0.04em] font-medium text-[#7A548F]">
                      {lang === 'pt' ? 'Carbono Zero' : 'Carbon-Free'}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSwitchDrawer('shop')}
                className="w-full h-12 inline-flex items-center justify-center gap-2 px-6 rounded-full bg-[#7A548F] text-white text-[12px] uppercase tracking-[0.04em] hover:bg-[#5C3D6E] transition-colors"
              >
                <span>{t.drawers.exploreAll}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* FOOTER SUPPORT / COMPANY / LEGAL INFO DRAWERS */}
          {activeInfoDrawer && (
            <div className="min-h-full flex flex-col justify-between gap-6">
              <div className="space-y-5">
                <div className="p-6 bg-[#7A548F] rounded-[12px]">
                  <p className="font-editorial italic text-[24px] sm:text-[26px] leading-[1.22] text-white">
                    {activeInfoDrawer.bannerQuote}
                  </p>
                </div>

                {activeInfoDrawer.badges && activeInfoDrawer.badges.length > 0 && (
                  <div className="grid grid-cols-3 gap-2.5">
                    {activeInfoDrawer.badges.map((badge) => (
                      <div
                        key={badge}
                        className="rounded-[10px] bg-[#F5F2F7] px-3 py-3 text-center"
                      >
                        <div className="text-[10.5px] uppercase tracking-[0.04em] font-medium text-[#7A548F]">
                          {badge}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-4">
                  {activeInfoDrawer.sections.map((section) => (
                    <div
                      key={section.heading}
                      className="rounded-[12px] border border-[#7A548F]/15 bg-[#FAF8FC] p-5"
                    >
                      <h3 className="text-[11.5px] uppercase tracking-[0.03em] font-medium text-[#7A548F]">
                        {section.heading}
                      </h3>
                      <p className="mt-2 text-[13.5px] leading-[1.68] text-neutral-700">
                        {section.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSwitchDrawer(activeInfoDrawer.ctaTarget)}
                className="w-full h-12 inline-flex items-center justify-center gap-2 px-6 rounded-full bg-[#7A548F] text-white text-[12px] uppercase tracking-[0.04em] hover:bg-[#5C3D6E] transition-colors"
              >
                <span>{activeInfoDrawer.ctaLabel}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer quick link to cart from Shop/Search */}
        {(activeDrawer === 'shop' || activeDrawer === 'search') && cart.length > 0 && (
          <div className="px-7 py-4 border-t border-[#7A548F]/15 bg-[#FAF8FC] flex items-center justify-between shrink-0">
            <span className="text-[13px] text-[#1E1624] tabular-nums">
              {cart.reduce((s, i) => s + i.quantity, 0)} {t.drawers.inBag} · ${subtotal.toFixed(2)}
            </span>
            <button
              type="button"
              onClick={() => {
                setCartStep('bag');
                onSwitchDrawer('cart');
              }}
              className="px-5 py-2 rounded-full bg-[#7A548F] text-white text-[12px] uppercase tracking-[0.04em] hover:bg-[#5C3D6E]"
            >
              {t.drawers.viewBagCheckout}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
