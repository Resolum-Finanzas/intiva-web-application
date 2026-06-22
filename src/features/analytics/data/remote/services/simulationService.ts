import type { SimulationResult } from '../../../domain/models/Simulation';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const history: SimulationResult[] = [];

export async function saveSimulation(result: SimulationResult): Promise<void> {
  await delay(300);
  history.push(result);
}

export async function getSimulationHistory(): Promise<SimulationResult[]> {
  await delay(300);
  return [...history];
}
