import type { Vehicle, VehicleCategory } from '../models/vehicle';

export interface VehicleRepository {
  getAll(): Promise<Vehicle[]>;
  getById(id: string): Promise<Vehicle | null>;
  getByCategory(category: VehicleCategory): Promise<Vehicle[]>;
}
