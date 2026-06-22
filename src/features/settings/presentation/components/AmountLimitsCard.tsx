import { useState } from 'react';
import { BarChart2 } from 'lucide-react';
import type { AmountLimits } from '../../domain/models/amountLimits';
import { useI18n } from '../../../../core/i18n/useI18n';

interface AmountLimitsCardProps {
  limits: AmountLimits;
  onSave: (min: number, max: number) => void;
}

const fmt = (n: number) =>
  new Intl.NumberFormat('es-PE').format(n);

const AmountLimitsCard: React.FC<AmountLimitsCardProps> = ({ limits, onSave }) => {
  const { t } = useI18n();
  const [isEditing, setIsEditing] = useState(false);
  const [editMin, setEditMin] = useState(limits.minAmount);
  const [editMax, setEditMax] = useState(limits.maxAmount);
  const [error, setError] = useState<string | null>(null);

  const handleStartEdit = () => {
    setEditMin(limits.minAmount);
    setEditMax(limits.maxAmount);
    setError(null);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editMin >= editMax) {
      setError(t('settings.errorMinMax'));
      return;
    }
    if (editMin <= 0) {
      setError(t('settings.errorMinPositive'));
      return;
    }
    onSave(editMin, editMax);
    setIsEditing(false);
    setError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
      <div className="flex items-center gap-2 mb-1">
        <BarChart2 size={20} className="text-[#1A237E]" />
        <h3 className="text-base font-semibold text-gray-800">{t('settings.amountLimits')}</h3>
      </div>
      <p className="text-sm text-gray-500 mt-1 mb-4">
        {t('settings.amountLimitsDesc')}
      </p>

      {!isEditing ? (
        <>
          <div>
            <label className="text-xs text-[#2E7D32] font-medium">{t('settings.minAmount')}</label>
            <p className="text-xl font-bold text-gray-900 mt-1">
              {limits.currencySymbol} {fmt(limits.minAmount)}
            </p>
          </div>
          <div className="mt-3">
            <label className="text-xs text-[#2E7D32] font-medium">{t('settings.maxAmount')}</label>
            <p className="text-xl font-bold text-gray-900 mt-1">
              {limits.currencySymbol} {fmt(limits.maxAmount)}
            </p>
          </div>
          <button
            onClick={handleStartEdit}
            className="w-full border-2 border-[#1A237E] text-[#1A237E] py-2 rounded-lg text-sm font-semibold mt-4 hover:bg-[#E8EAF6] transition-colors"
          >
            {t('settings.modifyLimits')}
          </button>
        </>
      ) : (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">{t('settings.minAmountInput')}</label>
            <input
              type="number"
              value={editMin}
              onChange={(e) => setEditMin(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">{t('settings.maxAmountInput')}</label>
            <input
              type="number"
              value={editMax}
              onChange={(e) => setEditMax(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]"
            />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-[#2E7D32] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#388E3C] transition-colors"
            >
              {t('settings.save')}
            </button>
            <button
              onClick={handleCancel}
              className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              {t('settings.cancel')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmountLimitsCard;
