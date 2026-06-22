import { MapPin, Car } from 'lucide-react';
import { useI18n } from '../../../../core/i18n/useI18n';

interface SelectedVehicleBannerProps {
  vehicleName: string;
  vehiclePrice: number;
  location: string;
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(n);

const SelectedVehicleBanner: React.FC<SelectedVehicleBannerProps> = ({
  vehicleName,
  vehiclePrice,
  location,
}) => {
  const { t } = useI18n();

  return (
    <div className="bg-[#1A237E] rounded-xl p-5 relative overflow-hidden">
      <div className="flex justify-between items-center relative z-10">
        <div>
          <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider">
            {t('simulator.selectedVehicle')}
          </p>
          <p className="text-xl font-bold text-white mt-1">{vehicleName}</p>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={12} className="text-blue-200" />
            <p className="text-xs text-blue-200">{location}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-blue-300 uppercase tracking-wider">{t('simulator.vehiclePrice')}</p>
          <p className="text-3xl font-bold text-white">${fmt(vehiclePrice)}</p>
        </div>
      </div>
      <Car size={120} className="text-blue-400/20 absolute -bottom-6 -right-6 animate-pulse-soft" />
    </div>
  );
};

export default SelectedVehicleBanner;
