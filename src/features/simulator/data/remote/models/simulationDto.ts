import type { SimulationInput } from '../../../domain/models/simulationInput';
import type { SimulationResult } from '../../../domain/models/simulationResult';
import type { RiskLevel } from '../../../domain/models/riskLevel';

export interface SimulationInputDto {
  vehicleId: string;
  vehicleName: string;
  vehiclePrice: number;
  vehicleLocation: string;
  downPaymentPct: number;
  downPaymentAmount: number;
  financedAmount: number;
  tea: number;
  bank: string;
  termMonths: number;
  paymentFrequency: string;
  balloonPct: number;
  balloonAmount: number;
  includeVehicleInsurance: boolean;
  riskLevel: RiskLevel;
  includeLifeInsurance: boolean;
  hasGracePeriod: boolean;
  gracePeriodType: string | null;
  gracePeriodMonths: number;
  startDate: string;
}

export interface PaymentRowDto {
  period: number;
  date: string;
  initialBalance: number;
  interest: number;
  amortization: number;
  lifeInsurance: number;
  vehicleInsurance: number;
  totalPayment: number;
  finalBalance: number;
  isBalloon: boolean;
  isGrace: boolean;
  graceType: string | null;
}

export interface SimulationResultDto {
  input: SimulationInputDto;
  rows: PaymentRowDto[];
  tea: number;
  tcea: number;
  graceInterest: number;
  van: number;
  tir: number;
  estimatedMonthlyPayment: number;
  totalInterest: number;
  totalAmortization: number;
  totalLifeInsurance: number;
  totalVehicleInsurance: number;
  totalPayment: number;
}

export function toDto(input: SimulationInput): SimulationInputDto {
  return { ...input, bank: input.bank, paymentFrequency: input.paymentFrequency, gracePeriodType: input.gracePeriodType };
}

export function fromDto(dto: SimulationInputDto): SimulationInput {
  return dto as unknown as SimulationInput;
}

export function resultToDto(result: SimulationResult): SimulationResultDto {
  return {
    input: toDto(result.input),
    rows: result.rows.map((r) => ({
      ...r,
      graceType: r.graceType,
    })),
    tea: result.tea,
    tcea: result.tcea,
    graceInterest: result.graceInterest,
    van: result.van,
    tir: result.tir,
    estimatedMonthlyPayment: result.estimatedMonthlyPayment,
    totalInterest: result.totalInterest,
    totalAmortization: result.totalAmortization,
    totalLifeInsurance: result.totalLifeInsurance,
    totalVehicleInsurance: result.totalVehicleInsurance,
    totalPayment: result.totalPayment,
  };
}

export function resultFromDto(dto: SimulationResultDto): SimulationResult {
  return dto as unknown as SimulationResult;
}
