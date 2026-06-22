import { SlidersHorizontal } from 'lucide-react';
import { RISK_LEVEL_LABELS, RiskLevel } from '../../domain/models/riskLevel';
import type { SimulationInput } from '../../domain/models/simulationInput';
import Toggle from './Toggle';
import { useI18n } from '../../../../core/i18n/useI18n';

interface AdvancedConfigFormProps {
  input: SimulationInput;
  onChange: (field: keyof SimulationInput, value: unknown) => void;
}

const TERM_OPTIONS = [24, 36, 48, 60];

const AdvancedConfigForm: React.FC<AdvancedConfigFormProps> = ({ input, onChange }) => {
  const { t } = useI18n();
  const handleGraceType = (type: 'Total' | 'Parcial') => {
    onChange('gracePeriodType', type);
    if (!input.hasGracePeriod) {
      onChange('hasGracePeriod', true);
    }
  };

  return (
    <div>
      <h3 className="text-base font-bold text-[#1A237E] mb-5 flex items-center gap-2">
        <SlidersHorizontal size={18} />
        {t('simulator.advancedConfig')}
      </h3>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('simulator.creditTerm')}
            </label>
            <select
              value={input.termMonths}
              onChange={(e) => onChange('termMonths', Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E] bg-white"
            >
              {TERM_OPTIONS.map((m) => (
                <option key={m} value={m}>{m} {t('simulator.months')}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('simulator.paymentFrequency')}
            </label>
            <select
              value={input.paymentFrequency}
              disabled
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            >
              <option value="Mensual">{t('simulator.monthly')}</option>
            </select>
          </div>
        </div>

        <div>
          <Toggle
            checked={input.includeVehicleInsurance}
            onChange={(v) => onChange('includeVehicleInsurance', v)}
            label={t('simulator.vehicleInsurance')}
            description={t('simulator.vehicleInsuranceDesc')}
          />
          {input.includeVehicleInsurance && (
            <div className="transition-all duration-300 ease-in-out mt-2">
              <select
                value={input.riskLevel}
                onChange={(e) => onChange('riskLevel', e.target.value as RiskLevel)}
                className="w-full bg-[#F5F5F5] rounded-lg px-4 py-2 text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1A237E]"
              >
                {(Object.keys(RISK_LEVEL_LABELS) as RiskLevel[]).map((key) => (
                  <option key={key} value={key}>
                    {RISK_LEVEL_LABELS[key]}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <Toggle
            checked={input.includeLifeInsurance}
            onChange={(v) => onChange('includeLifeInsurance', v)}
            label={t('simulator.lifeInsurance')}
            description={t('simulator.lifeInsuranceDesc')}
          />
          <p className="text-xs text-gray-400 mt-1 ml-1">
            {t('simulator.fixedRate')}
          </p>
        </div>

        <div>
          <Toggle
            checked={input.hasGracePeriod}
            onChange={(v) => {
              onChange('hasGracePeriod', v);
              if (!v) {
                onChange('gracePeriodType', null);
                onChange('gracePeriodMonths', 0);
              }
            }}
            label={t('simulator.gracePeriod')}
            description={t('simulator.gracePeriodDesc')}
          />
          {input.hasGracePeriod && (
            <div className="transition-all duration-300 ease-in-out mt-3 space-y-3">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleGraceType('Total')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    input.gracePeriodType === 'Total'
                      ? 'bg-[#1A237E] text-white'
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {t('simulator.total')}
                </button>
                <button
                  type="button"
                  onClick={() => handleGraceType('Parcial')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    input.gracePeriodType === 'Parcial'
                      ? 'bg-[#1A237E] text-white'
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {t('simulator.partial')}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={input.termMonths - 1}
                  value={input.gracePeriodMonths}
                  onChange={(e) => {
                    const v = Math.min(input.termMonths - 1, Math.max(1, Number(e.target.value)));
                    onChange('gracePeriodMonths', v);
                  }}
                  className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]"
                />
                <span className="text-sm text-gray-600">{t('simulator.monthsLabel')}</span>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('simulator.startDate')}
          </label>
          <input
            type="date"
            value={input.startDate}
            onChange={(e) => onChange('startDate', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]"
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedConfigForm;
