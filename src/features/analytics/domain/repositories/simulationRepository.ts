import type { SimulationResult } from '../models/Simulation';

export interface SimulationRepository {
  save(result: SimulationResult): Promise<void>;
  getHistory(): Promise<SimulationResult[]>;
}
