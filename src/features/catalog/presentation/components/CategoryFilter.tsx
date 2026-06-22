import { useI18n } from '../../../../core/i18n/useI18n';

interface CategoryFilterProps {
  active: string;
  onChange: (cat: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ active, onChange }) => {
  const { t } = useI18n();
  const categories = [t('catalog.all'), 'SUV', t('catalog.sedan'), t('catalog.electric')];

  return (
    <div className="flex gap-2 animate-fade-in">
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`rounded-full px-4 py-1 text-sm transition-all duration-200 ${
              isActive
                ? 'bg-[#1A237E] text-white'
                : 'border border-gray-300 text-gray-600 hover:border-[#1A237E] hover:text-[#1A237E]'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
