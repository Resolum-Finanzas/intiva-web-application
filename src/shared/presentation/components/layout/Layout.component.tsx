import type { ReactNode } from 'react';
import Sidebar from '../../../../core/navigation/Sidebar';
import Header from '../header/Header.component';

interface LayoutProps {
  children: ReactNode;
  activeItem: string;
  onNavigate: (item: string) => void;
  user: {
    name: string;
    email: string;
  };
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeItem, onNavigate, user, onLogout }) => (
  <div className="flex h-screen bg-[var(--color-bg-page)] transition-colors duration-300">
    <Sidebar activeItem={activeItem} onNavigate={onNavigate} user={user} />
    <div className="ml-[220px] flex flex-col flex-1 min-h-screen">
      <div className="fixed top-0 left-[220px] right-0 h-16 z-20">
        <Header user={user} onLogout={onLogout} />
      </div>
      <main className="mt-16 flex-1 overflow-y-auto py-8">
        {children}
      </main>
    </div>
  </div>
);

export default Layout;
