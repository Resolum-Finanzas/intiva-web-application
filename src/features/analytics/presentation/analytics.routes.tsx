import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import AnalyticsLayout from './components/AnalyticsLayout';

const AnalyticsOverviewPage = lazy(() => import('./pages/AnalyticsOverviewPage'));
const AnalyticsCreditPage = lazy(() => import('./pages/AnalyticsCreditPage'));
const AnalyticsHistoryPage = lazy(() => import('./pages/AnalyticsHistoryPage'));

export default function AnalyticsRoutes() {
  return (
    <Routes>
      <Route element={<AnalyticsLayout />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<AnalyticsOverviewPage />} />
        <Route path="credit" element={<AnalyticsCreditPage />} />
        <Route path="history" element={<AnalyticsHistoryPage />} />
      </Route>
    </Routes>
  );
}
