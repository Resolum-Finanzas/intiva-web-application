import { NavLink } from 'react-router-dom';
import { BarChart3, CreditCard, History } from 'lucide-react';
import { RouteNames } from '../../../../core/navigation/router/Router-name';

const navItems = [
  { label: 'Resumen General', path: RouteNames.analyticsOverview, icon: BarChart3 },
  { label: 'Historial de Crédito', path: RouteNames.analyticsCredit, icon: CreditCard },
  { label: 'Historial de Simulaciones', path: RouteNames.analyticsHistory, icon: History },
];

const AnalyticsNavMenu: React.FC = () => (
  <nav className="space-y-1">
    {navItems.map((item) => {
      const Icon = item.icon;
      return (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${isActive
              ? 'bg-[var(--color-primary-50)] text-[var(--color-text-primary)] font-semibold border-r-3 border-[var(--color-text-primary)]'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`
          }
        >
          <Icon size={18} />
          {item.label}
        </NavLink>
      );
    })}
  </nav>
);

export default AnalyticsNavMenu;
