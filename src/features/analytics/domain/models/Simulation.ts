export interface LoanParams {
  vehiclePrice: number;
  downPayment: number;
  termMonths: number;
  tea: number;
  desgravamenRate: number;
  seguroVehicular: number;
  gracePeriodMonths?: number;
  balloonPercent?: number;
}

export interface Installment {
  num: number;
  fecha: string;
  saldoInicial: number;
  interes: number;
  amortizacion: number;
  desgravamen: number;
  seguroVehicular: number;
  cuotaTotal: number;
  saldoFinal: number;
  isGrace?: boolean;
  isBalloon?: boolean;
}

export interface SimulationMetrics {
  tea: number;
  tcea: number;
  interesGracia: number;
  van: number;
  tir: number;
  totalInteres: number;
  totalAmortizacion: number;
  totalDesgravamen: number;
  totalSeguro: number;
  cuotaMensual: number;
  totalFinanciado: number;
}

export interface SimulationResult {
  loanParams: LoanParams;
  metrics: SimulationMetrics;
  schedule: Installment[];
}
