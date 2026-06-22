export interface AmountLimits {
  currency: 'PEN' | 'USD';
  currencySymbol: string;
  minAmount: number;
  maxAmount: number;
  isEditable: boolean;
}

export const DEFAULT_AMOUNT_LIMITS: AmountLimits = {
  currency: 'PEN',
  currencySymbol: 'S/',
  minAmount: 15000,
  maxAmount: 250000,
  isEditable: true,
};
