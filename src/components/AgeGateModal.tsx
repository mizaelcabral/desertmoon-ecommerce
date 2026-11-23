import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { EDITORIAL_EASE } from './ScrollReveal';
import { useLanguage } from '../i18n';

interface AgeGateModalProps {
  onOpenTerms?: () => void;
  onOpenPrivacy?: () => void;
}

const STORAGE_KEY = 'dm_age_verified_v1';

export function AgeGateModal({ onOpenTerms, onOpenPrivacy }: AgeGateModalProps) {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.sessionStorage.getItem(STORAGE_KEY) !== 'true';
  });
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const handleConfirm = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(STORAGE_KEY, 'true');
    }
    setDenied(false);
    setIsOpen(false);
  };

  const handleDeny = () => {
    setDenied(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-gate-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1E1624]/55 backdrop-blur-[3px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: EDITORIAL_EASE }}
            className="w-full max-w-[820px] bg-white rounded-[20px] overflow-hidden shadow-[0_24px_70px_rgba(30,22,36,0.28)] grid grid-cols-1 md:grid-cols-[44%_56%]"
          >
            {/* Left Column: Full-bleed botanical product photograph */}
            <div className="relative h-[220px] sm:h-[260px] md:h-auto md:min-h-[470px] bg-[#F5F2F7] overflow-hidden">
              <img
                src="/assets/category-face-wash.png"
                alt="Desert Moon CBD organic botanical hemp dropper bottle"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center block"
              />
            </div>

            {/* Right Column: Editorial Age Verification Content */}
            <div className="px-7 py-8 sm:px-11 sm:py-11 flex flex-col justify-between bg-white">
              {/* Top Row: Brand Wordmark + Compact Language Switcher */}
              <div className="flex items-center justify-between gap-4">
                <span className="font-brand text-[26px] sm:text-[28px] leading-none tracking-[-0.02em] text-[#7A548F] select-none">
                  {t.brandName}
                </span>

                <div
                  role="group"
                  aria-label="Language switcher"
                  className="inline-flex items-center rounded-full border border-[#7A548F]/25 p-0.5 text-[10px] uppercase tracking-[0.04em]"
                >
                  <button
                    type="button"
                    onClick={() => setLang('en')}
                    aria-pressed={lang === 'en'}
                    className={`px-2 py-0.5 rounded-full transition-colors ${
                      lang === 'en'
                        ? 'bg-[#7A548F] text-white font-medium'
                        : 'text-[#5B5566] hover:text-[#7A548F]'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang('pt')}
                    aria-pressed={lang === 'pt'}
                    className={`px-2 py-0.5 rounded-full transition-colors ${
                      lang === 'pt'
                        ? 'bg-[#7A548F] text-white font-medium'
                        : 'text-[#5B5566] hover:text-[#7A548F]'
                    }`}
                  >
                    PT
                  </button>
                </div>
              </div>

              {/* Center Verification Prompt */}
              <div className="my-9 sm:my-10">
                <h2
                  id="age-gate-title"
                  className="text-[36px] sm:text-[42px] leading-[1.12] tracking-[-0.025em] font-medium text-[#1E1624]"
                >
                  {t.ageGate.headlinePrefix}{' '}
                  <em className="font-editorial italic font-normal tracking-[-0.01em] text-[#7A548F]">
                    {t.ageGate.headlineItalic}
                  </em>
                </h2>

                <p className="mt-3 text-[13.5px] sm:text-[14px] leading-[1.6] text-[#5B5566]">
                  {t.ageGate.subtitle}
                </p>

                {denied ? (
                  <div className="mt-7 p-4 rounded-[12px] bg-[#F2ECF6] border border-[#7A548F]/20">
                    <p className="text-[12.5px] font-medium uppercase tracking-[0.025em] text-[#7A548F]">
                      {t.ageGate.deniedTitle}
                    </p>
                    <p className="mt-1 text-[12.5px] text-[#5B5566] leading-relaxed">
                      {t.ageGate.deniedBody}
                    </p>
                    <button
                      type="button"
                      onClick={() => setDenied(false)}
                      className="mt-3 text-[11.5px] uppercase tracking-[0.03em] font-medium text-[#7A548F] underline underline-offset-4 hover:text-[#5C3D6E]"
                    >
                      {t.ageGate.deniedBack}
                    </button>
                  </div>
                ) : (
                  <div className="mt-8 grid grid-cols-2 gap-3.5">
                    <button
                      type="button"
                      onClick={handleConfirm}
                      className="h-[50px] rounded-full bg-[#7A548F] text-white text-[12px] uppercase tracking-[0.04em] font-medium hover:bg-[#5C3D6E] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F]"
                    >
                      {t.ageGate.yes}
                    </button>

                    <button
                      type="button"
                      onClick={handleDeny}
                      className="h-[50px] rounded-full bg-white border border-[#7A548F] text-[#7A548F] text-[12px] uppercase tracking-[0.04em] font-medium hover:bg-[#F2ECF6] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A548F]"
                    >
                      {t.ageGate.no}
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Legal Disclaimer */}
              <div className="pt-5 border-t border-[#7A548F]/15">
                <p className="text-[11.5px] leading-[1.65] text-[#6E6778]">
                  {t.ageGate.legalPrefix}{' '}
                  <button
                    type="button"
                    onClick={() => {
                      handleConfirm();
                      onOpenTerms?.();
                    }}
                    className="text-[#1E1624] underline underline-offset-[3px] hover:text-[#7A548F] transition-colors"
                  >
                    {t.ageGate.terms}
                  </button>{' '}
                  {t.ageGate.legalAnd}{' '}
                  <button
                    type="button"
                    onClick={() => {
                      handleConfirm();
                      onOpenPrivacy?.();
                    }}
                    className="text-[#1E1624] underline underline-offset-[3px] hover:text-[#7A548F] transition-colors"
                  >
                    {t.ageGate.privacy}
                  </button>
                  .
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
