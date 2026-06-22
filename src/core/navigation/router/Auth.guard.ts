import { Navigate, useLocation } from 'react-router-dom';
import { TokenStorage } from '../../storage/Token-storage';
import { RouteNames } from './Router-name';
import type { JSX, ReactNode } from 'react';
import { createElement, Fragment, useEffect, useState } from 'react';

const tokenStorage = new TokenStorage();

export function useAuth(): { isAuthenticated: boolean; isLoading: boolean } {
  const [state, setState] = useState({ isAuthenticated: false, isLoading: true });

  useEffect(() => {
    tokenStorage.read().then((token) => {
      setState({ isAuthenticated: token !== null, isLoading: false });
    });
  }, []);

  return state;
}

const publicRoutes: readonly string[] = [RouteNames.signIn, RouteNames.signUp];

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): JSX.Element {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const isPublicRoute = publicRoutes.includes(location.pathname);

  if (isLoading) {
    return createElement('div', { className: 'flex items-center justify-center min-h-screen' }, 'Cargando...');
  }

  if (!isAuthenticated && !isPublicRoute) {
    return createElement(Navigate, { to: RouteNames.signIn, replace: true });
  }

  if (isAuthenticated && isPublicRoute) {
    return createElement(Navigate, { to: RouteNames.home, replace: true });
  }

  return createElement(Fragment, null, children);
}

export { AuthGuard as requireAuthGuard };