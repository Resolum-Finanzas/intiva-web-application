export interface BaseConfig {
  currency: 'USD' | 'PEN';
  currencyLabel: string;
  rateType: 'TEA';
  rateTypeLabel: string;
  isEditable: false;
}

export const DEFAULT_BASE_CONFIG: BaseConfig = {
  currency: 'PEN',
  currencyLabel: 'Soles (PEN)',
  rateType: 'TEA',
  rateTypeLabel: 'Tasa Efectiva Anual (TEA)',
  isEditable: false,
};
