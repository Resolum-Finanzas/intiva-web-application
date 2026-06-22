import { Outlet } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import PageContainer from '../../../../shared/presentation/components/pagecontainer/PageContainer.component';
import AnalyticsNavMenu from './AnalyticsNavMenu';

const AnalyticsLayout: React.FC = () => (
  <PageContainer title="Analíticas">
    <div className="flex gap-6">
      <aside className="w-64 shrink-0">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-[var(--color-text-primary)]" />
          <h2 className="text-lg font-semibold text-gray-800">Analíticas</h2>
        </div>
        <AnalyticsNavMenu />
      </aside>
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  </PageContainer>
);

export default AnalyticsLayout;
