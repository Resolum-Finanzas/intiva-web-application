import { useState, useCallback } from 'react';
import type { LoanParams, SimulationResult } from '../../domain/models/Simulation';
import { simulateCredito } from '../../domain/services/creditoCalculator';

const DEFAULT_PARAMS: LoanParams = {
  vehiclePrice: 65000,
  downPayment: 13000,
  termMonths: 60,
  tea: 0.125,
  desgravamenRate: 0.00056,
  seguroVehicular: 85,
  gracePeriodMonths: 0,
  balloonPercent: 0,
};

export function useSimulator() {
  const [params, setParams] = useState<LoanParams>(DEFAULT_PARAMS);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [saved, setSaved] = useState(false);

  const updateParam = useCallback(<K extends keyof LoanParams>(
    key: K,
    value: LoanParams[K]
  ) => {
    setParams((prev) => ({ ...prev, [key]: value }));
    setResult(null);
    setSaved(false);
  }, []);

  const calculate = useCallback(() => {
    const simResult = simulateCredito(params);
    setResult(simResult);
    setSaved(false);
  }, [params]);

  const reset = useCallback(() => {
    setParams(DEFAULT_PARAMS);
    setResult(null);
    setSaved(false);
  }, []);

  return {
    params,
    result,
    saved,
    setSaved,
    updateParam,
    calculate,
    reset,
  };
}
