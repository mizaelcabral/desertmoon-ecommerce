import { FormEvent, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import type { ActiveDrawer } from './Header';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../i18n';

interface NewsletterGuaranteesProps {
  onOpenDrawer: (drawer: ActiveDrawer) => void;
}

function LightbulbSparkleIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="4 3 21 22"
      fill="none"
      aria-hidden="true"
      className="text-[#7A548F]"
    >
      <path
        d="M11.2 19.5V17.4C9.1 16.3 7.8 14.2 7.8 11.8C7.8 8.4 10.6 5.6 14 5.6C15.1 5.6 16.2 5.9 17.1 6.4"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.2 11.8C20.2 14.2 18.9 16.3 16.8 17.4V19.5"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2 19.5H16.8M11.8 22H16.2M13 24H15"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
      />
      <path
        d="M19.8 5.2L20.5 7.4L22.7 8.1L20.5 8.8L19.8 11L19.1 8.8L16.9 8.1L19.1 7.4L19.8 5.2Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShipWaveIcon() {
  return (
    <svg
      width="68"
      height="62"
      viewBox="3 4 24 21"
      fill="none"
      aria-hidden="true"
      className="text-[#7A548F]"
    >
      <path
        d="M11 8V5.5H14.5V8"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 13V8.2H18.5L21 13"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 13H24.5L22.2 18.5H7.8L5.5 13Z"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 22C6.2 20.8 7.8 20.8 9.5 22C11.2 23.2 12.8 23.2 14.5 22C16.2 20.8 17.8 20.8 19.5 22C21.2 23.2 22.8 23.2 24.5 22"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MailboxIcon() {
  return (
    <svg
      width="68"
      height="62"
      viewBox="4 6 22 20"
      fill="none"
      aria-hidden="true"
      className="text-[#7A548F]"
    >
      <path
        d="M9.5 10.5H20.5C22.7 10.5 24.5 12.3 24.5 14.5V19.5H5.5V14.5C5.5 12.3 7.3 10.5 9.5 10.5Z"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 19.5V14.5C13.5 12.3 11.7 10.5 9.5 10.5"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
      />
      <path
        d="M8.5 15H10.5"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
      />
      <path
        d="M19 13.5V7.5H22.2"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 19.5V24"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CoinsInstallmentIcon() {
  return (
    <svg
      width="68"
      height="62"
      viewBox="3 4 24 20"
      fill="none"
      aria-hidden="true"
      className="text-[#7A548F]"
    >
      <circle cx="17.5" cy="12" r="6.5" stroke="currentColor" strokeWidth="0.95" />
      <path
        d="M17.5 8.8V15.2M19.2 10.3C19.2 9.6 18.4 9.2 17.5 9.2C16.6 9.2 15.8 9.6 15.8 10.3C15.8 11.8 19.2 11.4 19.2 13.2C19.2 14 18.4 14.5 17.5 14.5C16.5 14.5 15.8 14 15.8 13.3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M16.5 18.4C15.6 20.6 13.5 22 11 22C7.7 22 5 19.3 5 16C5 13.4 6.7 11.2 9 10.4"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SproutPlanetIcon() {
  return (
    <svg
      width="68"
      height="62"
      viewBox="5 5 20 20"
      fill="none"
      aria-hidden="true"
      className="text-[#7A548F]"
    >
      <path
        d="M15 19V11"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
      />
      <path
        d="M15 12.5C15 9 12.2 6.8 8.5 7C8.5 10.8 10.9 13.2 15 12.5Z"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinejoin="round"
      />
      <path
        d="M15 14.5C15 11.2 17.7 9 21.5 9.2C21.5 12.8 19.1 15.1 15 14.5Z"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 22.5C9.8 20.2 12.3 19.2 15 19.2C17.7 19.2 20.2 20.2 22.5 22.5"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
      />
    </svg>
  );
}

const GUARANTEE_ICONS = [
  LightbulbSparkleIcon,
  ShipWaveIcon,
  MailboxIcon,
  CoinsInstallmentIcon,
  SproutPlanetIcon,
];

export function NewsletterGuarantees({ onOpenDrawer }: NewsletterGuaranteesProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showPrivacyNote, setShowPrivacyNote] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section
      id="newsletter"
      aria-label="Newsletter and Brand Guarantees"
      className="w-full bg-white pt-14 pb-20 sm:pt-20 sm:pb-24 lg:pt-[108px] lg:pb-[112px]"
    >
      <div className="w-full max-w-[1598px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Row: Editorial Newsletter Headline + Rounded Email Form */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-12">
            <div className="max-w-[540px]">
              <h2 className="text-[34px] sm:text-[42px] lg:text-[46px] leading-[1.15] tracking-[-0.025em] font-medium text-[#1E1624]">
                <span className="block">
                  {t.newsletter.line1Sans}{' '}
                  <em className="font-editorial italic font-normal tracking-[-0.01em] text-[#7A548F]">
                    {t.newsletter.line1Italic}
                  </em>
                </span>
                <span className="block">
                  <em className="font-editorial italic font-normal tracking-[-0.01em] text-[#7A548F]">
                    {t.newsletter.line2Italic}
                  </em>{' '}
                  {t.newsletter.line2Sans}
                </span>
                <span className="block">{t.newsletter.line3}</span>
              </h2>
            </div>

            <div className="w-full lg:max-w-[400px] lg:pt-1">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="relative w-full h-[54px] rounded-full border border-[#7A548F]/30 bg-white flex items-center pl-5 pr-[56px] focus-within:border-[#7A548F] transition-colors">
                  <label htmlFor="newsletter-email" className="sr-only">
                    {t.newsletter.placeholder}
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (subscribed) setSubscribed(false);
                    }}
                    placeholder={t.newsletter.placeholder}
                    className="w-full bg-transparent text-[11.5px] sm:text-[12px] tracking-[0.02em] text-[#1E1624] placeholder:text-[#7A7184] placeholder:uppercase focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className={`absolute right-[5px] top-1/2 -translate-y-1/2 w-[42px] h-[42px] rounded-full flex items-center justify-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F] ${
                      subscribed
                        ? 'bg-[#F2ECF6] text-[#7A548F]'
                        : 'bg-[#7A548F] text-white hover:bg-[#5C3D6E]'
                    }`}
                  >
                    {subscribed ? (
                      <Check className="w-[16px] h-[16px] stroke-[2]" aria-hidden="true" />
                    ) : (
                      <ArrowUpRight className="w-[16px] h-[16px] stroke-[1.7]" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </form>

              {subscribed ? (
                <p className="mt-3.5 text-[10.5px] tracking-[0.02em] uppercase text-[#7A548F] font-medium">
                  {t.newsletter.subscribed}
                </p>
              ) : (
                <p className="mt-3.5 text-[10.5px] tracking-[0.02em] uppercase text-[#1E1624]">
                  {t.newsletter.privacyPrefix}{' '}
                  <button
                    type="button"
                    onClick={() => setShowPrivacyNote((prev) => !prev)}
                    className="underline underline-offset-[3px] text-[#7A548F] hover:opacity-75 transition-opacity uppercase"
                  >
                    {t.newsletter.privacyLink}
                  </button>
                  .
                </p>
              )}

              {showPrivacyNote && (
                <p className="mt-2.5 text-[11px] leading-[1.6] text-[#5B5566]">
                  {t.newsletter.privacyNote}
                </p>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom 5-Column Hairline Guarantees Strip */}
        <ScrollReveal delay={0.1} y={28}>
          <div className="mt-16 sm:mt-20 lg:mt-[126px] border-t border-b border-[#7A548F]/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-[#7A548F]/15">
            {t.newsletter.guarantees.map((item, idx) => {
              const Icon = GUARANTEE_ICONS[idx] ?? LightbulbSparkleIcon;
              return (
                <div
                  key={item.title}
                  className="py-9 sm:px-6 lg:px-7 lg:first:pl-7 lg:py-11 flex flex-col justify-between lg:min-h-[292px]"
                >
                  <div>
                    <div className="text-[11.5px] text-[#7A548F] tabular-nums">({idx + 1})</div>
                    <h3 className="mt-3.5 text-[12px] uppercase tracking-[0.025em] text-[#1E1624] font-medium">
                      {item.title}
                    </h3>
                  </div>
                  <div className="mt-12 lg:mt-16">
                    <Icon />
                    <p className="mt-4 text-[10.5px] sm:text-[11px] leading-[1.75] tracking-[0.015em] uppercase text-[#5B5566] font-normal">
                      {item.line1}
                      <br />
                      {'email' in item ? (
                        <>
                          {item.line2Prefix}{' '}
                          <button
                            type="button"
                            onClick={() => onOpenDrawer('contact')}
                            className="hover:text-[#7A548F] transition-colors uppercase underline underline-offset-2"
                          >
                            {item.email}
                          </button>
                        </>
                      ) : (
                        item.line2
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
