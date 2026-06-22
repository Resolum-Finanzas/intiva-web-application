import type { VehicleRepository } from '../domain/repositories/vehicleRepository';
import type { Vehicle, VehicleCategory } from '../domain/models/vehicle';
import { getVehicles } from './remote/services/vehicleService';

function mapToDomain(dto: import('./remote/models/vehicleDto').VehicleDto): Vehicle {
  return {
    id: dto.id,
    name: dto.name,
    year: dto.year,
    variant: dto.variant,
    category: dto.category,
    badge: dto.badge,
    price: {
      amount: dto.price.amount,
      currency: dto.price.currency,
      formatted: `$${dto.price.amount.toLocaleString('en-US')}`,
    },
    imageUrl: dto.imageUrl,
    images: dto.images,
    specs: { ...dto.specs },
    description: dto.description,
    location: dto.location,
  };
}

export const mockVehicleRepository: VehicleRepository = {
  getAll(): Vehicle[] {
    return getVehicles().map(mapToDomain);
  },

  getById(id: string): Vehicle | undefined {
    const dto = getVehicles().find((v) => v.id === id);
    return dto ? mapToDomain(dto) : undefined;
  },

  getByCategory(category: VehicleCategory): Vehicle[] {
    return getVehicles()
      .filter((v) => v.category === category)
      .map(mapToDomain);
  },
};
