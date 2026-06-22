import { Outlet, NavLink } from 'react-router-dom';
import { RouteNames } from '../../../../core/navigation/router/Router-name';

export function ProfileLayout() {
  const navItems = [
    { label: 'Account Information', path: RouteNames.profileAccount },
    { label: 'Privacy & Security', path: RouteNames.profileSecurity },
    { label: 'Help & Support', path: RouteNames.profileHelp },
  ];

  return (
    <div className="flex h-full min-h-screen bg-gray-50/50">
      <div className="max-w-6xl mx-auto w-full flex py-10 px-6 gap-8">
        <aside className="w-64 flex-shrink-0">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Profile Settings</h2>
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white font-medium shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
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
