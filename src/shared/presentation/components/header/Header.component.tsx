import { useState } from 'react';
import { Search } from 'lucide-react';
import { LanguageSwitcher } from '../i18n/LanguageSwitcher';
import { ThemeToggle } from '../theme/ThemeToggle';

interface HeaderProps {
  user: {
    name: string;
    email: string;
  };
  onSearch?: (query: string) => void;
}

const getInitials = (name: string): string =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

const Header: React.FC<HeaderProps> = ({ user, onSearch }) => {
  const [query, setQuery] = useState('');

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
        <div className="w-9 h-9 rounded-full bg-[var(--color-accent-primary)] flex items-center justify-center text-[var(--color-text-on-primary)] text-sm font-bold cursor-pointer hover:ring-2 hover:ring-[var(--color-accent-secondary)] transition-all duration-200 shrink-0">
          {getInitials(user.name)}
        </div>
      </div>
    </header>
  );
};

export default Header;
