import type { BaseConfig } from '../../../domain/models/baseConfig';
import type { LifeInsuranceRate } from '../../../domain/models/lifeInsuranceRate';
import type { TeaMatrixEntry } from '../../../domain/models/teaMatrix';
import type { TeaRate } from '../../../domain/models/teaRate';
import type { AmountLimits } from '../../../domain/models/amountLimits';

export interface BaseConfigDto {
  currency: string;
  currencyLabel: string;
  rateType: string;
  rateTypeLabel: string;
  isEditable: boolean;
}

export interface LifeInsuranceRateDto {
  id: string;
  coverageType: string;
  monthlyRate: number;
  monthlyRateLabel: string;
  lastUpdated: string;
  isEditable: boolean;
}

export interface TeaMatrixEntryDto {
  vehicleType: string;
  label: string;
  icon: string;
  route: string;
}

export interface TeaRateDto {
  id: string;
  vehicleType: string;
  riskProfile: string;
  rate: number;
  rateLabel: string;
  lastUpdated: string;
  isEditable: boolean;
}

export interface AmountLimitsDto {
  currency: string;
  currencySymbol: string;
  minAmount: number;
  maxAmount: number;
  isEditable: boolean;
}

export function baseConfigToDto(config: BaseConfig): BaseConfigDto {
  return { ...config };
}

export function baseConfigFromDto(dto: BaseConfigDto): BaseConfig {
  return dto as BaseConfig;
}

export function lifeInsuranceRateToDto(rate: LifeInsuranceRate): LifeInsuranceRateDto {
  return { ...rate };
}

export function lifeInsuranceRateFromDto(dto: LifeInsuranceRateDto): LifeInsuranceRate {
  return dto as LifeInsuranceRate;
}

export function teaMatrixEntryToDto(entry: TeaMatrixEntry): TeaMatrixEntryDto {
  return { ...entry };
}

export function teaMatrixEntryFromDto(dto: TeaMatrixEntryDto): TeaMatrixEntry {
  return dto as TeaMatrixEntry;
}

export function teaRateToDto(rate: TeaRate): TeaRateDto {
  return { ...rate };
}

export function teaRateFromDto(dto: TeaRateDto): TeaRate {
  return dto as TeaRate;
}

export function amountLimitsToDto(limits: AmountLimits): AmountLimitsDto {
  return { ...limits };
}

export function amountLimitsFromDto(dto: AmountLimitsDto): AmountLimits {
  return dto as AmountLimits;
}
