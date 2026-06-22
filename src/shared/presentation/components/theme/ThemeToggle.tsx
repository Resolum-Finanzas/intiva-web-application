import { useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../../core/hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme, toggleThemeDirect } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    document.documentElement.style.setProperty('--origin-x', `${x}px`);
    document.documentElement.style.setProperty('--origin-y', `${y}px`);

    if (document.startViewTransition) {
      document.startViewTransition(() => toggleThemeDirect());
    } else {
      toggleTheme();
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="relative text-[var(--color-text-default)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span
        key={theme}
        className="inline-block animate-fade-in-up"
        style={{ animationDuration: '0.3s' }}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </span>
    </button>
  );
};
