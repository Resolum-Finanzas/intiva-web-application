import type { Vehicle } from '../../domain/models/vehicle';
import { useI18n } from '../../../../core/i18n/useI18n';

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (id: string) => void;
}

const badgeStyles: Record<string, string> = {
  Hybrid: 'bg-amber-500',
  Premium: 'bg-purple-600',
  '100% Electric': 'bg-[#2E7D32]',
};

function getPrimarySpecs(specs: Vehicle['specs'], t: (key: string) => string): { label: string; value: string }[] {
  const items: { label: string; value: string }[] = [];
  if (specs.transmission) items.push({ label: t('catalog.transmission'), value: specs.transmission });
  if (specs.engine) items.push({ label: t('catalog.engine'), value: specs.engine });
  if (specs.autonomy) items.push({ label: t('catalog.autonomy'), value: specs.autonomy });
  return items;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onViewDetails }) => {
  const { t } = useI18n();
  const primarySpecs = getPrimarySpecs(vehicle.specs, t);

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
        <img
          src={vehicle.imageUrl}
          alt={`${vehicle.name} ${vehicle.variant}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {vehicle.badge && (
          <span
            className={`absolute top-3 left-3 ${badgeStyles[vehicle.badge]} text-white text-xs rounded-full px-2 py-1 font-medium animate-pulse-soft`}
          >
            {vehicle.badge}
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500">
          {vehicle.name} · {vehicle.variant}
        </p>
        <p className="text-xl font-bold text-gray-900 mt-1">{vehicle.price.formatted}</p>

        <div className="flex gap-4 mt-3">
          {primarySpecs.slice(0, 2).map((spec) => (
            <div key={spec.label}>
              <p className="text-xs text-gray-400">{spec.label}</p>
              <p className="text-xs font-medium text-[#1A237E]">{spec.value}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => onViewDetails(vehicle.id)}
          className="w-full border border-gray-200 text-[#1A237E] text-sm rounded-lg py-2 mt-3 hover:bg-[#E8EAF6] hover:border-[#1A237E] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          {t('catalog.viewDetails')}
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
