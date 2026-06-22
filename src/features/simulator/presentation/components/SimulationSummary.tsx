import { ArrowRight, Info, Loader } from 'lucide-react';
import type { SimulationInput } from '../../domain/models/simulationInput';
import type { SimulationResult } from '../../domain/models/simulationResult';
import { estimateMonthlyPayment, getSuggestedTeaRange } from '../../domain/utils/financialCalculations';
import { useI18n } from '../../../../core/i18n/useI18n';

interface SimulationSummaryProps {
  input: SimulationInput;
  result: SimulationResult | null;
  onCalculate: () => void;
  isCalculating: boolean;
  validationError?: string;
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(n);

function estimatedCuota(input: SimulationInput): number {
  return estimateMonthlyPayment(input.financedAmount, input.tea, input.termMonths);
}

const SimulationSummary: React.FC<SimulationSummaryProps> = ({
  input,
  result,
  onCalculate,
  isCalculating,
  validationError,
}) => {
  const { t } = useI18n();
  const estCuota = estimatedCuota(input);

  const teaRange = getSuggestedTeaRange(input.financedAmount);

  return (
    <div className="bg-[var(--color-bg-surface)] border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="bg-[var(--color-bg-page)] rounded-xl p-4 text-center mb-4">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
          {t('simulator.estimatedMonthlyPayment')}
        </p>
        <p className="text-gray-900">
          <span className="text-4xl font-bold">$ {
            result
              ? fmt(result.estimatedMonthlyPayment).split('.')[0]
              : fmt(estCuota).split('.')[0]
          }</span>
          <span className="text-xl font-bold">
            .{result
              ? fmt(result.estimatedMonthlyPayment).split('.')[1]
              : fmt(estCuota).split('.')[1]
            }
          </span>
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center py-1.5">
          <span className="text-sm text-gray-500">{t('simulator.financedAmountLabel')}</span>
          <span className="text-sm font-semibold text-gray-900">
            ${fmt(input.financedAmount)}
          </span>
        </div>
        <div className="border-t border-gray-100" />

        <div className="flex justify-between items-center py-1.5">
          <span className="text-sm text-gray-500">{t('simulator.termLabel')}</span>
          <span className="text-sm font-semibold text-[var(--color-text-primary)]">
            {input.termMonths} {t('simulator.months')}
          </span>
        </div>
        <div className="border-t border-gray-100" />

        <div className="flex justify-between items-center py-1.5">
          <span className="text-sm text-gray-500">{t('simulator.appliedTea')}</span>
          <span className="text-sm font-semibold text-[var(--color-text-primary)]">
            {(input.tea * 100).toFixed(2)}%
          </span>
        </div>
        <div className="border-t border-gray-100" />

        {result && (
          <>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-500">{t('simulator.estimatedTcea')}</span>
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                {(result.tcea * 100).toFixed(2)}%
              </span>
            </div>
            <div className="border-t border-gray-100" />
          </>
        )}
      </div>

      <div className="bg-[var(--color-primary-50)] rounded-lg p-3 flex gap-2 items-start mt-4">
        <Info size={16} className="text-[var(--color-text-primary)] flex-shrink-0 mt-0.5" />
        <p className="text-xs text-[var(--color-text-primary)]">
          {t('simulator.teaAlert', { amount: fmt(input.financedAmount), min: (teaRange.min * 100).toFixed(2), max: (teaRange.max * 100).toFixed(2) })}
        </p>
      </div>

      {validationError && (
        <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 mt-3">
          {validationError}
        </div>
      )}

      <button
        onClick={onCalculate}
        disabled={isCalculating}
        className="w-full bg-[var(--color-accent-secondary)] text-white py-4 rounded-xl text-base font-semibold hover:bg-[#388E3C] transition-all duration-300 hover:shadow-xl hover:scale-105 transform cursor-pointer flex items-center justify-center gap-2 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isCalculating ? (
          <>
            <Loader size={18} className="animate-spin" />
            {t('simulator.calculating')}
          </>
        ) : (
          <>
            {t('simulator.calculateSchedule')}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        {t('common.referentialDisclaimer')}
      </p>
    </div>
  );
};

export default SimulationSummary;
