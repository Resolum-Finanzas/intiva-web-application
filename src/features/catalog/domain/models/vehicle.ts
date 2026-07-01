import type { Price } from './price';

export type VehicleCategory = string;
export type VehicleBadge = 'Hybrid' | 'Premium' | '100% Electric';

export interface VehicleSpecs {
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

export interface Vehicle {
  id: string;
  name: string;
  year: number;
  variant: string;
  category: VehicleCategory;
  badge: VehicleBadge | null;
  price: Price;
  imageUrl: string;
  images: string[];
  specs: VehicleSpecs;
  description: string;
  location: string;
}
