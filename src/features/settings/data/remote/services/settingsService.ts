import type { LifeInsuranceRateDto, TeaRateDto, AmountLimitsDto } from '../models/settingsDto';
import { DEFAULT_LIFE_INSURANCE_RATES } from '../../../domain/models/lifeInsuranceRate';
import { DEFAULT_TEA_RATES } from '../../../domain/models/teaRate';
import { DEFAULT_AMOUNT_LIMITS } from '../../../domain/models/amountLimits';
import type { LifeInsuranceRate } from '../../../domain/models/lifeInsuranceRate';
import type { TeaRate } from '../../../domain/models/teaRate';
import type { AmountLimits } from '../../../domain/models/amountLimits';
import { lifeInsuranceRateToDto, lifeInsuranceRateFromDto, teaRateToDto, teaRateFromDto, amountLimitsToDto, amountLimitsFromDto } from '../models/settingsDto';

const STORAGE_KEY = 'intiva_settings';

interface StoredSettings {
  lifeInsuranceRates: LifeInsuranceRateDto[];
  teaRates: TeaRateDto[];
  amountLimits: AmountLimitsDto;
}

function getDefaults(): StoredSettings {
  return {
    lifeInsuranceRates: DEFAULT_LIFE_INSURANCE_RATES.map(lifeInsuranceRateToDto),
    teaRates: DEFAULT_TEA_RATES.map(teaRateToDto),
    amountLimits: amountLimitsToDto(DEFAULT_AMOUNT_LIMITS),
  };
}

export function loadSettings(): StoredSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaults();
    const parsed = JSON.parse(raw) as StoredSettings;
    if (!parsed.lifeInsuranceRates || !parsed.amountLimits) return getDefaults();
    return parsed;
  } catch {
    return getDefaults();
  }
}

export function saveSettings(data: StoredSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // noop
  }
}

export function loadLifeInsuranceRates(): LifeInsuranceRate[] {
  const stored = loadSettings();
  return stored.lifeInsuranceRates.map(lifeInsuranceRateFromDto);
}

export function saveLifeInsuranceRates(rates: LifeInsuranceRate[]): void {
  const stored = loadSettings();
  stored.lifeInsuranceRates = rates.map(lifeInsuranceRateToDto);
  saveSettings(stored);
}

export function loadTeaRates(): TeaRate[] {
  const stored = loadSettings();
  return (stored.teaRates ?? []).map(teaRateFromDto);
}

export function saveTeaRates(rates: TeaRate[]): void {
  const stored = loadSettings();
  stored.teaRates = rates.map(teaRateToDto);
  saveSettings(stored);
}

export function loadAmountLimits(): AmountLimits {
  const stored = loadSettings();
  return amountLimitsFromDto(stored.amountLimits);
}

export function saveAmountLimits(limits: AmountLimits): void {
  const stored = loadSettings();
  stored.amountLimits = amountLimitsToDto(limits);
  saveSettings(stored);
}
