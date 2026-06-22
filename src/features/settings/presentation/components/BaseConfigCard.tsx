import { Lock, Info } from 'lucide-react';
import type { BaseConfig } from '../../domain/models/baseConfig';
import { useI18n } from '../../../../core/i18n/useI18n';

interface BaseConfigCardProps {
  config: BaseConfig;
}

const BaseConfigCard: React.FC<BaseConfigCardProps> = ({ config }) => {
  const { t } = useI18n();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-gray-800">{t('settings.baseConfig')}</h3>
        <Lock size={16} className="text-gray-400" />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs text-[#1A237E] font-medium mb-1">{t('settings.mainCurrency')}</label>
          <div className="relative">
            <input
              type="text"
              value={config.currencyLabel}
              readOnly
              className="w-full bg-[#F5F5F5] border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 pr-8"
            />
            <Lock size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 font-medium mb-1">{t('settings.rateType')}</label>
          <div className="bg-[#F5F5F5] border border-gray-200 rounded-lg px-4 py-2 flex justify-between items-center">
            <span className="text-sm text-gray-700">{config.rateTypeLabel}</span>
            <span className="text-sm text-gray-400">%</span>
          </div>
        </div>

        <div className="flex items-start gap-2 mt-4">
          <Info size={12} className="text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-400 leading-relaxed">
            {t('settings.baseConfigNote')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BaseConfigCard;
