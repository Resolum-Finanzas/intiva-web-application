export type CoverageType = 'Individual' | 'Mancomunado';

export interface LifeInsuranceRate {
  id: string;
  coverageType: CoverageType;
  monthlyRate: number;
  monthlyRateLabel: string;
  lastUpdated: string;
  isEditable: boolean;
}

export const DEFAULT_LIFE_INSURANCE_RATES: LifeInsuranceRate[] = [
  {
    id: 'individual',
    coverageType: 'Individual',
    monthlyRate: 0.00056,
    monthlyRateLabel: '0.056%',
    lastUpdated: '12 Mar 2024',
    isEditable: true,
  },
  {
    id: 'mancomunado',
    coverageType: 'Mancomunado',
    monthlyRate: 0.00098,
    monthlyRateLabel: '0.098%',
    lastUpdated: '12 Mar 2024',
    isEditable: true,
  },
];
