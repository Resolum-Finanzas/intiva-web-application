export interface PaymentRow {
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
  graceType: 'Total' | 'Parcial' | null;
}
