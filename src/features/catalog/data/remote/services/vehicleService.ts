import type { VehicleDto } from '../models/vehicleDto';
import { fetchWithAuth } from '../../../../../core/network/interceptor/Auth.interceptor';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const VEHICLES_PATH = import.meta.env.VITE_VEHICLES_BASE_PATH ?? '/api/v1/vehicles';

export async function getVehicles(): Promise<VehicleDto[]> {
  const response = await fetchWithAuth(`${BASE_URL}${VEHICLES_PATH}`);
  if (response.status === 401) {
    throw new Error('Sesión expirada. Inicia sesión nuevamente.');
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export async function getVehicleById(id: string): Promise<VehicleDto> {
  const response = await fetchWithAuth(`${BASE_URL}${VEHICLES_PATH}/${id}`);
  if (response.status === 401) {
    throw new Error('Sesión expirada. Inicia sesión nuevamente.');
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export async function assignInsurance(vehicleId: string): Promise<void> {
  const response = await fetchWithAuth(`${BASE_URL}${VEHICLES_PATH}/${vehicleId}/assign`, {
    method: 'POST',
  });
  if (response.status === 401) {
    throw new Error('Sesión expirada. Inicia sesión nuevamente.');
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
}
