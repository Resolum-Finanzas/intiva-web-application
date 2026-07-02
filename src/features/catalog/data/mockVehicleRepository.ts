import type { VehicleRepository } from '../domain/repositories/vehicleRepository';
import type { Vehicle, VehicleCategory } from '../domain/models/vehicle';
import { getVehicles } from './remote/services/vehicleService';

function mapToDomain(dto: import('./remote/models/vehicleDto').VehicleDto): Vehicle {
  return {
    id: String(dto.id),
    name: `${dto.make} ${dto.model}`,
    year: dto.year,
    variant: dto.version,
    category: dto.vehicle_type as VehicleCategory,
    badge: null,
    price: {
      amount: dto.price,
      currency: 'USD',
      formatted: `$${dto.price.toLocaleString('en-US')}`,
    },
    imageUrl: dto.photo_url,
    images: [dto.photo_url],
    specs: {
      transmission: dto.transmission || '',
      engine: dto.fuel_type,
      drivetrain: dto.drivetrain,
      safety: dto.specs?.safety,
      fuelEconomy: dto.specs?.combined_consumption,
    },
    description: '',
    location: '',
  };
}

export const mockVehicleRepository: VehicleRepository = {
  async getAll(): Promise<Vehicle[]> {
    const dtos = await getVehicles();
    return dtos.map(mapToDomain);
  },

  async getById(id: string): Promise<Vehicle | null> {
    const dtos = await getVehicles();
    const dto = dtos.find((v) => String(v.id) === id);
    return dto ? mapToDomain(dto) : null;
  },

  async getByCategory(category: VehicleCategory): Promise<Vehicle[]> {
    const dtos = await getVehicles();
    return dtos
      .filter((v) => v.vehicle_type === category)
      .map(mapToDomain);
  },
};
