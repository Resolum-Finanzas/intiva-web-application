import type { BaseConfig } from '../models/baseConfig';
import type { LifeInsuranceRate } from '../models/lifeInsuranceRate';
import type { TeaMatrixEntry, VehicleType } from '../models/teaMatrix';
import type { TeaRate } from '../models/teaRate';
import type { AmountLimits } from '../models/amountLimits';

export interface SettingsRepository {
  getBaseConfig(): BaseConfig;
  getLifeInsuranceRates(): LifeInsuranceRate[];
  getTeaMatrixEntries(): TeaMatrixEntry[];
  getTeaRates(): TeaRate[];
  getTeaRatesByVehicle(vehicleType: VehicleType): TeaRate[];
  updateTeaRate(id: string, rate: number): TeaRate;
  getAmountLimits(): AmountLimits;
  updateLifeInsuranceRate(id: string, rate: number): LifeInsuranceRate;
  updateAmountLimits(min: number, max: number): AmountLimits;
}
