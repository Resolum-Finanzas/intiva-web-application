export const FuelType = {
  GASOLINE: 'Gasoline',
  ELECTRIC: 'Electric',
  HYBRID: 'Hybrid',
  HYBRID_OPTIONS: 'Gasoline / Hybrid Options',
} as const;

export type FuelType = (typeof FuelType)[keyof typeof FuelType];
