export interface VehicleSpecsDto {
  combined_consumption?: string;
  comfort?: string;
  engine_power?: string;
  safety?: string;
}

export interface VehicleDto {
  id: number;
  make: string;
  model: string;
  version: string;
  year: number;
  price: number;
  reference_price: number;
  residual_value: number;
  photo_url: string;
  fuel_type: string;
  transmission: string;
  drivetrain: string;
  mileage: number;
  condition: string;
  vehicle_type: string;
  color_aesthetics: string;
  interest_rate: string;
  risk_category: string;
  vehicle_insurance: unknown;
  specs: VehicleSpecsDto;
}
