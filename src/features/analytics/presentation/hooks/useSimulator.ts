import { useState, useCallback } from 'react';
import type { LoanParams, SimulationResult } from '../../domain/models/Simulation';
import { simulateCredito } from '../../domain/services/creditoCalculator';
import { calculateLoan } from '../../data/remote/services/simulationService';

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
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState('');

  const updateParam = useCallback(<K extends keyof LoanParams>(
    key: K,
    value: LoanParams[K]
  ) => {
    setParams((prev) => ({ ...prev, [key]: value }));
    setResult(null);
    setSaved(false);
  }, []);

  const calculate = useCallback(async () => {
    setCalculating(true);
    setError('');
    try {
      const simResult = await calculateLoan(params);
      setResult(simResult);
      setSaved(false);
    } catch {
      const fallback = simulateCredito(params);
      setResult(fallback);
    } finally {
      setCalculating(false);
    }
  }, [params]);

  const reset = useCallback(() => {
    setParams(DEFAULT_PARAMS);
    setResult(null);
    setSaved(false);
    setError('');
  }, []);

  return {
    params,
    result,
    saved,
    calculating,
    setSaved,
    updateParam,
    calculate,
    reset,
  };
}
