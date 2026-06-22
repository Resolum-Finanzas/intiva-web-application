import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { RouteNames } from '../../../core/navigation/router/Router-name';

const LoginPage = lazy(() => import('./pages/LoginPage').then((m) => ({ default: m.default })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then((m) => ({ default: m.default })));

const iamRoutes: RouteObject[] = [
  {
    path: RouteNames.signIn,
    element: <LoginPage />,
  },
  {
    path: RouteNames.signUp,
    element: <RegisterPage />,
  },
];

import { useRoutes } from 'react-router-dom';
export default function IamRoutes() { return useRoutes(iamRoutes); }
