import type { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { RouteNames } from '../../../core/navigation/router/Router-name';

const CatalogPage = lazy(() => import('./pages/CatalogPage').then((m) => ({ default: m.default })));
const VehicleDetailPage = lazy(() => import('./pages/VehicleDetailPage').then((m) => ({ default: m.default })));

const susp = (element: React.ReactElement) => (
  <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Cargando...</div>}>
    {element}
  </Suspense>
);

const catalogRoutes: RouteObject[] = [
  {
    path: RouteNames.catalog,
    element: susp(<CatalogPage />),
  },
  {
    path: '/catalog/:vehicleId',
    element: susp(<VehicleDetailPage />),
  },
];

import { useRoutes } from 'react-router-dom';
export default function CatalogRoutes() { return useRoutes(catalogRoutes); }
