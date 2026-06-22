import type { SettingsRepository } from '../../domain/repositories/settingsRepository';
import type { BaseConfig } from '../../domain/models/baseConfig';
import type { LifeInsuranceRate } from '../../domain/models/lifeInsuranceRate';
import type { TeaMatrixEntry } from '../../domain/models/teaMatrix';
import type { AmountLimits } from '../../domain/models/amountLimits';
import { DEFAULT_BASE_CONFIG } from '../../domain/models/baseConfig';
import { TEA_MATRIX_ENTRIES } from '../../domain/models/teaMatrix';
import { loadLifeInsuranceRates, saveLifeInsuranceRates, loadAmountLimits, saveAmountLimits } from '../remote/services/settingsService';

export const settingsRepositoryImpl: SettingsRepository = {
  getBaseConfig(): BaseConfig {
    return DEFAULT_BASE_CONFIG;
  },

  getLifeInsuranceRates(): LifeInsuranceRate[] {
    return loadLifeInsuranceRates();
  },

  getTeaMatrixEntries(): TeaMatrixEntry[] {
    return TEA_MATRIX_ENTRIES;
  },

  getAmountLimits(): AmountLimits {
    return loadAmountLimits();
  },

  updateLifeInsuranceRate(id: string, rate: number): LifeInsuranceRate {
    const rates = loadLifeInsuranceRates();
    const index = rates.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new Error(`Rate with id "${id}" not found`);
    }
    const updated: LifeInsuranceRate = {
      ...rates[index],
      monthlyRate: rate,
      monthlyRateLabel: `${(rate * 100).toFixed(3)}%`,
      lastUpdated: new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
    rates[index] = updated;
    saveLifeInsuranceRates(rates);
    return updated;
  },

  updateAmountLimits(min: number, max: number): AmountLimits {
    if (min >= max) {
      throw new Error('El monto mínimo debe ser menor al monto máximo');
    }
    const updated: AmountLimits = {
      ...loadAmountLimits(),
      minAmount: min,
      maxAmount: max,
    };
    saveAmountLimits(updated);
    return updated;
  },
};
