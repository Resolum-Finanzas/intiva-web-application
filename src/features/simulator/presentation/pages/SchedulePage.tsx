import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Plus, PauseCircle } from 'lucide-react';
import { useI18n } from '../../../../core/i18n/useI18n';
import { getLastSimulation } from '../../data/remote/services/simulatorService';
import type { SimulationResult } from '../../domain/models/simulationResult';
import PageContainer from '../../../../shared/presentation/components/pagecontainer/PageContainer.component';

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const SchedulePage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [result, setResult] = useState<SimulationResult | null>(null);

  useEffect(() => {
    const last = getLastSimulation();
    if (last) setResult(last);
  }, []);

  if (!result) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <p className="text-gray-500 text-lg mb-4">No hay simulación guardada.</p>
          <button
            onClick={() => navigate('/simulator')}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            Realizar simulación
          </button>
        </div>
      </PageContainer>
    );
  }

  const { rows, tea, tcea, graceInterest, van, tir } = result;

  const metrics = [
    { label: 'TEA (TASA EFECTIVA ANUAL)', value: `${(tea * 100).toFixed(2)}%` },
    { label: 'TCEA', value: `${(tcea * 100).toFixed(2)}%` },
    { label: 'INTERÉS DE GRACIA', value: `S/ ${fmt(graceInterest)}` },
    { label: 'VAN / TIR', value: `S/ ${fmt(van)} / ${(tir * 100).toFixed(2)}%` },
  ];

  const totalRow = {
    saldoInicial: rows.length > 0 ? rows[0].initialBalance : 0,
    interes: rows.reduce((s, r) => s + r.interest, 0),
    amortizacion: rows.reduce((s, r) => s + r.amortization, 0),
    desgravamen: rows.reduce((s, r) => s + r.lifeInsurance, 0),
    segVehicular: rows.reduce((s, r) => s + r.vehicleInsurance, 0),
    saldoFinal: rows.length > 0 ? rows[rows.length - 1].finalBalance : 0,
  };

  const metricLabels = [
    t('schedule.tea'),
    t('schedule.tcea'),
    t('schedule.graceInterest'),
    t('schedule.vanTir'),
  ];

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6 animate-fade-in-down">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{t('schedule.title')}</h1>
        <div className="flex gap-3">
          <button className="border border-[var(--color-border)] text-[var(--color-text-muted)] text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[var(--color-bg-page)] transition-all duration-200 cursor-pointer">
            <Download size={16} />
            {t('common.exportPdf')}
          </button>
          <button onClick={() => navigate('/simulator')} className="bg-primary text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all duration-300 hover:shadow-xl hover:scale-105 transform cursor-pointer">
            <Plus size={16} />
            {t('common.newSimulation')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => (
          <div key={m.label} className="animate-fade-in-up bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-4 shadow-sm" style={{ animationDelay: `${i * 0.08}s` }}>
            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">{metricLabels[i]}</p>
            <p className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">{m.value}</p>
          </div>
        ))}
      </div>

    <div className="bg-[var(--color-bg-surface)] rounded-xl shadow-sm overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <table className="w-full text-xs">
          <thead>
            <tr className="bg-[var(--color-bg-page)] text-[var(--color-text-muted)] font-semibold uppercase">
              <td className="px-4 py-3">{t('schedule.installment')}</td>
              <td className="px-4 py-3">{t('schedule.date')}</td>
              <td className="px-4 py-3">{t('schedule.initialBalance')}</td>
              <td className="px-4 py-3">{t('schedule.interest')}</td>
              <td className="px-4 py-3">{t('schedule.amortization')}</td>
              <td className="px-4 py-3">{t('schedule.desgravamen')}</td>
              <td className="px-4 py-3">{t('schedule.vehicleInsurance')}</td>
              <td className="px-4 py-3">{t('schedule.totalPayment')}</td>
              <td className="px-4 py-3">{t('schedule.finalBalance')}</td>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-light)]">
            {rows.map((r) => {
              const isGracia = r.isGrace;
              const isBalon = r.isBalloon;
              const rowBg = isGracia ? 'bg-[var(--color-primary-50)]' : isBalon ? 'bg-primary text-white' : 'bg-[var(--color-bg-surface)]';

              return (
                <tr key={r.period} className={`${rowBg} hover:brightness-95 dark:hover:brightness-125 transition-all duration-150`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {isGracia && <PauseCircle size={14} className="text-[var(--color-text-primary)]" />}
                      <span>{isBalon ? ( <span className="bg-[var(--color-accent-secondary)] text-white text-xs rounded px-1.5 py-0.5">{t('schedule.balloonPayment')}</span> ) : r.period}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{r.date}</td>
                  <td className="px-4 py-3">S/ {fmt(r.initialBalance)}</td>
                  <td className="px-4 py-3">S/ {fmt(r.interest)}</td>
                  <td className="px-4 py-3">{isGracia ? '0.00' : `S/ ${fmt(r.amortization)}`}</td>
                  <td className="px-4 py-3">S/ {fmt(r.lifeInsurance)}</td>
                  <td className="px-4 py-3">S/ {fmt(r.vehicleInsurance)}</td>
                  <td className="px-4 py-3">S/ {fmt(r.totalPayment)}</td>
                  <td className="px-4 py-3">S/ {fmt(r.finalBalance)}</td>
                </tr>
              );
            })}

            <tr className="bg-primary text-white font-bold">
              <td className="px-4 py-3" colSpan={2}>{t('schedule.totals')}</td>
              <td className="px-4 py-3">S/ {fmt(totalRow.saldoInicial)}</td>
              <td className="px-4 py-3">S/ {fmt(totalRow.interes)}</td>
              <td className="px-4 py-3">S/ {fmt(totalRow.amortizacion)}</td>
              <td className="px-4 py-3">S/ {fmt(totalRow.desgravamen)}</td>
              <td className="px-4 py-3">S/ {fmt(totalRow.segVehicular)}</td>
              <td className="px-4 py-3" />
              <td className="px-4 py-3 text-xl">S/ {fmt(totalRow.saldoFinal)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[var(--color-text-muted)] italic mt-4">
        {t('schedule.referentialDisclaimer')}
      </p>
    </PageContainer>
  );
};

export default SchedulePage;
