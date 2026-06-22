import type { SimulatorRepository } from '../../domain/repositories/simulatorRepository';
import type { SimulationInput } from '../../domain/models/simulationInput';
import type { SimulationResult } from '../../domain/models/simulationResult';
import {
  calculateSchedule,
  estimateMonthlyPayment,
  calculateNpv,
  calculateIrr,
  calculateTcea,
  getSuggestedTeaRange,
} from '../../domain/utils/financialCalculations';
import { saveSimulation } from '../remote/services/simulatorService';

function monthlyCok(): number {
  return Math.pow(1 + 0.05, 1 / 12) - 1;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export const simulatorRepositoryImpl: SimulatorRepository = {
  calculate(input: SimulationInput): SimulationResult {
    const rows = calculateSchedule(input);

    const graceInterest = rows
      .filter((r) => r.isGrace)
      .reduce((sum, r) => sum + (r.graceType === 'Parcial' ? r.interest : 0), 0);

    const totalInterest = round2(rows.reduce((s, r) => s + r.interest, 0));
    const totalAmortization = round2(rows.reduce((s, r) => s + r.amortization, 0));
    const totalLifeInsurance = round2(rows.reduce((s, r) => s + r.lifeInsurance, 0));
    const totalVehicleInsurance = round2(rows.reduce((s, r) => s + r.vehicleInsurance, 0));
    const totalPayment = round2(rows.reduce((s, r) => s + r.totalPayment, 0));

    const estimatedMonthlyPayment = estimateMonthlyPayment(
      input.financedAmount,
      input.tea,
      input.termMonths,
    );

    const cashFlows = [
      -input.financedAmount,
      ...rows
        .filter((r) => !r.isGrace || r.graceType === 'Parcial')
        .map((r) => r.totalPayment),
    ];

    const npv = calculateNpv(monthlyCok(), cashFlows);
    const irrMonthly = calculateIrr(cashFlows);
    const tir = Math.pow(1 + irrMonthly, 12) - 1;

    const regularPayments = rows
      .filter((r) => !r.isGrace || r.graceType === 'Parcial')
      .map((r) => r.totalPayment);

    const tceaMonthly = calculateTcea(input.financedAmount, regularPayments);
    const tcea = Math.pow(1 + tceaMonthly, 12) - 1;

    const result: SimulationResult = {
      input,
      rows,
      tea: input.tea,
      tcea: round2(tcea),
      graceInterest: round2(graceInterest),
      van: round2(npv),
      tir: round2(tir),
      estimatedMonthlyPayment: round2(estimatedMonthlyPayment),
      totalInterest,
      totalAmortization,
      totalLifeInsurance,
      totalVehicleInsurance,
      totalPayment,
    };

    try {
      saveSimulation(result);
    } catch {
      // persistence failure should not block the calculation
    }

    return result;
  },

  getSuggestedTeaRange(amount: number): { min: number; max: number } {
    return getSuggestedTeaRange(amount);
  },
};
