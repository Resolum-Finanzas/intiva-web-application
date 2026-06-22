import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Save, Percent } from 'lucide-react';
import { useI18n } from '../../../../core/i18n/useI18n';
import { settingsRepositoryImpl } from '../../data/repositories/settingsRepositoryImpl';
import type { TeaRate, RiskProfile } from '../../domain/models/teaRate';
import type { VehicleType } from '../../domain/models/teaMatrix';
import PageContainer from '../../../../shared/presentation/components/pagecontainer/PageContainer.component';

const VEHICLE_LABELS: Record<string, string> = {
  light: 'lightVehicles',
  commercial: 'commercialVehicles',
};

const VEHICLE_TYPE_MAP: Record<string, VehicleType> = {
  light: 'Ligeros',
  commercial: 'Comerciales',
};

const PROFILE_I18N_KEY: Record<RiskProfile, { label: string; desc: string }> = {
  Bajo: { label: 'riskProfiles.bajo', desc: 'riskProfiles.bajoDesc' },
  Medio: { label: 'riskProfiles.medio', desc: 'riskProfiles.medioDesc' },
  Alto: { label: 'riskProfiles.alto', desc: 'riskProfiles.altoDesc' },
};

const TeaRateConfig: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();

  const [teaRates, setTeaRates] = useState<TeaRate[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const labelKey = type ? VEHICLE_LABELS[type.toLowerCase()] : undefined;
  const vehicleLabel = labelKey ? t(`settings.${labelKey}`) : '';
  const vehicleType = type ? VEHICLE_TYPE_MAP[type.toLowerCase()] : undefined;

  useEffect(() => {
    if (!vehicleType) {
      navigate('/settings');
      return;
    }
    setTeaRates(settingsRepositoryImpl.getTeaRatesByVehicle(vehicleType));
  }, [vehicleType, navigate]);

  const handleEdit = (id: string, currentRate: number) => {
    setEditingId(id);
    setEditValue(String(currentRate * 100));
  };

  const handleCancel = useCallback(() => {
    setEditingId(null);
    setEditValue('');
  }, []);

  const handleSave = (id: string) => {
    const newRate = parseFloat(editValue);
    if (isNaN(newRate) || newRate < 0 || newRate > 100) return;
    setSaving(true);
    try {
      const updated = settingsRepositoryImpl.updateTeaRate(id, newRate / 100);
      setTeaRates((prev) => prev.map((r) => (r.id === id ? updated : r)));
      setEditingId(null);
      setEditValue('');
      setSuccessMessage(t('settings.updatedSuccessfully'));
      setTimeout(() => setSuccessMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') handleSave(id);
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <PageContainer title={vehicleLabel}>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          {t('common.back')}
        </button>

        {successMessage && (
          <span className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full animate-fade-in-up">
            {successMessage}
          </span>
        )}
      </div>

      <div className="bg-[var(--color-bg-surface)] rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-[var(--color-text-primary)]" />
            <h3 className="text-base font-semibold text-gray-800">
              {t('settings.teaRateConfigTitle', { label: vehicleLabel })}
            </h3>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {t('settings.teaRateConfigDesc')}
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {teaRates.map((rate) => {
            const i18nKeys = PROFILE_I18N_KEY[rate.riskProfile];
            const isEditing = editingId === rate.id;

            return (
              <div
                key={rate.id}
                className="px-6 py-4 flex items-center justify-between hover:bg-[var(--color-primary-50)] transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      {i18nKeys ? t(i18nKeys.label) : rate.riskProfile}
                    </span>
                    <span className="px-2.5 py-0.5 text-[11px] leading-4 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 dark:border dark:border-blue-800 font-medium">
                      {i18nKeys ? t(i18nKeys.desc) : ''}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {t('settings.lastUpdatedFormat', { date: rate.lastUpdated })}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, rate.id)}
                          className="w-24 text-sm border border-gray-300 rounded-lg px-3 py-1.5 pr-7 text-right focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:border-transparent"
                          autoFocus
                        />
                        <Percent size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                      <button
                        onClick={() => handleSave(rate.id)}
                        disabled={saving}
                        className="text-xs bg-[var(--color-accent-primary)] text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <Save size={14} />
                        {t('common.save')}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-xs text-gray-500 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        {t('common.cancel')}
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-sm font-semibold text-gray-800 tabular-nums">
                        {rate.rateLabel}
                      </span>
                      <button
                        onClick={() => handleEdit(rate.id, rate.rate)}
                        className="text-xs text-[var(--color-text-primary)] px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[var(--color-accent-primary)] hover:bg-[var(--color-primary-50)] transition-all duration-300 cursor-pointer"
                      >
                        {t('common.edit')}
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
};

export default TeaRateConfig;
