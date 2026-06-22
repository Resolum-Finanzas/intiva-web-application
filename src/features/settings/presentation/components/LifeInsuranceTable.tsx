import { useState } from 'react';
import { Pencil } from 'lucide-react';
import type { LifeInsuranceRate } from '../../domain/models/lifeInsuranceRate';
import { useI18n } from '../../../../core/i18n/useI18n';

interface LifeInsuranceTableProps {
  rates: LifeInsuranceRate[];
  onEdit: (id: string) => void;
  onSave: (id: string, newRate: number) => void;
}

const LifeInsuranceTable: React.FC<LifeInsuranceTableProps> = ({ rates, onEdit, onSave }) => {
  const { t } = useI18n();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleStartEdit = (id: string) => {
    const rate = rates.find((r) => r.id === id);
    if (rate) {
      setEditValue((rate.monthlyRate * 100).toFixed(3));
      setEditingId(id);
      onEdit(id);
    }
  };

  const handleSave = () => {
    if (editingId) {
      const num = parseFloat(editValue);
      if (!isNaN(num) && num > 0) {
        onSave(editingId, num / 100);
      }
      setEditingId(null);
      setEditValue('');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div className="bg-[var(--color-bg-surface)] rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-semibold text-gray-800">{t('settings.lifeInsurance')}</h3>
        <span className="bg-[var(--color-secondary-50)] text-[var(--color-accent-secondary)] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
          <span className="w-2 h-2 bg-[var(--color-accent-secondary)] rounded-full animate-pulse" />
          {t('settings.activeRate')}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-1 mb-4">
        {t('settings.lifeInsuranceDesc')}
      </p>

      <table className="w-full text-xs">
        <thead>
          <tr className="bg-[var(--color-bg-page)] rounded-t-lg">
            <td className="font-semibold text-gray-500 uppercase px-4 py-3">{t('settings.coverageType')}</td>
            <td className="font-semibold text-gray-500 uppercase px-4 py-3">{t('settings.monthlyRate')}</td>
            <td className="font-semibold text-gray-500 uppercase px-4 py-3">{t('settings.lastUpdated')}</td>
            <td className="font-semibold text-gray-500 uppercase px-4 py-3">{t('settings.action')}</td>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.id} className="border-b border-gray-100 hover:bg-[var(--color-bg-page)] transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-[var(--color-text-primary)]">{rate.coverageType}</td>
              <td className="px-4 py-3 text-sm font-bold text-gray-900">{rate.monthlyRateLabel}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{rate.lastUpdated}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleStartEdit(rate.id)}
                  className="text-[var(--color-text-primary)] hover:text-[var(--color-primary-800)] hover:bg-[var(--color-primary-50)] p-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Pencil size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingId && (
        <div className="bg-[var(--color-primary-50)] rounded-lg p-4 mx-4 mb-2 mt-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            {t('settings.newRate')}
          </label>
          <input
            type="number"
            step="0.001"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-[var(--color-accent-primary)] text-white text-sm px-4 py-1.5 rounded-lg hover:bg-[var(--color-primary-800)] transition-all duration-300 hover:shadow-xl hover:scale-105 transform cursor-pointer"
            >
              {t('settings.save')}
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-600 text-sm px-4 py-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {t('settings.cancel')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LifeInsuranceTable;
