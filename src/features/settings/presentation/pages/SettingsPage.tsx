import { useEffect, useState } from 'react';
import {
  BaseConfigCard,
  LifeInsuranceTable,
  TeaMatrixCard,
  AmountLimitsCard,
} from '../components';
import { settingsRepositoryImpl } from '../../data/repositories/settingsRepositoryImpl';
import { useI18n } from '../../../../core/i18n/useI18n';
import type { BaseConfig } from '../../domain/models/baseConfig';
import type { LifeInsuranceRate } from '../../domain/models/lifeInsuranceRate';
import type { TeaMatrixEntry } from '../../domain/models/teaMatrix';
import type { AmountLimits } from '../../domain/models/amountLimits';
import PageContainer from '../../../../shared/presentation/components/pagecontainer/PageContainer.component';

const SettingsPage: React.FC = () => {
  const { t } = useI18n();
  const [baseConfig, setBaseConfig] = useState<BaseConfig | null>(null);
  const [lifeRates, setLifeRates] = useState<LifeInsuranceRate[]>([]);
  const [teaEntries] = useState<TeaMatrixEntry[]>(() =>
    settingsRepositoryImpl.getTeaMatrixEntries(),
  );
  const [amountLimits, setAmountLimits] = useState<AmountLimits | null>(null);

  useEffect(() => {
    setBaseConfig(settingsRepositoryImpl.getBaseConfig());
    setLifeRates(settingsRepositoryImpl.getLifeInsuranceRates());
    setAmountLimits(settingsRepositoryImpl.getAmountLimits());
  }, []);

  const handleEditRate = (id: string, newRate: number) => {
    const updated = settingsRepositoryImpl.updateLifeInsuranceRate(id, newRate);
    setLifeRates((prev) => prev.map((r) => (r.id === id ? updated : r)));
  };

  const handleSaveLimits = (min: number, max: number) => {
    const updated = settingsRepositoryImpl.updateAmountLimits(min, max);
    setAmountLimits(updated);
  };

  if (!baseConfig || !amountLimits) {
    return (
      <PageContainer title={t('settings.title')}>
        <div className="flex items-center justify-center min-h-[40vh] text-gray-400 text-sm">
          {t('common.loading')}
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={t('settings.title')}>
      <p className="text-sm text-[var(--color-text-default)] mb-6">
        {t('settings.subtitleStart')}{' '}
        <span className="text-[var(--color-text-primary)] font-medium">{t('settings.subtitleInterest')}</span>,{' '}
        <span className="text-[var(--color-accent-secondary)] font-medium">{t('settings.subtitleInsurance')}</span>{' '}
        {t('settings.subtitleEnd')}
      </p>
      <div className="grid grid-cols-[35%_65%] gap-6 mb-6">
        <div className="animate-fade-in-up">
          <BaseConfigCard config={baseConfig} />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <LifeInsuranceTable
            rates={lifeRates}
            onEdit={() => {}}
            onSave={handleEditRate}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <TeaMatrixCard
            entries={teaEntries}
            onNavigate={(route) => console.log('Navigate to:', route)}
          />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <AmountLimitsCard
            limits={amountLimits}
            onSave={handleSaveLimits}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default SettingsPage;
