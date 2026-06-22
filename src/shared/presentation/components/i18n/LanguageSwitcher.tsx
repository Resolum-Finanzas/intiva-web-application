import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useI18n } from '../../../../core/i18n/useI18n';

export const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
      >
        <Globe className="w-4 h-4" />
        <span key={currentLanguage} className="inline-block animate-fade-in-up" style={{ animationDuration: '0.25s' }}>{currentLanguage.toUpperCase()}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute right-0 mt-1 w-28 bg-[var(--color-bg-elevated)] border border-[var(--color-border-light)] rounded-lg shadow-lg z-50 animate-fade-in-up"
          style={{ animationDuration: '0.15s' }}
        >
          {['es', 'en'].map(lang => (
            <button
              key={lang}
              onClick={() => { changeLanguage(lang); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-[var(--color-bg-page)] first:rounded-t-lg last:rounded-b-lg ${currentLanguage === lang ? 'text-[var(--color-text-primary)] font-semibold' : 'text-[var(--color-text-muted)]'
                }`}
            >
              {lang === 'es' ? '🇵🇪 Español' : '🇺🇸 English'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
