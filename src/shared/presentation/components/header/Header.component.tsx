import { useState, useRef, useEffect } from 'react';
import { Search, LogOut, ChevronDown } from 'lucide-react';
import { LanguageSwitcher } from '../i18n/LanguageSwitcher';
import { ThemeToggle } from '../theme/ThemeToggle';
import { useI18n } from '../../../../core/i18n/useI18n';

interface HeaderProps {
  user: {
    name: string;
    email: string;
  };
  onSearch?: (query: string) => void;
  onLogout?: () => void;
}

const getInitials = (name: string): string =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

const Header: React.FC<HeaderProps> = ({ user, onSearch, onLogout }) => {
  const [query, setQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-[var(--color-bg-surface)] border-b border-[var(--color-border)] shadow-sm flex items-center justify-between px-6 transition-colors duration-300">
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-default)]" />
        <input
          type="text"
          placeholder="Search vehicles, clients..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch?.(e.target.value);
          }}
          className="bg-[var(--color-bg-page)] rounded-full px-4 py-2 pl-10 w-80 border border-[var(--color-border)] text-sm text-[var(--color-text-default)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]"
        />
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <ThemeToggle />
        
        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 focus:outline-none cursor-pointer group"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <div className="w-9 h-9 rounded-full bg-[var(--color-accent-primary)] flex items-center justify-center text-[var(--color-text-on-primary)] text-sm font-bold transition-all duration-200 group-hover:ring-2 group-hover:ring-[var(--color-accent-secondary)] shrink-0 shadow-sm">
              {getInitials(user.name)}
            </div>
            <ChevronDown
              size={14}
              className={`text-[var(--color-text-muted)] transition-transform duration-200 group-hover:text-[var(--color-text-primary)] ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-56 bg-[var(--color-bg-elevated)] border border-[var(--color-border-light)] rounded-xl shadow-lg z-50 animate-scale-in"
              style={{ animationDuration: '0.15s' }}
            >
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-[var(--color-border-light)]">
                <p className="text-xs text-[var(--color-text-muted)] font-medium leading-none mb-1">
                  {t('common.welcome')},
                </p>
                <p className="text-sm font-bold text-[var(--color-text-dark)] truncate">
                  {user.name}
                </p>
                {user.email && (
                  <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">
                    {user.email}
                  </p>
                )}
              </div>

              {/* Menu Items */}
              <div className="p-1.5 flex flex-col gap-0.5">


                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogout?.();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-50/50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer text-left border-0 border-t border-[var(--color-border-light)]/50 mt-1 pt-2"
                >
                  <LogOut size={15} />
                  <span className="font-semibold">{t('common.logout')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
