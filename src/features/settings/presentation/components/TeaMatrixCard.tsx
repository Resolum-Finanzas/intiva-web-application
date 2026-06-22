import { TrendingUp, ChevronRight, Car, Truck } from 'lucide-react';
import type { TeaMatrixEntry, VehicleType } from '../../domain/models/teaMatrix';
import { useI18n } from '../../../../core/i18n/useI18n';

const VEHICLE_I18N_KEY: Record<VehicleType, string> = {
  Ligeros: 'settings.lightVehicles',
  Comerciales: 'settings.commercialVehicles',
};

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
    <div className="bg-[var(--color-bg-surface)] rounded-xl border border-gray-200 p-6 h-full">
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp size={20} className="text-[var(--color-text-primary)]" />
        <h3 className="text-base font-semibold text-gray-800">{t('settings.teaMatrices')}</h3>
      </div>
      <p className="text-sm text-gray-500 mt-2 mb-4 leading-relaxed">
        {t('settings.teaMatricesDesc')}
      </p>

      <div className="space-y-2">
        {entries.map((entry) => {
          const Icon = iconMap[entry.icon] || Car;
          const labelKey = VEHICLE_I18N_KEY[entry.vehicleType];
          return (
            <button
              key={entry.vehicleType}
              onClick={() => onNavigate(entry.route)}
              className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 hover:border-[var(--color-accent-primary)] hover:bg-[var(--color-primary-50)] transition-all duration-300 hover:shadow-xl hover:scale-105 transform cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Icon size={16} className="text-[var(--color-text-primary)]" />
                <span className="text-sm font-medium text-gray-700">{labelKey ? t(labelKey) : entry.label}</span>
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
