import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Car,
  Calculator,
  Calendar,
  Settings,
  User,
  ChevronRight
} from 'lucide-react';

interface NavChild {
  label: string;
  icon: LucideIcon;
}

interface NavItem {
  label: string;
  icon: LucideIcon;
  children?: NavChild[];
}

export interface User {
  name: string;
  email: string;
}

export interface SidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
  user: User;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Catalog', icon: Car },
  {
    label: 'Simulator',
    icon: Calculator,
    children: [
      { label: 'Schedule', icon: Calendar },
    ],
  },
  { label: 'Settings', icon: Settings }
];

const getInitials = (name: string): string =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onNavigate, user }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(
    navItems.find((item) =>
      item.children?.some((child) => child.label === activeItem)
    )?.label ?? null
  );

  const handleNavClick = (item: NavItem) => {
    if (item.children) {
      setExpandedItem(expandedItem === item.label ? null : item.label);
      onNavigate(item.label);
    } else {
      setExpandedItem(null);
      onNavigate(item.label);
    }
  };

  const isParentActive = (item: NavItem) =>
    activeItem === item.label ||
    item.children?.some((child) => child.label === activeItem);

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] flex flex-col justify-between bg-[var(--color-bg-sidebar)] z-30 animate-slide-in-left transition-colors duration-300">
      <div>
        <div className="px-5 pt-6 pb-4 animate-fade-in-up">
          <h1 className="font-bold text-xl text-[var(--color-text-primary)]">Intiva</h1>
          <p className="text-xs text-[var(--color-text-muted)] font-medium mt-0.5">Automotive Credit</p>
        </div>

        <nav className="flex flex-col gap-1 px-2">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const active = isParentActive(item);
            const isExpanded = expandedItem === item.label;

            return (
              <div key={item.label} style={{ animationDelay: `${idx * 0.08}s` }} className="animate-fade-in-up">
                <button
                  onClick={() => handleNavClick(item)}
                  className={`group w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all duration-300 ease-out ${active
                      ? 'bg-[var(--color-bg-active-item)] text-[var(--color-text-primary)] border-r-4 border-[var(--color-text-primary)] shadow-sm'
                      : 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface)]/80 hover:text-[var(--color-text-primary)] hover:shadow-xs'
                    }`}
                >
                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${active
                      ? 'bg-[var(--color-bg-icon-active)] text-[var(--color-text-primary)] scale-100'
                      : 'text-[var(--color-text-muted)] group-hover:scale-110 group-hover:bg-[var(--color-bg-icon-active)]/50'
                    }`}>
                    <Icon size={17} className="transition-transform duration-300 group-hover:scale-110" />
                  </span>
                  <span className={`text-sm flex-1 text-left transition-all duration-300 ${active ? 'font-bold translate-x-0.5' : 'font-medium group-hover:translate-x-0.5'
                    }`}>
                    {item.label}
                  </span>

                  {item.children && (
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-200 text-[var(--color-text-muted)] ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="ml-3 flex flex-col gap-1">
                    {item.children?.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActive = activeItem === child.label;
                      return (
                        <button
                          key={child.label}
                          onClick={() => onNavigate(child.label)}
                          style={{ animationDelay: `${(idx + 0.3) * 0.08}s` }}
                          className={`group w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all duration-300 ease-out animate-scale-in ${isChildActive
                              ? 'bg-[var(--color-bg-active-item)] text-[var(--color-text-primary)] border-r-4 border-[var(--color-text-primary)] shadow-sm'
                              : 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface)]/80 hover:text-[var(--color-text-primary)] hover:shadow-xs'
                            }`}
                        >
                          <span className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-300 ${isChildActive
                              ? 'bg-[var(--color-bg-icon-active)] text-[var(--color-text-primary)]'
                              : 'text-[var(--color-text-muted)] group-hover:scale-110 group-hover:bg-[var(--color-bg-icon-active)]/50'
                            }`}>
                            <ChildIcon size={15} className="transition-transform duration-300 group-hover:scale-110" />
                          </span>
                          <span className={`text-sm transition-all duration-300 ${isChildActive ? 'font-bold' : 'font-medium group-hover:translate-x-0.5'
                            }`}>
                            {child.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-[var(--color-border-divider)] p-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <div className="group flex items-center gap-3 transition-all duration-300 hover:translate-x-1">
          <div className="w-9 h-9 rounded-full bg-[var(--color-accent-primary)] flex items-center justify-center text-[var(--color-text-on-primary)] text-xs font-bold shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
            {getInitials(user.name)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[var(--color-text-dark)] truncate">{user.name}</p>
            <p className="text-xs text-[var(--color-text-muted)] truncate">Personal Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
