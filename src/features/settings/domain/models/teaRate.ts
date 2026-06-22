export type RiskProfile = 'Bajo' | 'Medio' | 'Alto';

export interface TeaRate {
  id: string;
  vehicleType: string;
  riskProfile: RiskProfile;
  rate: number;
  rateLabel: string;
  lastUpdated: string;
  isEditable: boolean;
}

export interface RiskProfileOption {
  value: RiskProfile;
  label: string;
  description: string;
}

export const RISK_PROFILES: RiskProfileOption[] = [
  { value: 'Bajo', label: 'Bajo', description: 'Clientes con historial crediticio excelente' },
  { value: 'Medio', label: 'Medio', description: 'Clientes con historial crediticio regular' },
  { value: 'Alto', label: 'Alto', description: 'Clientes con historial crediticio limitado' },
];

export const DEFAULT_TEA_RATES: TeaRate[] = [
  { id: 'ligeros-bajo', vehicleType: 'Ligeros', riskProfile: 'Bajo', rate: 0.095, rateLabel: '9.50%', lastUpdated: '01 Ene 2024', isEditable: true },
  { id: 'ligeros-medio', vehicleType: 'Ligeros', riskProfile: 'Medio', rate: 0.125, rateLabel: '12.50%', lastUpdated: '01 Ene 2024', isEditable: true },
  { id: 'ligeros-alto', vehicleType: 'Ligeros', riskProfile: 'Alto', rate: 0.165, rateLabel: '16.50%', lastUpdated: '01 Ene 2024', isEditable: true },
  { id: 'comerciales-bajo', vehicleType: 'Comerciales', riskProfile: 'Bajo', rate: 0.105, rateLabel: '10.50%', lastUpdated: '01 Ene 2024', isEditable: true },
  { id: 'comerciales-medio', vehicleType: 'Comerciales', riskProfile: 'Medio', rate: 0.135, rateLabel: '13.50%', lastUpdated: '01 Ene 2024', isEditable: true },
  { id: 'comerciales-alto', vehicleType: 'Comerciales', riskProfile: 'Alto', rate: 0.175, rateLabel: '17.50%', lastUpdated: '01 Ene 2024', isEditable: true },
];
