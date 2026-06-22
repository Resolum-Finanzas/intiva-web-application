import type { SimulationRepository } from '../../domain/repositories/simulationRepository';
import type { SimulationResult } from '../../domain/models/Simulation';
import { saveSimulation, getSimulationHistory } from '../remote/services/simulationService';

export const simulationRepositoryImpl: SimulationRepository = {
  async save(result: SimulationResult): Promise<void> {
    await saveSimulation(result);
  },
  async getHistory(): Promise<SimulationResult[]> {
    return await getSimulationHistory();
  },
};
