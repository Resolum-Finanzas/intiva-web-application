import type { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { RouteNames } from '../../../core/navigation/router/Router-name';

const SimulatorPage = lazy(() => import('./pages/SimulatorPage').then((m) => ({ default: m.default })));
const SchedulePage = lazy(() => import('./pages/SchedulePage').then((m) => ({ default: m.default })));

const susp = (element: React.ReactElement) => (
  <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Cargando...</div>}>
    {element}
  </Suspense>
);

const simulatorRoutes: RouteObject[] = [
  {
    path: RouteNames.simulator,
    element: susp(<SimulatorPage />),
  },
  {
    path: RouteNames.simulatorSchedule,
    element: susp(<SchedulePage />),
  },
  {
    path: RouteNames.simulatorHistory,
    element: susp(<div className="text-center p-10">Historial de simulaciones</div>),
  },
];

import { useRoutes } from 'react-router-dom';
export default function SimulatorRoutes() {
  return useRoutes(simulatorRoutes);
}
