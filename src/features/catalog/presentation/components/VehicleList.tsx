import type { Vehicle } from '../../domain/models/vehicle';
import VehicleCard from './VehicleCard';

interface VehicleListProps {
  vehicles: Vehicle[];
  onViewDetails: (id: string) => void;
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles, onViewDetails }) => (
  <div className="grid grid-cols-3 gap-6">
    {vehicles.map((vehicle, i) => (
      <div key={vehicle.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
        <VehicleCard vehicle={vehicle} onViewDetails={onViewDetails} />
      </div>
    ))}
  </div>
);

export default VehicleList;
