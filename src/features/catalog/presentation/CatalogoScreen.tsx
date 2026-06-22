import CatalogHeader from './components/CatalogHeader';
import CategoryFilter from './components/CategoryFilter';
import VehicleSearchBar from './components/VehicleSearchBar';
import VehicleList from './components/VehicleList';
import type { Vehicle } from '../domain/models/vehicle';

const CatalogoScreen: React.FC = () => {
  const vehicles: Vehicle[] = [];

  return (
    <div className="p-6 space-y-4">
      <CatalogHeader title="Catálogo" subtitle="Vehículos disponibles" />
      <VehicleSearchBar onSearch={(query) => console.log(query)} />
      <CategoryFilter active="Todos" onChange={(category) => console.log(category)} />
      <VehicleList vehicles={vehicles} onViewDetails={(id) => console.log(id)} />
    </div>
  );
};

export default CatalogoScreen;
