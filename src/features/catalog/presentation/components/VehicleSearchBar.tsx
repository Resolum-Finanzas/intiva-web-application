import { useState } from 'react';
import { Search } from 'lucide-react';
import { useI18n } from '../../../../core/i18n/useI18n';

interface VehicleSearchBarProps {
  onSearch: (q: string) => void;
  placeholder?: string;
}

const VehicleSearchBar: React.FC<VehicleSearchBarProps> = ({
  onSearch,
  placeholder,
}) => {
  const { t } = useI18n();
  const resolvedPlaceholder = placeholder ?? t('catalog.search');
  const [query, setQuery] = useState('');

  return (
    <div className="relative animate-fade-in-down">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-default)]" />
      <input
        type="text"
        placeholder={resolvedPlaceholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
        className="bg-[var(--color-bg-page)] rounded-full px-4 py-2 pl-10 w-80 border border-[#E0E0E0] text-sm text-[var(--color-text-default)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] transition-all duration-200"
      />
    </div>
  );
};

export default VehicleSearchBar;
