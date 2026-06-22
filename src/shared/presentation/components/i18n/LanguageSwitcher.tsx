import React from 'react';
import { useI18n } from '../../../../core/i18n/useI18n';

export const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage } = useI18n();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage('es')}
        className={`px-3 py-1 rounded ${
          currentLanguage === 'es'
            ? 'bg-color-primary text-white'
            : 'bg-color-neutral-200 text-color-neutral-900'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded ${
          currentLanguage === 'en'
            ? 'bg-color-primary text-white'
            : 'bg-color-neutral-200 text-color-neutral-900'
        }`}
      >
        EN
      </button>
    </div>
  );
};
