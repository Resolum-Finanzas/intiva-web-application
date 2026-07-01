import type { RiskLevel } from './riskLevel';

export interface SimulationInput {
  vehicleId: string;
  vehicleName: string;
  vehiclePrice: number;
  vehicleLocation: string;

  downPaymentPct: number;
  downPaymentAmount: number;
  financedAmount: number;
  tea: number;
  bank: 'BCP';

  termMonths: number;
  paymentFrequency: 'Mensual' | 'Trimestral' | 'Semestral';
  balloonPct: number;
  balloonAmount: number;

  includeVehicleInsurance: boolean;
  riskLevel: RiskLevel;
  includeLifeInsurance: boolean;

  hasGracePeriod: boolean;
  gracePeriodType: 'Total' | 'Parcial' | null;
  gracePeriodMonths: number;

  startDate: string;
}
