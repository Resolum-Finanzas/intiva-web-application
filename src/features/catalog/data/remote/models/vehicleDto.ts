import type { PriceDto } from './priceDto';

export type VehicleCategoryDto = 'SUV' | 'Sedan' | 'Electrico' | 'Hibrido';
export type VehicleBadgeDto = 'Hybrid' | 'Premium' | '100% Electric';

export interface VehicleSpecsDto {
  transmission: string;
  engine: string;
  horsepower?: string;
  torque?: string;
  drivetrain?: string;
  fuelEconomy?: string;
  autonomy?: string;
  acceleration?: string;
  passengers?: number;
  safety?: string;
}

export interface VehicleDto {
  id: string;
  name: string;
  year: number;
  variant: string;
  category: VehicleCategoryDto;
  badge: VehicleBadgeDto | null;
  price: PriceDto;
  imageUrl: string;
  specs: VehicleSpecsDto;
  description: string;
  images: string[];
  location: string;
}
