import CatalogHeader from './components/CatalogHeader';
import CategoryFilter from './components/CategoryFilter';
import VehicleSearchBar from './components/VehicleSearchBar';
import VehicleList from './components/VehicleList';
import type { Vehicle } from '../domain/models/vehicle';

const CatalogoScreen: React.FC = () => {
  const vehicles: Vehicle[] = [];

  return (
    <div className="p-6 space-y-4">
      <CatalogHeader />
      <VehicleSearchBar />
      <CategoryFilter categories={[]} selectedCategory={null} onChange={() => {}} />
      <VehicleList vehicles={vehicles} onViewDetails={() => {}} />
    </div>
  );
};

export default CatalogoScreen;
