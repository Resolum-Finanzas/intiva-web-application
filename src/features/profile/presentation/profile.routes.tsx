import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { ProfileLayout } from './components/ProfileLayout';

const AccountInformationPage = lazy(() => import('./pages/AccountInformationPage'));
const PrivacySecurityPage = lazy(() => import('./pages/PrivacySecurityPage'));
const HelpSupportPage = lazy(() => import('./pages/HelpSupportPage'));

export default function ProfileRoutes() {
  return (
    <Routes>
      <Route element={<ProfileLayout />}>
        <Route index element={<Navigate to="account" replace />} />
        <Route path="account" element={<AccountInformationPage />} />
        <Route path="security" element={<PrivacySecurityPage />} />
        <Route path="help" element={<HelpSupportPage />} />
      </Route>
    </Routes>
  );
}
