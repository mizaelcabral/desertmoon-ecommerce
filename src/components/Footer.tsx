import type { ProductCategory } from '../data/products';
import type { ActiveDrawer } from './Header';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../i18n';

interface FooterProps {
  onOpenShop: (category?: ProductCategory) => void;
  onOpenDrawer: (drawer: ActiveDrawer) => void;
}

function FacebookIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer({ onOpenShop, onOpenDrawer }: FooterProps) {
  const { lang, setLang, t } = useLanguage();

  const handleLinkClick = (
    action: 'shop' | 'philosophy' | 'contact' | 'values' | 'newsletter',
    category?: ProductCategory
  ) => {
    if (action === 'shop') {
      onOpenShop(category ?? 'All');
    } else if (action === 'philosophy') {
      onOpenDrawer('philosophy');
    } else if (action === 'contact') {
      onOpenDrawer('contact');
    } else if (action === 'values') {
      document.getElementById('values')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'newsletter') {
      document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-white pt-20 sm:pt-28 lg:pt-[144px]">
      <ScrollReveal y={24} amount={0.1} className="w-full max-w-[1598px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Row: Brand Wordmark Left + 4 Even Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-[40.3%_repeat(4,1fr)] gap-y-14 gap-x-8 items-start">
          {/* Brand Logo */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="Desert Moon CBD Back to Top"
              className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A548F]"
            >
              <img
                src="/assets/desert-logo.png"
                alt="Desert Moon CBD — Your Healing Begins Here"
                className="h-[60px] sm:h-[72px] w-auto object-contain block"
              />
            </a>
            <p className="mt-4 text-[11.5px] uppercase tracking-[0.02em] text-[#5B5566] max-w-[280px] leading-[1.75]">
              963 Urania Ave, Encinitas, CA 92024 · 1-(760) 782-2506
            </p>
          </div>

          {/* 4 Navigation Columns */}
          {t.footer.columns.map((column) => (
            <div key={column.heading}>
              <h3 className="text-[13px] sm:text-[13.5px] uppercase tracking-[0.03em] font-medium text-[#1E1624]">
                {column.heading}
              </h3>
              <ul className="mt-9 space-y-6">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.label}`}>
                    <button
                      type="button"
                      onClick={() =>
                        handleLinkClick(
                          link.action,
                          'category' in link ? link.category : undefined
                        )
                      }
                      className="text-[12.5px] sm:text-[13px] uppercase tracking-[0.025em] text-[#5B5566] hover:text-[#7A548F] transition-colors duration-150 font-normal whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F]"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Hairline Bar: Copyright + Language Toggle + Social Icons */}
        <div className="mt-24 lg:mt-[152px] border-t border-[#7A548F]/15 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-[12px] uppercase tracking-[0.02em] text-[#5B5566] font-normal">
            {t.footer.copyright}
          </p>

          <div className="flex items-center gap-6 text-[#7A548F]">
            <div
              role="group"
              aria-label="Footer language switcher"
              className="inline-flex items-center rounded-full border border-[#7A548F]/25 p-0.5 text-[10.5px] uppercase tracking-[0.04em]"
            >
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`px-2.5 py-0.5 rounded-full transition-colors ${
                  lang === 'en' ? 'bg-[#7A548F] text-white' : 'text-[#5B5566] hover:text-[#7A548F]'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('pt')}
                aria-pressed={lang === 'pt'}
                className={`px-2.5 py-0.5 rounded-full transition-colors ${
                  lang === 'pt' ? 'bg-[#7A548F] text-white' : 'text-[#5B5566] hover:text-[#7A548F]'
                }`}
              >
                Português
              </button>
            </div>

            <a
              href="https://www.facebook.com/profile.php?id=61573599935077"
              target="_blank"
              rel="noreferrer"
              aria-label="Desert Moon CBD on Facebook"
              className="p-1.5 -m-1.5 hover:opacity-65 transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F]"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/desertmooncbd/"
              target="_blank"
              rel="noreferrer"
              aria-label="Desert Moon CBD on Instagram"
              className="p-1.5 -m-1.5 hover:opacity-65 transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F]"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
