export type VehicleType = 'Ligeros' | 'Comerciales';

export interface TeaMatrixEntry {
  vehicleType: VehicleType;
  label: string;
  icon: 'Car' | 'Truck';
  route: string;
}

export const TEA_MATRIX_ENTRIES: TeaMatrixEntry[] = [
  {
    vehicleType: 'Ligeros',
    label: 'Vehículos Ligeros',
    icon: 'Car',
    route: '/settings/tea/light',
  },
  {
    vehicleType: 'Comerciales',
    label: 'Vehículos Comerciales',
    icon: 'Truck',
    route: '/settings/tea/commercial',
  },
];
