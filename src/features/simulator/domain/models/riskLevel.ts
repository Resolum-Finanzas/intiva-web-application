export const RiskLevel = {
  BAJO_RIESGO_1: 'BAJO_RIESGO_1',
  BAJO_RIESGO_2: 'BAJO_RIESGO_2',
  MEDIANO_RIESGO: 'MEDIANO_RIESGO',
  ALTO_RIESGO: 'ALTO_RIESGO',
  PICK_UP: 'PICK_UP',
  CHINOS_INDIOS: 'CHINOS_INDIOS',
  L8: 'L8',
  OTROS: 'OTROS',
} as const;

export type RiskLevel = (typeof RiskLevel)[keyof typeof RiskLevel];

export const RISK_LEVEL_TUA: Record<RiskLevel, number> = {
  [RiskLevel.BAJO_RIESGO_1]: 0.0486,
  [RiskLevel.BAJO_RIESGO_2]: 0.0585,
  [RiskLevel.MEDIANO_RIESGO]: 0.0611,
  [RiskLevel.ALTO_RIESGO]: 0.0611,
  [RiskLevel.PICK_UP]: 0.0723,
  [RiskLevel.CHINOS_INDIOS]: 0.0531,
  [RiskLevel.L8]: 0.0389,
  [RiskLevel.OTROS]: 0.0884,
};

export const RISK_LEVEL_LABELS: Record<RiskLevel, string> = {
  [RiskLevel.BAJO_RIESGO_1]: 'Bajo Riesgo 1 - 4.86%',
  [RiskLevel.BAJO_RIESGO_2]: 'Bajo Riesgo 2 - 5.85%',
  [RiskLevel.MEDIANO_RIESGO]: 'Mediano Riesgo - 6.11%',
  [RiskLevel.ALTO_RIESGO]: 'Alto Riesgo - 6.11%',
  [RiskLevel.PICK_UP]: 'Pick Up - 7.23%',
  [RiskLevel.CHINOS_INDIOS]: 'Chinos e Indios - 5.31%',
  [RiskLevel.L8]: 'L8 - 3.89%',
  [RiskLevel.OTROS]: 'Otros - 8.84%',
};
