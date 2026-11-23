import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import type { ProductCategory } from '../data/products';
import { useLanguage } from '../i18n';

export type ActiveDrawer = 'none' | 'shop' | 'search' | 'cart' | 'account' | 'contact' | 'philosophy';

interface HeaderProps {
  cartCount: number;
  onOpenShop: (category?: ProductCategory) => void;
  onOpenDrawer: (drawer: ActiveDrawer) => void;
  onResetHome: () => void;
}

export function Header({ cartCount, onOpenShop, onOpenDrawer, onResetHome }: HeaderProps) {
  const { lang, setLang, t } = useLanguage();
  const [openMenu, setOpenMenu] = useState<'home' | 'explore' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white h-[78px] border-b border-[#7A548F]/10">
      <div
        ref={navRef}
        className="w-full h-full max-w-[1598px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-6"
      >
        {/* Zone 1: Brand logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(null);
            onResetHome();
          }}
          className="justify-self-start inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A548F]"
          aria-label="Desert Moon CBD Home"
        >
          <img
            src="/assets/desert-logo.png"
            alt="Desert Moon CBD — Your Healing Begins Here"
            className="h-[40px] sm:h-[46px] w-auto object-contain block"
          />
        </a>

        {/* Zone 2: Centered 5-link navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center justify-center gap-7 xl:gap-8"
        >
          {/* HOME dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu((prev) => (prev === 'home' ? null : 'home'))}
              aria-expanded={openMenu === 'home'}
              className="flex items-center gap-1 py-2 text-[12.5px] font-normal tracking-[0.025em] uppercase text-[#1E1624] hover:text-[#7A548F] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A548F]"
            >
              <span>{t.header.home}</span>
              <ChevronDown
                className={`w-[12px] h-[12px] stroke-[1.7] transition-transform duration-150 ${
                  openMenu === 'home' ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {openMenu === 'home' && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-[#7A548F]/15 shadow-[0_14px_34px_rgba(42,27,51,0.1)] py-2 z-50">
                {t.header.homeMenu.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setOpenMenu(null);
                      if ('action' in item && item.action === 'philosophy') {
                        onOpenDrawer('philosophy');
                      } else if ('category' in item) {
                        onOpenShop(item.category);
                      }
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#F2ECF6] transition-colors duration-150"
                  >
                    <div className="text-[13px] font-medium text-[#1E1624]">{item.label}</div>
                    <div className="text-[11.5px] text-neutral-500 mt-0.5">{item.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* EXPLORE dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu((prev) => (prev === 'explore' ? null : 'explore'))}
              aria-expanded={openMenu === 'explore'}
              className="flex items-center gap-1 py-2 text-[12.5px] font-normal tracking-[0.025em] uppercase text-[#1E1624] hover:text-[#7A548F] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A548F]"
            >
              <span>{t.header.explore}</span>
              <ChevronDown
                className={`w-[12px] h-[12px] stroke-[1.7] transition-transform duration-150 ${
                  openMenu === 'explore' ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {openMenu === 'explore' && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-[#7A548F]/15 shadow-[0_14px_34px_rgba(42,27,51,0.1)] py-2 z-50">
                {t.header.exploreMenu.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setOpenMenu(null);
                      onOpenShop(item.category);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#F2ECF6] transition-colors duration-150"
                  >
                    <div className="text-[13px] font-medium text-[#1E1624]">{item.label}</div>
                    <div className="text-[11.5px] text-neutral-500 mt-0.5">{item.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setOpenMenu(null);
              onOpenShop('All');
            }}
            className="py-2 text-[12.5px] font-normal tracking-[0.025em] uppercase text-[#1E1624] hover:text-[#7A548F] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A548F]"
          >
            {t.header.shop}
          </button>

          <button
            type="button"
            onClick={() => {
              setOpenMenu(null);
              onOpenDrawer('philosophy');
            }}
            className="py-2 text-[12.5px] font-normal tracking-[0.025em] uppercase text-[#1E1624] hover:text-[#7A548F] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A548F]"
          >
            {t.header.story}
          </button>

          <button
            type="button"
            onClick={() => {
              setOpenMenu(null);
              onOpenDrawer('contact');
            }}
            className="py-2 text-[12.5px] font-normal tracking-[0.025em] uppercase text-[#1E1624] hover:text-[#7A548F] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A548F]"
          >
            {t.header.contact}
          </button>
        </nav>

        {/* Zone 3: Language Switcher + Utility icons (Search, Account, Cart) */}
        <div className="justify-self-end flex items-center gap-4 sm:gap-5 shrink-0">
          {/* Compact EN / PT Toggle */}
          <div
            role="group"
            aria-label="Language switcher"
            className="inline-flex items-center rounded-full border border-[#7A548F]/25 p-0.5 text-[10.5px] uppercase tracking-[0.04em]"
          >
            <button
              type="button"
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              className={`px-2 py-0.5 rounded-full transition-colors duration-150 ${
                lang === 'en'
                  ? 'bg-[#7A548F] text-white font-medium'
                  : 'text-[#1E1624]/70 hover:text-[#7A548F]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('pt')}
              aria-pressed={lang === 'pt'}
              className={`px-2 py-0.5 rounded-full transition-colors duration-150 ${
                lang === 'pt'
                  ? 'bg-[#7A548F] text-white font-medium'
                  : 'text-[#1E1624]/70 hover:text-[#7A548F]'
              }`}
            >
              PT
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setOpenMenu(null);
              onOpenDrawer('search');
            }}
            aria-label="Search products"
            className="p-2 -m-2 text-[#1E1624] hover:text-[#7A548F] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F]"
          >
            <Search className="w-[18px] h-[18px] stroke-[1.5]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => {
              setOpenMenu(null);
              onOpenDrawer('account');
            }}
            aria-label="Account"
            className="p-2 -m-2 text-[#1E1624] hover:text-[#7A548F] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F]"
          >
            <User className="w-[18px] h-[18px] stroke-[1.5]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => {
              setOpenMenu(null);
              onOpenDrawer('cart');
            }}
            aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
            className="relative p-2 -m-2 text-[#1E1624] hover:text-[#7A548F] transition-colors duration-150 flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F]"
          >
            <ShoppingCart className="w-[18px] h-[18px] stroke-[1.5]" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="text-[11px] font-medium tabular-nums text-[#7A548F] leading-none">
                ({cartCount})
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden p-2 -m-2 text-[#1E1624] hover:text-[#7A548F] transition-colors duration-150"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#7A548F]/15 px-6 py-5 shadow-lg">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenDrawer('philosophy');
              }}
              className="py-3 text-left text-[13px] tracking-[0.03em] uppercase text-[#1E1624] border-b border-black/5"
            >
              {t.header.mobileHome}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenShop('All');
              }}
              className="py-3 text-left text-[13px] tracking-[0.03em] uppercase text-[#1E1624] border-b border-black/5"
            >
              {t.header.mobileExplore}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenShop('CBD Tinctures');
              }}
              className="py-3 text-left text-[13px] tracking-[0.03em] uppercase text-[#1E1624] border-b border-black/5"
            >
              {t.header.mobileShop}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenShop('CBD Bundles');
              }}
              className="py-3 text-left text-[13px] tracking-[0.03em] uppercase text-[#1E1624] border-b border-black/5"
            >
              {t.header.mobileStory}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenDrawer('contact');
              }}
              className="py-3 text-left text-[13px] tracking-[0.03em] uppercase text-[#1E1624]"
            >
              {t.header.mobileContact}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
