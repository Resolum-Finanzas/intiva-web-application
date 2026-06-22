import type { SimulationInput } from './simulationInput';
import type { PaymentRow } from './paymentRow';

export interface SimulationResult {
  input: SimulationInput;
  rows: PaymentRow[];

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
