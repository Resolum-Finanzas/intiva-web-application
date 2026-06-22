import { FileText, ChevronDown } from 'lucide-react';
import type { SimulationInput } from '../../domain/models/simulationInput';
import { useI18n } from '../../../../core/i18n/useI18n';

interface BasicDataFormProps {
  input: SimulationInput;
  onChange: (field: keyof SimulationInput, value: unknown) => void;
  teaRange: { min: number; max: number };
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(n);

const BasicDataForm: React.FC<BasicDataFormProps> = ({ input, onChange, teaRange }) => {
  const { t } = useI18n();
  const handleDownPaymentPct = (value: number) => {
    const pct = Math.min(60, Math.max(10, value));
    const amount = input.vehiclePrice * (pct / 100);
    onChange('downPaymentPct', pct);
    onChange('downPaymentAmount', amount);
    onChange('financedAmount', input.vehiclePrice - amount);
  };

  return (
    <div>
      <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
        <FileText size={18} />
        {t('simulator.basicData')}
      </h3>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('simulator.downPayment')}
          </label>
          <div className="flex gap-3 items-center mb-2">
            <div className="relative w-20">
              <input
                type="number"
                value={input.downPaymentPct}
                min={10}
                max={60}
                onChange={(e) => handleDownPaymentPct(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] pr-7"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="text"
                value={`${fmt(input.downPaymentAmount)}`}
                readOnly
                className="w-full bg-[var(--color-bg-page)] border border-gray-200 rounded-lg pl-8 pr-3 py-2.5 text-sm text-gray-600"
              />
            </div>
          </div>
          <input
            type="range"
            min={10}
            max={60}
            step={1}
            value={input.downPaymentPct}
            onChange={(e) => handleDownPaymentPct(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[var(--color-accent-primary)]"
            style={{
              background: `linear-gradient(to right, var(--color-accent-primary) ${((input.downPaymentPct - 10) / 50) * 100}%, var(--color-border) ${((input.downPaymentPct - 10) / 50) * 100}%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{t('simulator.minLabel')}</span>
            <span>{t('simulator.maxLabel')}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('simulator.financedAmount')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="text"
                value={`${fmt(input.financedAmount)}`}
                readOnly
                className="w-full bg-[var(--color-bg-page)] border border-gray-200 rounded-lg pl-8 pr-3 py-3 text-sm text-gray-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('simulator.tea')}</label>
            <input
              type="number"
              step="0.01"
              value={Number((input.tea * 100).toFixed(2))}
              onChange={(e) => onChange('tea', Number(e.target.value) / 100)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]"
            />
            <p className="text-xs text-gray-500 mt-1">
              {t('simulator.suggestedRange', { min: (teaRange.min * 100).toFixed(2), max: (teaRange.max * 100).toFixed(2) })}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('simulator.bankEntity')}
          </label>
          <div className="relative">
            <select
              value={input.bank}
              onChange={(e) => onChange('bank', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] bg-[var(--color-bg-surface)]"
            >
              <option value="BCP">BCP</option>
              <option value="BBVA">BBVA</option>
              <option value="Interbank">Interbank</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDataForm;
