import type { SimulationResultDto, SimulationInputDto } from '../models/simulationDto';
import { resultToDto, resultFromDto } from '../models/simulationDto';
import type { SimulationResult } from '../../../domain/models/simulationResult';

const STORAGE_KEY = 'intiva_last_simulation';

export function saveSimulation(result: SimulationResult): void {
  try {
    const dto = resultToDto(result);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dto));
  } catch {
    // localStorage may be unavailable
  }
}

export function getLastSimulation(): SimulationResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const dto: SimulationResultDto = JSON.parse(raw);
    return resultFromDto(dto);
  } catch {
    return null;
  }
}

export function saveInputDto(dto: SimulationInputDto): void {
  try {
    localStorage.setItem(`${STORAGE_KEY}_input`, JSON.stringify(dto));
  } catch {
    // noop
  }
}

export function getInputDto(): SimulationInputDto | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_input`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
