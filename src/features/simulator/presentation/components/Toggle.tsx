interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
  color?: 'primary' | 'secondary';
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  color = 'primary',
}) => {
  const bgColor = checked
    ? color === 'secondary' ? 'bg-[var(--color-accent-secondary)]' : 'bg-[var(--color-accent-primary)]'
    : 'bg-gray-300';

  return (
    <div className="flex justify-between items-center py-3">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {description && (
          <p className="text-xs text-[var(--color-text-primary)] mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 transform cursor-pointer ${bgColor}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-[var(--color-bg-surface)] rounded-full shadow transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
};

export default Toggle;
