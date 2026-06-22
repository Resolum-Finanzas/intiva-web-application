import { useState } from 'react';
import {
  SelectedVehicleBanner,
  BasicDataForm,
  AdvancedConfigForm,
  SimulationSummary,
} from '../components';
import { simulatorRepositoryImpl } from '../../data/repositories/simulatorRepositoryImpl';
import { saveSimulation } from '../../data/remote/services/simulatorService';
import { RiskLevel } from '../../domain/models/riskLevel';
import { getSuggestedTeaRange } from '../../domain/utils/financialCalculations';
import { useI18n } from '../../../../core/i18n/useI18n';
import type { SimulationInput } from '../../domain/models/simulationInput';
import type { SimulationResult } from '../../domain/models/simulationResult';
import PageContainer from '../../../../shared/presentation/components/pagecontainer/PageContainer.component';

function createInitialInput(): SimulationInput {
  const vehiclePrice = 32500;
  return {
    vehicleId: '',
    vehicleName: 'Selecciona un vehículo',
    vehiclePrice,
    vehicleLocation: 'Lima, Perú',
    downPaymentPct: 20,
    downPaymentAmount: vehiclePrice * 0.20,
    financedAmount: vehiclePrice * 0.80,
    tea: 0.145,
    bank: 'BCP',
    termMonths: 48,
    paymentFrequency: 'Mensual',
    balloonPct: 40,
    balloonAmount: vehiclePrice * 0.40,
    includeVehicleInsurance: true,
    riskLevel: RiskLevel.BAJO_RIESGO_1,
    includeLifeInsurance: true,
    hasGracePeriod: false,
    gracePeriodType: null,
    gracePeriodMonths: 0,
    startDate: new Date().toISOString().split('T')[0],
  };
}

const SimulatorPage: React.FC = () => {
  const { t } = useI18n();
  const [input, setInput] = useState<SimulationInput>(createInitialInput);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (field: keyof SimulationInput, value: unknown) => {
    setInput((prev) => {
      const next = { ...prev, [field]: value };

      if (field === 'downPaymentPct') {
        const pct = value as number;
        next.downPaymentAmount = next.vehiclePrice * (pct / 100);
        next.financedAmount = next.vehiclePrice - next.downPaymentAmount;
      }

      if (field === 'balloonPct') {
        next.balloonAmount = next.vehiclePrice * ((value as number) / 100);
      }

      return next;
    });
    setValidationError('');
  };

  const handleCalculate = () => {
    if (input.downPaymentPct < 10) {
      setValidationError(t('simulator.validationDownPayment'));
      return;
    }
    if (input.tea <= 0 || input.tea >= 1) {
      setValidationError(t('simulator.validationTea'));
      return;
    }
    if (input.termMonths <= 0) {
      setValidationError(t('simulator.validationTerm'));
      return;
    }
    if (input.hasGracePeriod && input.gracePeriodMonths >= input.termMonths) {
      setValidationError(t('simulator.validationGracePeriod'));
      return;
    }

    setIsCalculating(true);
    setValidationError('');

    const simResult = simulatorRepositoryImpl.calculate(input);
    setResult(simResult);
    setIsCalculating(false);

    try {
      saveSimulation(simResult);
    } catch {
      // noop
    }
  };

  const teaRange = getSuggestedTeaRange(input.financedAmount);

  return (
    <PageContainer title={t('simulator.title')} variant="default">
      <div className="flex gap-6 items-start">
        <div className="flex-1 space-y-6">
          <div className="animate-fade-in-down">
            <SelectedVehicleBanner
              vehicleName={input.vehicleName}
              vehiclePrice={input.vehiclePrice}
              location={input.vehicleLocation}
            />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-[var(--color-bg-surface)] rounded-xl border border-gray-100 p-6">
              <BasicDataForm
                input={input}
                onChange={handleChange}
                teaRange={teaRange}
              />
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-[var(--color-bg-surface)] rounded-xl border border-gray-100 p-6">
              <AdvancedConfigForm
                input={input}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="w-96 sticky top-24 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <SimulationSummary
            input={input}
            result={result}
            onCalculate={handleCalculate}
            isCalculating={isCalculating}
            validationError={validationError}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default SimulatorPage;
