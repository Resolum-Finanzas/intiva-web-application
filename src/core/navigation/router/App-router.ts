import { createElement, lazy, Suspense, useEffect, useState } from 'react';
import type { FC } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../../../shared/presentation/components/layout/Layout.component';
import { requireAuthGuard } from './Auth.guard';
import { RouteNames } from './Router-name';
import LoginForm from '../../../features/iam/presentation/components/LoginForm';
import RegisterForm from '../../../features/iam/presentation/components/RegisterForm';
import type { User } from '../../../features/iam/domain/models/user';
import { AuthError } from '../../../features/iam/data/remote/services/authService';

const el = createElement;

const DashboardPage = lazy(() => import('../../../features/home/presentation/pages/DashboardPage').then((m) => ({ default: m.default })));
const CatalogPage = lazy(() => import('../../../features/catalog/presentation/pages/CatalogPage').then((m) => ({ default: m.default })));
const VehicleDetailPage = lazy(() => import('../../../features/catalog/presentation/pages/VehicleDetailPage').then((m) => ({ default: m.default })));
const SimulatorPage = lazy(() => import('../../../features/simulator/presentation/pages/SimulatorPage').then((m) => ({ default: m.default })));
const SchedulePage = lazy(() => import('../../../features/simulator/presentation/pages/SchedulePage').then((m) => ({ default: m.default })));

const susp = (children: Parameters<typeof el>[2]) =>
  el(Suspense, { fallback: el('div', { className: 'flex items-center justify-center min-h-screen' }, 'Cargando...') }, children);

const navigationRoutes: Record<string, string> = {
  Dashboard: RouteNames.home,
  Catalog: RouteNames.catalog,
  Simulator: RouteNames.simulator,
  Schedule: RouteNames.paymentPlan,
  Profile: RouteNames.profile,
  Settings: RouteNames.settings,
};

const getActiveItem = (pathname: string): string => {
  if (pathname.startsWith(RouteNames.home)) return 'Dashboard';
  if (pathname.startsWith(RouteNames.catalog) || pathname.startsWith('/catalogo')) return 'Catalog';
  if (pathname.startsWith(RouteNames.paymentPlan) || pathname.startsWith('/simulador/schedule')) return 'Schedule';
  if (pathname.startsWith(RouteNames.simulator) || pathname.startsWith('/simulador')) return 'Simulator';
  if (pathname.startsWith(RouteNames.profile)) return 'Profile';
  if (pathname.startsWith(RouteNames.settings)) return 'Settings';
  return 'Dashboard';
};

const getRouteForItem = (item: string): string => navigationRoutes[item] ?? RouteNames.home;

const AppLayout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const { authRepositoryImpl } = await import('../../../features/iam/data/repositories/authRepositoryImpl');
      setUser(authRepositoryImpl.getCurrentUser());
    })();
  }, []);

  const handleLogout = async () => {
    const { authRepositoryImpl } = await import('../../../features/iam/data/repositories/authRepositoryImpl');
    await authRepositoryImpl.logout();
    navigate(RouteNames.signIn);
  };

  return el(Layout, {
    activeItem: getActiveItem(location.pathname),
    onNavigate: (item: string) => {
      navigate(getRouteForItem(item));
    },
    user: user ?? { name: 'Usuario', email: '' },
    onLogout: handleLogout,
    children: el(Outlet),
  });
};


const SignInPage: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  return el(LoginForm, {
    error,
    loading,
    onLogin: async (email: string, password: string) => {
      setError('');
      setLoading(true);
      try {
        const { authRepositoryImpl } = await import('../../../features/iam/data/repositories/authRepositoryImpl');
        await authRepositoryImpl.login(email, password);
        navigate(RouteNames.home);
      } catch (err) {
        if (err instanceof AuthError) {
          setError(err.serverMessage ?? t(`auth.errors.${err.code}`));
        } else {
          setError(t('auth.errors.unknownError'));
        }
      } finally {
        setLoading(false);
      }
    },
    onGoRegister: () => navigate(RouteNames.signUp),
  });
};

const SignUpPage: FC = () => {
  const navigate = useNavigate();
  return el(RegisterForm, {
    onRegister: async (data: { fullName: string; email: string; password: string }) => {
      try {
        const { authRepositoryImpl } = await import('../../../features/iam/data/repositories/authRepositoryImpl');
        await authRepositoryImpl.register(data.fullName, data.email, data.password);
        navigate(RouteNames.signIn);
      } catch {
        navigate(RouteNames.signIn);
      }
    },
    onGoLogin: () => navigate(RouteNames.signIn),
  });
};

export const appRoutes: RouteObject[] = [
  {
    path: RouteNames.signIn,
    element: el(SignInPage),
  },
  {
    path: RouteNames.signUp,
    element: el(SignUpPage),
  },
  {
    path: '/',
    element: el(requireAuthGuard, null, el(AppLayout)),
    children: [
      { index: true, element: el(Navigate, { to: RouteNames.home, replace: true }) },
      { path: 'home', element: susp(el(DashboardPage)) },
      { path: 'catalog', element: susp(el(CatalogPage)) },
      { path: 'catalogo', element: susp(el(CatalogPage)) },
      { path: 'catalogo/:vehicleId', element: susp(el(VehicleDetailPage)) },
      { path: 'vehicle/:vehicleId', element: susp(el(VehicleDetailPage)) },
      { path: 'simulator', element: susp(el(SimulatorPage)) },
      { path: 'simulador', element: susp(el(SimulatorPage)) },
      { path: 'simulator/schedule', element: susp(el(SchedulePage)) },
      { path: 'simulador/schedule', element: susp(el(SchedulePage)) },
      { path: 'simulator/history', element: susp(el('div', null, 'Historial de simulaciones')) },
      { path: 'simulador/history', element: susp(el('div', null, 'Historial de simulaciones')) },

      { path: 'notifications', element: susp(el('div', null, 'Notificaciones')) },
      { path: 'notificaciones', element: susp(el('div', null, 'Notificaciones')) },
    ],
  },
  { path: '*', element: el('div', { className: 'text-center p-10' }, 'Página no encontrada') },
];

export const router = createBrowserRouter(appRoutes);
