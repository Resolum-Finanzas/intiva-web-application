import { Outlet, NavLink } from 'react-router-dom';
import { RouteNames } from '../../../../core/navigation/router/Router-name';

export function SettingsLayout() {
  const navItems = [
    { label: 'General', path: RouteNames.settingsGeneral },
    { label: 'Notifications', path: RouteNames.settingsNotifications },
    { label: 'Appearance', path: RouteNames.settingsAppearance },
  ];

  return (
    <div className="flex h-full min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto w-full flex py-10 px-6 gap-8">
        <aside className="w-64">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Settings</h2>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
                    isActive
                      ? 'bg-white text-gray-900 shadow-sm border border-gray-200 font-medium'
                      : 'text-gray-600 hover:bg-gray-200/50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
