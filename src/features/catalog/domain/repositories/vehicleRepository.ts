import type { Vehicle, VehicleCategory } from '../models/vehicle';

export interface VehicleRepository {
  getAll(): Vehicle[];
  getById(id: string): Vehicle | undefined;
  getByCategory(category: VehicleCategory): Vehicle[];
}
