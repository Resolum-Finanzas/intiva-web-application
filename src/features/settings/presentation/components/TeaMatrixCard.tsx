import { TrendingUp, ChevronRight, Car, Truck } from 'lucide-react';
import type { TeaMatrixEntry } from '../../domain/models/teaMatrix';
import { useI18n } from '../../../../core/i18n/useI18n';

interface TeaMatrixCardProps {
  entries: TeaMatrixEntry[];
  onNavigate: (route: string) => void;
}

const iconMap = {
  Car,
  Truck,
};

const TeaMatrixCard: React.FC<TeaMatrixCardProps> = ({ entries, onNavigate }) => {
  const { t } = useI18n();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp size={20} className="text-[#1A237E]" />
        <h3 className="text-base font-semibold text-gray-800">{t('settings.teaMatrices')}</h3>
      </div>
      <p className="text-sm text-gray-500 mt-2 mb-4 leading-relaxed">
        {t('settings.teaMatricesDesc')}
      </p>

      <div className="space-y-2">
        {entries.map((entry) => {
          const Icon = iconMap[entry.icon] || Car;
          return (
            <button
              key={entry.vehicleType}
              onClick={() => onNavigate(entry.route)}
              className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 hover:border-[#1A237E] hover:bg-[#E8EAF6] transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Icon size={16} className="text-[#1A237E]" />
                <span className="text-sm font-medium text-gray-700">{entry.label}</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TeaMatrixCard;
