import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { SettingsLayout } from './components/SettingsLayout';

const GeneralSettingsPage = lazy(() => import('./pages/GeneralSettingsPage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const AppearancePage = lazy(() => import('./pages/AppearancePage'));

export default function SettingsRoutes() {
  return (
    <Routes>
      <Route element={<SettingsLayout />}>
        <Route index element={<Navigate to="general" replace />} />
        <Route path="general" element={<GeneralSettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="appearance" element={<AppearancePage />} />
      </Route>
    </Routes>
  );
}
