import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Fuel, Users, ShieldCheck, Gauge } from 'lucide-react';
import { vehicleRepositoryImpl } from '../../data/repositories/vehicleRepositoryImpl';
import type { Vehicle } from '../../domain/models/vehicle';
import { useI18n } from '../../../../core/i18n/useI18n';

const VehicleDetailPage: React.FC = () => {
  const { t } = useI18n();
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (vehicleId) {
      vehicleRepositoryImpl.getById(vehicleId).then(setVehicle);
    }
  }, [vehicleId]);

  if (!vehicle) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">{t('common.vehicleNotFound')}</p>
      </div>
    );
  }

  const specsList = [
    { label: t('catalog.engine'), value: vehicle.specs.engine },
    { label: t('catalog.transmission'), value: vehicle.specs.transmission },
    { label: t('vehicle.horsepower'), value: vehicle.specs.horsepower },
    { label: t('vehicle.torque'), value: vehicle.specs.torque },
    { label: t('vehicle.drivetrain'), value: vehicle.specs.drivetrain },
    { label: t('vehicle.fuelEconomy'), value: vehicle.specs.fuelEconomy },
  ].filter((s) => s.value);

  const getFuelLabel = (): string => {
    if (vehicle.badge === '100% Electric') return t('vehicle.electric');
    if (vehicle.badge === 'Hybrid') return t('vehicle.hybrid');
    return t('vehicle.gasoline');
  };

  const overviewFeatures = [
    { icon: Fuel, label: getFuelLabel() },
    { icon: Users, label: `${vehicle.specs.passengers ?? '-'} ${t('vehicle.passengers')}` },
    { icon: ShieldCheck, label: vehicle.specs.safety ?? '-' },
    { icon: Gauge, label: vehicle.specs.acceleration ?? vehicle.specs.autonomy ?? '-' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 animate-fade-in">
      <p className="text-sm text-gray-400 mb-6 animate-fade-in-down">
        {t('navigation.catalog')} &gt; {vehicle.name} &gt; {vehicle.variant} {vehicle.year}
      </p>

      <div className="flex gap-8">
        <div className="w-[60%] animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={vehicle.images[activeImage] || vehicle.imageUrl}
              alt={`${vehicle.name} ${vehicle.variant}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-3 mt-4">
            {vehicle.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-[120px] h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  i === activeImage ? 'border-[var(--color-accent-primary)]' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900">{t('vehicle.vehicleOverview')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mt-2">{vehicle.description}</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {overviewFeatures.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <Icon size={16} className="text-[var(--color-text-primary)]" />
                    <span className="text-sm text-gray-600">{f.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-[40%] sticky top-24 self-start animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <span className="bg-[var(--color-secondary-50)] text-[var(--color-accent-secondary)] text-xs font-bold px-3 py-1 rounded-full">
            {t('catalog.new')}
          </span>

          <h2 className="text-2xl font-bold text-gray-900 mt-3">
            {vehicle.name} {vehicle.year}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{vehicle.variant}</p>

          <div className="mt-6">
            <p className="text-xs text-gray-400 uppercase tracking-wider">{t('vehicle.cashPrice')}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              ${vehicle.price.amount.toLocaleString('en-US')}
            </p>
            <p className="text-xs text-gray-400 mt-1">{t('vehicle.taxesIncluded')}</p>
          </div>

          <button
            onClick={() => navigate(`/simulador?vehicleId=${vehicle.id}`)}
            className="w-full bg-[var(--color-accent-primary)] text-white py-3 rounded-xl text-base font-semibold mt-6 hover:bg-[var(--color-primary-800)] transition-all duration-300 hover:shadow-xl hover:scale-105 transform cursor-pointer"
          >
            {t('vehicle.simulatePayment')}
          </button>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-gray-900 mb-3">{t('vehicle.technicalSpecs')}</h3>
            <div className="divide-y divide-gray-100">
              {specsList.map((spec) => (
                <div key={spec.label} className="flex justify-between py-2 text-sm">
                  <span className="text-gray-400">{spec.label}</span>
                  <span className="text-[var(--color-text-primary)] font-medium text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
