import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CatalogHeader from '../components/CatalogHeader';
import CategoryFilter from '../components/CategoryFilter';
import VehicleList from '../components/VehicleList';
import VehicleSearchBar from '../components/VehicleSearchBar';
import { vehicleRepositoryImpl } from '../../data/repositories/vehicleRepositoryImpl';
import type { VehicleCategory } from '../../domain/models/vehicle';
import { useI18n } from '../../../../core/i18n/useI18n';
import PageContainer from '../../../../shared/presentation/components/pagecontainer/PageContainer.component';

const normalizeCategory = (cat: string): VehicleCategory | undefined => {
  const map: Record<string, VehicleCategory> = {
    SUV: 'SUV',
    Sedán: 'Sedan',
    Eléctrico: 'Electrico',
  };
  return map[cat];
};

const CatalogPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(t('catalog.all'));
  const [searchQuery, setSearchQuery] = useState('');

  const allVehicles = vehicleRepositoryImpl.getAll();

  const filtered = allVehicles.filter((v) => {
    const matchesCategory =
      activeCategory === t('catalog.all') || v.category === normalizeCategory(activeCategory);
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      v.name.toLowerCase().includes(q) ||
      v.variant.toLowerCase().includes(q) ||
      v.specs.engine.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6 animate-fade-in-down">
        <CatalogHeader title={t('catalog.title')} subtitle={t('catalog.subtitle')} />
        <VehicleSearchBar onSearch={setSearchQuery} placeholder={t('catalog.search')} />
      </div>
      <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
        <VehicleList
          vehicles={filtered}
          onViewDetails={(id) => navigate(`/catalogo/${id}`)}
        />
      </div>
    </PageContainer>
  );
};

export default CatalogPage;
