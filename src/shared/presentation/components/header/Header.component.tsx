import { useState } from 'react';
import { Search, Bell } from 'lucide-react';

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
    <header className="h-16 bg-white border-b border-[#E0E0E0] shadow-sm flex items-center justify-between px-6">
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E]" />
        <input
          type="text"
          placeholder="Search vehicles, clients..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch?.(e.target.value);
          }}
          className="bg-[#F5F5F5] rounded-full px-4 py-2 pl-10 w-80 border border-[#E0E0E0] text-sm text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#1A237E]"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-[#9E9E9E] hover:text-[#1A237E] transition-colors duration-200">
          <Bell size={20} />
        </button>
        <div className="w-9 h-9 rounded-full bg-[#1A237E] flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:ring-2 hover:ring-[#2E7D32] transition-all duration-200 shrink-0">
          {getInitials(user.name)}
        </div>
      </div>
    </header>
  );
};

export default Header;
