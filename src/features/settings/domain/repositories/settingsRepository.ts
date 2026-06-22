import type { BaseConfig } from '../models/baseConfig';
import type { LifeInsuranceRate } from '../models/lifeInsuranceRate';
import type { TeaMatrixEntry } from '../models/teaMatrix';
import type { AmountLimits } from '../models/amountLimits';

export interface SettingsRepository {
  getBaseConfig(): BaseConfig;
  getLifeInsuranceRates(): LifeInsuranceRate[];
  getTeaMatrixEntries(): TeaMatrixEntry[];
  getAmountLimits(): AmountLimits;
  updateLifeInsuranceRate(id: string, rate: number): LifeInsuranceRate;
  updateAmountLimits(min: number, max: number): AmountLimits;
}
