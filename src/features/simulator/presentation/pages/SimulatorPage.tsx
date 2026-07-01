import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SelectedVehicleBanner,
  BasicDataForm,
  AdvancedConfigForm,
  SimulationSummary,
} from '../components';
import { simulatorRepositoryImpl } from '../../data/repositories/simulatorRepositoryImpl';
import { saveSimulation } from '../../data/remote/services/simulatorService';
import { vehicleRepositoryImpl } from '../../../catalog/data/repositories/vehicleRepositoryImpl';
import { calculateLoan } from '../../../analytics/data/remote/services/simulationService';
import { RiskLevel } from '../../domain/models/riskLevel';
import { getSuggestedTeaRange } from '../../domain/utils/financialCalculations';
import { useI18n } from '../../../../core/i18n/useI18n';
import type { SimulationInput } from '../../domain/models/simulationInput';
import type { SimulationResult } from '../../domain/models/simulationResult';
import type { PaymentRow } from '../../domain/models/paymentRow';
import type { LoanParams } from '../../../analytics/domain/models/Simulation';
import PageContainer from '../../../../shared/presentation/components/pagecontainer/PageContainer.component';

function createInitialInput(vehiclePrice = 32500): SimulationInput {
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
  const [searchParams] = useSearchParams();
  const [input, setInput] = useState<SimulationInput>(createInitialInput);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const vehicleId = searchParams.get('vehicleId');
    if (vehicleId) {
      vehicleRepositoryImpl.getById(vehicleId).then((vehicle) => {
        if (vehicle) {
          setInput(createInitialInput(vehicle.price.amount));
          setInput((prev) => ({
            ...prev,
            vehicleId: vehicle.id,
            vehicleName: `${vehicle.name} ${vehicle.variant} ${vehicle.year}`,
            vehiclePrice: vehicle.price.amount,
            vehicleLocation: vehicle.location,
            downPaymentAmount: vehicle.price.amount * 0.20,
            financedAmount: vehicle.price.amount * 0.80,
            balloonAmount: vehicle.price.amount * 0.40,
          }));
        }
      });
    }
  }, [searchParams]);

  const handleChange = (field: keyof SimulationInput, value: unknown) => {
    setInput((prev) => {
      const clamped = typeof value === 'number' && !Number.isNaN(value) ? Math.max(0, value) : value;
      const next = { ...prev, [field]: clamped };

      if (field === 'downPaymentPct') {
        const pct = clamped as number;
        next.downPaymentAmount = next.vehiclePrice * (pct / 100);
        next.financedAmount = next.vehiclePrice - next.downPaymentAmount;
      }

      if (field === 'balloonPct') {
        next.balloonAmount = next.vehiclePrice * ((clamped as number) / 100);
      }

      return next;
    });
    setValidationError('');
  };

  function inputToLoanParams(i: SimulationInput): LoanParams {
    return {
      vehiclePrice: i.vehiclePrice,
      downPayment: i.downPaymentAmount,
      termMonths: i.termMonths,
      tea: i.tea,
      desgravamenRate: 0.00077,
      seguroVehicular: i.includeVehicleInsurance ? 85 : 0,
      gracePeriodMonths: i.gracePeriodMonths,
      balloonPercent: i.balloonPct / 100,
    };
  }

  function apiResultToSimulatorResult(apiResult: import('../../../analytics/domain/models/Simulation').SimulationResult, simInput: SimulationInput): SimulationResult {
    const rows: PaymentRow[] = apiResult.schedule.map((inst, idx) => ({
      period: inst.num,
      date: inst.fecha,
      initialBalance: inst.saldoInicial,
      interest: inst.interes,
      amortization: inst.amortizacion,
      lifeInsurance: inst.desgravamen,
      vehicleInsurance: inst.seguroVehicular,
      totalPayment: inst.cuotaTotal,
      finalBalance: inst.saldoFinal,
      isBalloon: inst.isBalloon ?? false,
      isGrace: inst.isGrace ?? false,
      graceType: inst.isGrace ? (idx === 0 ? 'Total' : null) : null,
    }));

    return {
      input: simInput,
      rows,
      tea: apiResult.loanParams.tea,
      tcea: apiResult.metrics.tcea,
      graceInterest: apiResult.metrics.interesGracia,
      van: apiResult.metrics.van,
      tir: apiResult.metrics.tir,
      estimatedMonthlyPayment: apiResult.metrics.cuotaMensual,
      totalInterest: apiResult.metrics.totalInteres,
      totalAmortization: apiResult.metrics.totalAmortizacion,
      totalLifeInsurance: apiResult.metrics.totalDesgravamen,
      totalVehicleInsurance: apiResult.metrics.totalSeguro,
      totalPayment: apiResult.metrics.totalInteres + apiResult.metrics.totalAmortizacion + apiResult.metrics.totalDesgravamen + apiResult.metrics.totalSeguro,
    };
  }

  const handleCalculate = async () => {
    if (!input.vehicleId) {
      setValidationError('Debes seleccionar un vehículo');
      return;
    }
    if (input.downPaymentPct < 10 || input.downPaymentPct > 60) {
      setValidationError(t('simulator.validationDownPayment'));
      return;
    }
    if (input.downPaymentAmount >= input.vehiclePrice) {
      setValidationError('La cuota inicial no puede ser mayor o igual al precio del vehículo');
      return;
    }
    if (input.tea <= 0 || input.tea >= 1) {
      setValidationError(t('simulator.validationTea'));
      return;
    }
    if (input.balloonPct < 0 || input.balloonPct > 100) {
      setValidationError('El porcentaje de cuota balón debe estar entre 0% y 100%');
      return;
    }
    if (input.termMonths <= 0 || input.termMonths > 120) {
      setValidationError(t('simulator.validationTerm'));
      return;
    }
    if (input.hasGracePeriod && !input.gracePeriodType) {
      setValidationError('Selecciona el tipo de período de gracia');
      return;
    }
    if (input.hasGracePeriod && input.gracePeriodMonths >= input.termMonths) {
      setValidationError(t('simulator.validationGracePeriod'));
      return;
    }
    if (!input.startDate) {
      setValidationError('Debes seleccionar una fecha de inicio');
      return;
    }

    setIsCalculating(true);
    setValidationError('');

    try {
      const loanParams = inputToLoanParams(input);
      const apiResult = await calculateLoan(loanParams);
      const simResult = apiResultToSimulatorResult(apiResult, input);
      setResult(simResult);
      try {
        saveSimulation(simResult);
      } catch {
        // noop
      }
    } catch {
      const simResult = simulatorRepositoryImpl.calculate(input);
      setResult(simResult);
      try {
        saveSimulation(simResult);
      } catch {
        // noop
      }
    } finally {
      setIsCalculating(false);
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
