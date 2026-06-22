import type { SimulationInput } from '../models/simulationInput';
import type { SimulationResult } from '../models/simulationResult';

export interface SimulatorRepository {
  calculate(input: SimulationInput): SimulationResult;
  getSuggestedTeaRange(amount: number): { min: number; max: number };
}
